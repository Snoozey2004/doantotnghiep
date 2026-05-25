using AutoMapper;
using BCrypt.Net;
using WebApplication1.Application.DTOs.AuthDTOs;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IEmailNotificationService _emailNotificationService;
    private readonly ILogger<UserService> _logger;

    public UserService(
        IUserRepository userRepository,
        IMapper mapper,
        IEmailNotificationService emailNotificationService,
        ILogger<UserService> logger)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _emailNotificationService = emailNotificationService;
        _logger = logger;
    }

    public async Task<List<UserDto>> GetAllAsync(CancellationToken cancellationToken)
    {
        var users = await _userRepository.GetAllAsync(cancellationToken);
        return _mapper.Map<List<UserDto>>(users);
    }

    public async Task<UserDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByIdAsync(id, cancellationToken);
        return user is null ? null : _mapper.Map<UserDto>(user);
    }

    public async Task<UserDto?> UpdateAsync(Guid id, UserAdminUpdateDto dto, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByIdAsync(id, cancellationToken);
        if (user is null)
        {
            return null;
        }

        var wasApproved = user.IsApproved;

        _mapper.Map(dto, user);
        await _userRepository.UpdateAsync(user, cancellationToken);

        if (!wasApproved && user.IsApproved)
        {
            try
            {
                await _emailNotificationService.SendAsync(
                    user.Email,
                    "Tài khoản của bạn đã được phê duyệt",
                    $"<p>Xin chào {user.FullName},</p><p>Tài khoản của bạn đã được Admin phê duyệt. Bạn có thể đăng nhập để sử dụng hệ thống.</p>",
                    cancellationToken);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to send approval email for {Email}", user.Email);
            }
        }

        return _mapper.Map<UserDto>(user);
    }

    public async Task<UserDto?> UpdateApprovalAsync(Guid id, bool isApproved, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByIdAsync(id, cancellationToken);
        if (user is null)
        {
            return null;
        }

        var wasApproved = user.IsApproved;
        user.IsApproved = isApproved;

        await _userRepository.UpdateAsync(user, cancellationToken);

        if (!wasApproved && user.IsApproved)
        {
            try
            {
                await _emailNotificationService.SendAsync(
                    user.Email,
                    "Tài khoản của bạn đã được phê duyệt",
                    $"<p>Xin chào {user.FullName},</p><p>Tài khoản của bạn đã được Admin phê duyệt. Bạn có thể đăng nhập để sử dụng hệ thống.</p>",
                    cancellationToken);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to send approval email for {Email}", user.Email);
            }
        }

        return _mapper.Map<UserDto>(user);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByIdAsync(id, cancellationToken);
        if (user is null)
        {
            return false;
        }

        await _userRepository.DeleteAsync(user, cancellationToken);
        return true;
    }

    public async Task<UserDto?> UpdateProfileAsync(Guid id, UserProfileUpdateDto dto, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByIdAsync(id, cancellationToken);
        if (user is null)
        {
            return null;
        }

        _mapper.Map(dto, user);
        await _userRepository.UpdateAsync(user, cancellationToken);
        return _mapper.Map<UserDto>(user);
    }

    public async Task<bool> UpdatePasswordAsync(Guid id, UserPasswordUpdateDto dto, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByIdAsync(id, cancellationToken);
        if (user is null)
        {
            return false;
        }

        if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
        {
            throw new InvalidOperationException("Current password is incorrect.");
        }

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        await _userRepository.UpdateAsync(user, cancellationToken);
        return true;
    }
}
    
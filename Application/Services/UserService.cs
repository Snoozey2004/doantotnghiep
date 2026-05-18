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

    public UserService(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
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

        _mapper.Map(dto, user);
        await _userRepository.UpdateAsync(user, cancellationToken);
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
    
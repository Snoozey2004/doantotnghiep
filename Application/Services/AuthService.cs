using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebApplication1.Application.DTOs.AuthDTOs;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Application.Interfaces.Services;
using WebApplication1.Domain.Entities;
using WebApplication1.Domain.Enums;

namespace WebApplication1.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _configuration;

    public AuthService(IUserRepository userRepository, IConfiguration configuration)
    {
        _userRepository = userRepository;
        _configuration = configuration;
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto, CancellationToken cancellationToken)
    {
        var existingUser = await _userRepository.GetByEmailAsync(dto.Email, cancellationToken);
        if (existingUser is not null)
        {
            throw new InvalidOperationException("Email already registered.");
        }

        if (dto.Role is UserRole.Admin)
        {
            throw new InvalidOperationException("Cannot register as admin.");
        }

        if (dto.Role is not (UserRole.Editor or UserRole.Seller or UserRole.Customer))
        {
            throw new InvalidOperationException("Invalid role selection.");
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            FullName = dto.FullName,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = dto.Role,
            IsApproved = dto.Role != UserRole.Editor
        };

        await _userRepository.AddAsync(user, cancellationToken);
        return CreateAuthResponse(user, user.IsApproved);
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto dto, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByEmailAsync(dto.Email, cancellationToken);
        if (user is null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
        {
            throw new InvalidOperationException("Invalid credentials.");
        }

        if (user.Role == UserRole.Editor && !user.IsApproved)
        {
            throw new InvalidOperationException("Chưa được xác nhận tài khoản bởi admin.");
        }

        return CreateAuthResponse(user);
    }

    private AuthResponseDto CreateAuthResponse(User user, bool includeToken = true)
    {
        var jwtSection = _configuration.GetSection("Jwt");
        var keyValue = jwtSection["Key"];
        if (includeToken && string.IsNullOrWhiteSpace(keyValue))
        {
            throw new InvalidOperationException("JWT key is missing.");
        }

        var expiresMinutes = int.TryParse(jwtSection["ExpiresMinutes"], out var minutes) ? minutes : 120;
        var expiresAt = includeToken ? DateTime.UtcNow.AddMinutes(expiresMinutes) : DateTime.UtcNow;
        var accessToken = string.Empty;

        if (includeToken)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyValue));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new(JwtRegisteredClaimNames.Email, user.Email),
                new(ClaimTypes.Role, ((int)user.Role).ToString()),
                new(ClaimTypes.Role, user.Role.ToString()),
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Name, user.FullName)
            };

            var token = new JwtSecurityToken(
                issuer: jwtSection["Issuer"],
                audience: jwtSection["Audience"],
                claims: claims,
                expires: expiresAt,
                signingCredentials: credentials);

            accessToken = new JwtSecurityTokenHandler().WriteToken(token);
        }

        return new AuthResponseDto
        {
            UserId = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            Role = user.Role,
            AccessToken = accessToken,
            ExpiresAt = expiresAt
        };
    }
}

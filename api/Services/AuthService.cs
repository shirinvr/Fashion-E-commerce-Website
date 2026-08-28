using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace api.Services
{
    public class AuthService : IAuthService
    {
        private readonly EcommerceContext _context;
        private readonly IConfiguration _configuration;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly EncryptionService RequestEncryption;

        public AuthService(
            EcommerceContext context,
            IConfiguration configuration,
            IPasswordHasher<User> passwordHasher,
            EncryptionService encryptionService
            )
        {
            _context = context;
            _configuration = configuration;
            _passwordHasher = passwordHasher;
            RequestEncryption = encryptionService;
        }

        public async Task<RegisterResponse> RegisterAsync(RegisterRequest request)
        {
            if (request == null)
            {
                return new RegisterResponse
                {
                    Success = false,
                    Message = "Registration request is required."
                };
            }

            // 1. Validate email
            if (string.IsNullOrWhiteSpace(request.Email))
            {
                return new RegisterResponse
                {
                    Success = false,
                    Message = "Email is required."
                };
            }

            // 2. Validate password
            if (string.IsNullOrWhiteSpace(request.Password))
            {
                return new RegisterResponse
                {
                    Success = false,
                    Message = "Password is required."
                };
            }

            // 3. Confirm password
            if (request.Password != request.ConfirmPassword)
            {
                return new RegisterResponse
                {
                    Success = false,
                    Message = "Password and confirm password do not match."
                };
            }

            // 4. Normalize email
            // string email = EncryptionService.Encrypt(request.Email.Trim().ToLower());
            string email = request.Email.Trim();

            // 5. Check whether email already exists
            bool emailExists = await _context.Users.AnyAsync(x => x.email.ToLower() == email);

            if (emailExists)
            {
                return new RegisterResponse
                {
                    Success = false,
                    Message = "Email already registered."
                };
            }

            // 6. Create user
            var user = new User
            {
                email = email,
                passwordhash = RequestEncryption.Decrypt(request.Password),
                isactive = true,
                createdat = DateTime.UtcNow,
                updatedat = DateTime.UtcNow
            };
            // 7. Hash password using ASP.NET Core built-in hasher
            user.passwordhash = _passwordHasher.HashPassword(user, user.passwordhash);
            try
            {
                // 8. Save user
                _context.Users.Add(user);

                int registrationStatus = await _context.SaveChangesAsync();

                // 11. Verify database insertion
                if (registrationStatus > 0)
                {
                    return new RegisterResponse
                    {
                        Success = true,
                        Message = "User registered successfully.",
                        UserId = user.id,
                        Email = user.email
                    };
                }
                return new RegisterResponse
                {
                    Success = false,
                    Message = "User registration failed."
                };
            }
            catch (Exception ex)
            {
                return new RegisterResponse
                {
                    Success = false,
                    Message = ex.Message
                };
            }
        }

        public async Task<LoginResponse> LoginAsync(Login request)
        {
            if (request == null ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return new LoginResponse
                {
                    Success = false,
                    Message = "Invalid email or password."
                };
            }

            // Normalize email once
            string email = request.Email.Trim().ToLower();

            // Decrypt password once
            string password;

            try
            {
                password = RequestEncryption.Decrypt(request.Password);
            }
            catch
            {
                return new LoginResponse
                {
                    Success = false,
                    Message = "Invalid email or password."
                };
            }

            // ---------------------------------------------------------
            // Find user
            // ---------------------------------------------------------

            var user = await _context.Users
                .FirstOrDefaultAsync(x =>
                    x.email == email &&
                    x.isactive == true);

            if (user == null)
            {
                return new LoginResponse
                {
                    Success = false,
                    Message = "Invalid email or password."
                };
            }

            // ---------------------------------------------------------
            // Verify password
            // ---------------------------------------------------------

            var passwordResult =
                _passwordHasher.VerifyHashedPassword(
                    user,
                    user.passwordhash,
                    password);

            if (passwordResult == PasswordVerificationResult.Failed)
            {
                return new LoginResponse
                {
                    Success = false,
                    Message = "Invalid email or password."
                };
            }

            // Optional:
            // Rehash password if the hashing configuration has changed.
            if (passwordResult ==
                PasswordVerificationResult.SuccessRehashNeeded)
            {
                user.passwordhash = _passwordHasher.HashPassword(user, password);
            }

            // ---------------------------------------------------------
            // Generate tokens
            // ---------------------------------------------------------

            string accessToken = GenerateAccessToken(user);

            string refreshToken = GenerateRefreshToken();

            // ---------------------------------------------------------
            // Hash refresh token
            // ---------------------------------------------------------

            string refreshTokenHash = Convert.ToHexString(System.Security.Cryptography.SHA256.HashData(System.Text.Encoding.UTF8.GetBytes(refreshToken)));

            DateTime now = DateTime.UtcNow;

            var refreshTokenEntity = new RefreshToken
            {
                userid = user.id,
                tokenhash = refreshTokenHash,
                createdat = now,
                expiresat = now.AddDays(7),
                revokedat = null
            };

            // ---------------------------------------------------------
            // Save
            // ---------------------------------------------------------

            try
            {
                _context.RefreshTokens.Add(refreshTokenEntity);

                await _context.SaveChangesAsync();

                return new LoginResponse
                {
                    Success = true,
                    Message = "Login successful.",
                    AccessToken = accessToken,
                    RefreshToken = refreshToken,
                    UserId = user.id,
                    Email = user.email
                };
            }
            catch
            {
                // Log the actual exception using ILogger.
                return new LoginResponse
                {
                    Success = false,
                    Message = "Unable to complete login."
                };
            }
        }

        private string GenerateAccessToken(User user)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            string secretKey = jwtSettings["SecretKey"]!;
            string issuer = jwtSettings["Issuer"]!;
            string audience = jwtSettings["Audience"]!;
            int expiryMinutes = int.Parse(jwtSettings["ExpiryMinutes"] ?? "15");

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub,user.id.ToString()),

                new Claim(JwtRegisteredClaimNames.Email,user.email),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(
                    expiryMinutes
                ),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string GenerateRefreshToken()
        {
            byte[] randomBytes =
                RandomNumberGenerator.GetBytes(64);

            return Convert.ToBase64String(
                randomBytes
            );
        }
    }
}
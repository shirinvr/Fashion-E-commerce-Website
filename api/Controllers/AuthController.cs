using api.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _AuthService;

    public AuthController(IAuthService AuthService)
    {
        _AuthService = AuthService;
    }
    

    [HttpPost("UserRegistration")]
    public async Task<IActionResult> UserRegistration(RegisterRequest user)
    {
        var result = await _AuthService.RegisterAsync(user);
        return Ok(result);
    }

    [HttpPost("encryptLogin")]
    public async Task<IActionResult> ValidateLogin(Login user)
    {
        var result = await _AuthService.LoginAsync(user);
        return Ok(result);
    }

}

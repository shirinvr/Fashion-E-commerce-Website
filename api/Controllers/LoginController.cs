using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class LoginController : ControllerBase
{
    private readonly ILoginService _LoginService;

    public LoginController(ILoginService LoginService)
    {
        _LoginService = LoginService;
    }

    [HttpPost("validateLogin/{UserName}/{UserPswd}")]
    public async Task<IActionResult> ValidateLogin(string UserName,string UserPswd)
    {
        return Ok(await _LoginService.ValidateLogin(UserName,UserPswd));
    }

}

using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class MenuController : ControllerBase
{
    private readonly IMenuService _MenuService;

    public MenuController(IMenuService MenuService)
    {
        _MenuService = MenuService;
    }

    [HttpGet]
    [Route("getAllMenus/{RoleType}")]
    public async Task<ActionResult<IEnumerable<MenuMaster>>> GetAllMenus(string RoleType)
    {
        return Ok(await _MenuService.GetAllMenus(RoleType));
    }

}

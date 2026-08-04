using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class RoleMasterController : ControllerBase
{
    private readonly IRoleMasterService _RoleMasterService;

    public RoleMasterController(IRoleMasterService RoleMasterService)
    {
        _RoleMasterService = RoleMasterService;
    }

    [HttpGet]
    [Route("getAllRoles/{filter}/{pageSize}/{pageNumber}/{filterType}")]
    public async Task<ActionResult<IEnumerable<RoleMaster>>> GetAllRoles(string filter, int pageSize, int pageNumber, int filterType)
    {
        // Default filter to empty string if it's empty or "null"
        filter = string.IsNullOrWhiteSpace(filter) || filter == "null" ? string.Empty : filter;

        return Ok(await _RoleMasterService.GetAllRoles(filter, pageSize, pageNumber, filterType));
    }


    [HttpGet]
    [Route("getRoleById/{id}")]
    public async Task<IActionResult> GetRoleById(int id)
    {
        return Ok(await _RoleMasterService.GetRoleById(id));
    }


    [HttpDelete("deleteRoleById/{id}")]
    public async Task<IActionResult> DeleteRole(Guid id)
    {
        return Ok(await _RoleMasterService.DeleteRole(id));
    }

    [HttpPost]
    [Route("SaveRoleMaster")]
    public async Task<IActionResult> SaveRoleMaster(RoleMaster role)
    {
        return Ok(await _RoleMasterService.SaveRole(role));
    }

}

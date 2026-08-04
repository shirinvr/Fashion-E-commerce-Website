using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
public class DynamicController : ControllerBase
{
    private readonly IDynamicService _service;

    public DynamicController(IDynamicService service)
    {
        _service = service;
    }

    [HttpPost("execute")]
    public async Task<IActionResult> ExecuteRequest([FromBody] DynamicRequest request)
    {
        var result = await _service.ExecuteDynamicRequest(request);
        return Content(result.ToString(), "application/json");
    }
}

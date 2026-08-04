using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class Product_categoryController : ControllerBase
{
    private readonly IProduct_categoryService _product_categoryService;

    public Product_categoryController(IProduct_categoryService product_categoryService)
    {
        _product_categoryService = product_categoryService;
    }

    [HttpGet]
    [Route("getAllCategory")]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategory()
    {
        return Ok(await _product_categoryService.GetAllCategory());
    }

    [HttpGet]
    [Route("getCategoryById/{id}")]
    public async Task<IActionResult> GetCategoryById(Guid id)
    {
            return Ok(await _product_categoryService.GetCategoryById(id));
    }



    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(Guid id, Category category)
    {
        if (id != category.product_categoryId) return BadRequest();
        await _product_categoryService.UpdateCategory(category);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(Guid id)
    {
        await _product_categoryService.DeleteCategory(id);
        return NoContent();
    }
}

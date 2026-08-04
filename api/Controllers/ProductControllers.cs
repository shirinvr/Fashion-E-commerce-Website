using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    [Route("getAllProducts/{filter}/{pageSize}/{pageNumber}/{filterType}")]
    public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts(string filter, int pageSize, int pageNumber, int filterType)
    {
        // Default filter to empty string if it's empty or "null"
        filter = string.IsNullOrWhiteSpace(filter) || filter == "null" ? string.Empty : filter;

        return Ok(await _productService.GetAllProducts(filter, pageSize, pageNumber, filterType));
    }


    [HttpGet]
    [Route("getProductById/{id}")]
    public async Task<IActionResult> GetProductById(Guid id)
    {
        return Ok(await _productService.GetProductById(id));
    }


    [HttpDelete("deleteProductById/{id}")]
    public async Task<IActionResult> DeleteProduct(Guid id)
    {
        return Ok(await _productService.DeleteProduct(id));
    }

    [HttpPost]
    [Route("saveProduct")]
    public async Task<IActionResult> SaveProduct(Product product)
    {
        return Ok(await _productService.SaveProduct(product));
    }

}

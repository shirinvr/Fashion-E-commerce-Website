
using System.ComponentModel.DataAnnotations.Schema;

public class ProductResponse
{
    public IEnumerable<Product>? Products { get; set; }
    public int ErrorStatus { get; set; }
    public string? OutputMessage { get; set; }
}

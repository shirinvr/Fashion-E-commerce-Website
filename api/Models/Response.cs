
using System.ComponentModel.DataAnnotations.Schema;

public class ProductResponse
{
    public int ErrorStatus { get; set; }
    public string? OutputMessage { get; set; }
}


using System.ComponentModel.DataAnnotations.Schema;

public class OutputResponse
{
    public int ErrorStatus { get; set; }
    public string? OutputMessage { get; set; }
}

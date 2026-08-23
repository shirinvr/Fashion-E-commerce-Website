using System.Text.Json;
using Newtonsoft.Json.Linq;

public class DynamicRequest
{
    public required string SpName { get; set; }
    public JsonElement? Parameters { get; set; }
}

using Newtonsoft.Json.Linq;

public class ApiResponse
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public JArray Data { get; set; }

    public ApiResponse(bool success, string message, JArray data)
    {
        Success = success;
        Message = message;
        Data = data;
    }
}

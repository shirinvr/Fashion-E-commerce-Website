public class LoginResponse
{
    public bool Success { get; set; }

    public string Message { get; set; } = string.Empty;

    public string? AccessToken { get; set; }

    public string? RefreshToken { get; set; }

    public long UserId { get; set; }

    public string? Email { get; set; }

    public string? FullName { get; set; }
}
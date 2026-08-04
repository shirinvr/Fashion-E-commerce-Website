

public interface ILoginService
{
    Task<List<Login>> ValidateLogin(string UserName,string UserPswd);
}

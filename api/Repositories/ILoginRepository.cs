public interface ILoginRepository
{
    Task<List<Login>> ValidateLogin(string UserName,string UserPswd);
}

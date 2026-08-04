using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

public class LoginService : ILoginService
{
    private ILoginRepository _repository;
    private readonly ILogger<LoginService> _logger;

    public LoginService(ILoginRepository repository, ILogger<LoginService> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public LoginService(ILoginRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Login>> ValidateLogin(string UserName,string UserPswd)
    {
        try
        {
            // Attempt to delete the Login from the repository
            return await _repository.ValidateLogin(UserName,UserPswd);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging and monitoring purposes
            _logger.LogError(ex, "Login Failed");
            return new List<Login>();
        }
    }

}

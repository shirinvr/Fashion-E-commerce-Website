using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

public class RoleMasterService : IRoleMasterService
{
    private IRoleMasterRepository _RoleMasterRepository;
    private readonly ILogger<RoleMasterService> _logger;

    public RoleMasterService(IRoleMasterRepository repository, ILogger<RoleMasterService> logger)
    {
        _RoleMasterRepository = repository;
        _logger = logger;
    }

    public RoleMasterService(IRoleMasterRepository repository)
    {
        _RoleMasterRepository = repository;
    }

    public async Task<List<RoleMaster>> GetAllRoles(string filter, int pageSize, int pageNumber, int filterType)
    {
        try
        {
            return await _RoleMasterRepository.GetAllRoles(filter, pageSize, pageNumber, filterType);
        }
        catch (Exception ex)
        {
            throw new Exception("Failed to retrieve", ex);
        }
    }

    public async Task<List<RoleMaster>> GetRoleById(int id)
    {
        try
        {
            // Attempt to retrieve the product from the repository
            return await _RoleMasterRepository.GetRoleById(id);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging and monitoring purposes
            _logger.LogError(ex, "An error occurred", id);

            // Throw a custom exception or handle it as per your application's requirement
            throw new Exception("Failed to retrieve data from database.", ex);
        }
    }

    public async Task<OutputResponse> SaveRole(RoleMaster role)
    {
        try
        {
            return await _RoleMasterRepository.SaveRole(role);
        }
        catch (Exception ex)
        {
            throw new Exception("Failed to save or update", ex);
        }
    }

    public async Task<string> DeleteRole(Guid id)
    {
        try
        {
            // Attempt to delete the product from the repository
            return await _RoleMasterRepository.DeleteRole(id);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging and monitoring purposes
            _logger.LogError(ex, "An error occurred !", id);

            // Throw a custom exception or handle it as per your application's requirement
            throw new Exception("Failed to retrieve.", ex);
        }
    }

}

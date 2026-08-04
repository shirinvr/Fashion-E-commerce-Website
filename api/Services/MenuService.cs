using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

public class MenuService : IMenuService
{
    private IMenuRepository _Menurepository;
    private readonly ILogger<MenuService> _logger;

    public MenuService(IMenuRepository repository, ILogger<MenuService> logger)
    {
        _Menurepository = repository;
        _logger = logger;
    }

    public MenuService(IMenuRepository repository)
    {
        _Menurepository = repository;
    }

    public async Task<List<MenuMaster>> GetAllMenus(string RoleType)
    {
        try
        {
            return await _Menurepository.GetAllMenus(RoleType);
        }
        catch (Exception ex)
        {
            throw new Exception("Failed to retrieve", ex);
        }
    }

}

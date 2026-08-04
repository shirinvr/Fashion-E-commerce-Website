using System.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using Swashbuckle.AspNetCore.SwaggerGen;

public class MenuRepository : IMenuRepository
{
    private readonly EcommerceContext _context;

    public MenuRepository(EcommerceContext context)
    {
        _context = context;
    }

    public async Task<List<MenuMaster>> GetAllMenus(string RoleType)
    {
        var menuList = new List<MenuMaster>();
        using (var command = _context.Database.GetDbConnection().CreateCommand())
        {
            command.CommandText = "ec.usp_getAllMenus";
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.Add(new SqlParameter("@RoleType", RoleType));
            await _context.Database.OpenConnectionAsync();

            using (var reader = await command.ExecuteReaderAsync())
            {
                if (reader.HasRows)
                {
                    while (await reader.ReadAsync())
                    {
                        menuList.Add(
                            new MenuMaster
                            {
                                Menu_id = reader.GetInt32(reader.GetOrdinal("Menu_id")),
                                Menu_name = reader.GetString(reader.GetOrdinal("Menu_name")),
                                Menu_Description = reader.GetString(reader.GetOrdinal("Menu_Description")),
                                Menu_Icon = reader.GetString(reader.GetOrdinal("Menu_Icon")),
                                Menu_url = reader.GetString(reader.GetOrdinal("Menu_url"))
                            });
                    }
                }
            }
        }

        return menuList;
    }

}

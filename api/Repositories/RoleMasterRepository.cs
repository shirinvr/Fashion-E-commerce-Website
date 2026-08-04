using System.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using Swashbuckle.AspNetCore.SwaggerGen;

public class RoleMasterRepository : IRoleMasterRepository
{
    private readonly EcommerceContext _context;

    public RoleMasterRepository(EcommerceContext context)
    {
        _context = context;
    }

    public async Task<List<RoleMaster>> GetAllRoles(string filter, int pageSize, int pageNumber, int filterType)
    {
        var paramFilter = "";
        var roleList = new List<RoleMaster>();
        if (filterType == 9)
        {
            paramFilter = filter.ChangeFilter();
        }
        else
        {
            paramFilter = filter;
        }

        using (var command = _context.Database.GetDbConnection().CreateCommand())
        {
            command.CommandText = "ec.GetAllRoles";
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.Add(new SqlParameter("@filter", paramFilter));
            command.Parameters.Add(new SqlParameter("@pageSize", pageSize));
            command.Parameters.Add(new SqlParameter("@pageNumber", pageNumber));
            command.Parameters.Add(new SqlParameter("@filterType", filterType));
            await _context.Database.OpenConnectionAsync();

            using (var reader = await command.ExecuteReaderAsync())
            {
                if (reader.HasRows)
                {
                    while (await reader.ReadAsync())
                    {
                        roleList.Add(
                            new RoleMaster
                            {
                                Role_Id = reader.GetInt32(reader.GetOrdinal("Role_Id")),
                                Role_Name = reader.GetString(reader.GetOrdinal("Role_Name")),
                                TotalCount = reader.GetInt32(reader.GetOrdinal("TotalCount")),
                            });
                    }
                }
            }
        }

        return roleList;
    }



    public async Task<List<RoleMaster>> GetRoleById(int id)
    {
        var roleList = new List<RoleMaster>();

        using (var command = _context.Database.GetDbConnection().CreateCommand())
        {
            command.CommandText = "ec.GetRoleById";
            command.CommandType = System.Data.CommandType.StoredProcedure;

            command.Parameters.Add(new SqlParameter("@RoleId", id));

            await _context.Database.OpenConnectionAsync();

            using (var reader = await command.ExecuteReaderAsync())
            {
                if (reader.HasRows)
                {
                    while (await reader.ReadAsync())
                    {
                        roleList.Add(
                            new RoleMaster
                            {
                                Role_Id = reader.GetInt32(reader.GetOrdinal("Role_Id")),
                                Role_Name = reader.GetString(reader.GetOrdinal("Role_Name")),
                            });
                    }
                }
            }
        }

        return roleList;
    }

    public async Task<string> DeleteRole(Guid id)
    {
        try
        {
            using (var command = _context.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = "ec.usp_DeleteRole";
                command.CommandType = System.Data.CommandType.StoredProcedure;

                command.Parameters.Add(new SqlParameter("@Role_Id", id));

                // Open the connection
                await _context.Database.OpenConnectionAsync();

                // Execute the stored procedure and retrieve the output message
                var result = await command.ExecuteScalarAsync();

                // Return the result message or a default error message if result is null
                return result?.ToString() ?? "An error occurred while trying to delete the product.";
            }
        }
        catch (Exception ex)
        {
            // Log the exception and throw or handle it as needed
            throw new Exception("An error occurred while deleting the product.", ex);
        }
    }

    public async Task<OutputResponse> SaveRole(RoleMaster role)
    {
        int errorStatus = 0;
        string outputMessage = string.Empty;

        using (var command = _context.Database.GetDbConnection().CreateCommand())
        {
            command.CommandText = "ec.SaveUpdateDeleteRole";
            command.CommandType = CommandType.StoredProcedure;

            int mode = role.Role_Id == 0 ? 1 : 2;
            command.Parameters.Add(new SqlParameter("@Mode", mode));
            command.Parameters.Add(new SqlParameter("@Role_Id", role.Role_Id));
            command.Parameters.Add(new SqlParameter("@Role_Name", role.Role_Name));

            var errorStatusParam = new SqlParameter("@ErrorStatus", SqlDbType.Int)
            { Direction = ParameterDirection.Output };
            command.Parameters.Add(errorStatusParam);

            var outputMessageParam = new SqlParameter("@OutputMessage", SqlDbType.NVarChar, 500)
            { Direction = ParameterDirection.Output };
            command.Parameters.Add(outputMessageParam);

            // Execute the stored procedure
            await _context.Database.OpenConnectionAsync();
            await command.ExecuteNonQueryAsync();

            // Fetch output parameter values
            errorStatus = (int)errorStatusParam.Value;
            outputMessage = (string)outputMessageParam.Value;
        }
        return new OutputResponse 
        {
            ErrorStatus = errorStatus,
            OutputMessage = outputMessage
        };

    }
}
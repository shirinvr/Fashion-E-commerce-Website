using System.Data;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.SwaggerGen;

public class AuthRepository : IAuthRepository
{
    private readonly EcommerceContext _context;

    public AuthRepository(EcommerceContext context)
    {
        _context = context;
    }

    // public async Task<List<Login>> ValidateLogin(string UserName, string UserPswd)
    // {
    //     var LoginList = new List<Login>();
    //     try
    //     {
    //         using (var command = _context.Database.GetDbConnection().CreateCommand())
    //         {
    //             command.CommandText = "ec.ValidateLogin";
    //             command.CommandType = System.Data.CommandType.StoredProcedure;

    //             command.Parameters.Add(new SqlParameter("@Username", UserName));
    //             command.Parameters.Add(new SqlParameter("@UserPswd", UserPswd));

    //             // Open the connection
    //             await _context.Database.OpenConnectionAsync();

    //             // Execute the stored procedure and retrieve the output message
    //             // var result = await command.ExecuteScalarAsync();
    //             using (var reader = await command.ExecuteReaderAsync())
    //             {
    //                 if (reader.HasRows)
    //                 {
    //                     while (await reader.ReadAsync())
    //                     {
    //                         LoginList.Add(
    //                             new Login
    //                             {
    //                                 UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
    //                                 RoleId = reader.GetInt32(reader.GetOrdinal("Role_Id")),
    //                                 ErrorStatus = reader.GetInt32(reader.GetOrdinal("ErrorStatus")),
    //                                 OutputMessage = reader.GetString(reader.GetOrdinal("OutputMessage"))
    //                             });
    //                     }
    //                 }
    //             }
    //         }
    //         return LoginList;
    //     }
    //     catch (Exception ex)
    //     {
    //         // Log the exception and throw or handle it as needed
    //         throw new Exception("Login failed", ex);
    //     }
    // }

}

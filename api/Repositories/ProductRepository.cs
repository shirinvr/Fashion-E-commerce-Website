using System.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using Swashbuckle.AspNetCore.SwaggerGen;

public class ProductRepository : IProductRepository
{
    private readonly EcommerceContext _context;

    public ProductRepository(EcommerceContext context)
    {
        _context = context;
    }

    // public async Task<IEnumerable<Product>> GetAllProducts()
    // {
    //     return await _context.Products
    //         .FromSqlRaw("EXEC ec.GetAllProducts")
    //         .ToListAsync();
    // }

    public async Task<List<Product>> GetAllProducts(string filter, int pageSize, int pageNumber, int filterType)
    {
        var paramFilter = "";
        var productList = new List<Product>();
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
            command.CommandText = "ec.GetAllProducts";
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
                        productList.Add(
                            new Product
                            {
                                Id = reader.GetGuid(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                                Description = reader.GetString(reader.GetOrdinal("Description")),
                                Product_categoryId = reader.GetGuid(reader.GetOrdinal("Product_categoryId")),
                                category_name = reader.GetString(reader.GetOrdinal("category_name")),
                                TotalCount = reader.GetInt32(reader.GetOrdinal("TotalCount")),
                            });
                    }
                }
            }
        }

        return productList;
    }



    public async Task<List<Product>> GetProductById(Guid id)
    {
        var productList = new List<Product>();

        using (var command = _context.Database.GetDbConnection().CreateCommand())
        {
            command.CommandText = "ec.GetProductById";
            command.CommandType = System.Data.CommandType.StoredProcedure;

            command.Parameters.Add(new SqlParameter("@ProductId", id));

            await _context.Database.OpenConnectionAsync();

            using (var reader = await command.ExecuteReaderAsync())
            {
                if (reader.HasRows)
                {
                    while (await reader.ReadAsync())
                    {
                        productList.Add(
                            new Product
                            {
                                Id = reader.GetGuid(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                                Description = reader.GetString(reader.GetOrdinal("Description")),
                                Product_categoryId = reader.GetGuid(reader.GetOrdinal("Product_categoryId")),
                                category_name = reader.GetString(reader.GetOrdinal("category_name"))
                            });
                    }
                }
            }
        }

        return productList;
    }

    public async Task<string> DeleteProduct(Guid id)
    {
        try
        {
            using (var command = _context.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = "ec.DeleteProduct";
                command.CommandType = System.Data.CommandType.StoredProcedure;

                command.Parameters.Add(new SqlParameter("@ProductId", id));

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

    public async Task<ProductResponse> SaveProduct(Product product)
    {
        var productList = new List<Product>();
        int errorStatus = 0;
        string outputMessage = string.Empty;

        using (var command = _context.Database.GetDbConnection().CreateCommand())
        {
            command.CommandText = "ec.SAVE_PRODUCT";
            command.CommandType = CommandType.StoredProcedure;

            // Add input parameters
            int mode = product.Id == Guid.Empty ? 0 : 1;
            command.Parameters.Add(new SqlParameter("@Mode", mode));
            command.Parameters.Add(new SqlParameter("@ProductId", product.Id));
            command.Parameters.Add(new SqlParameter("@Product_Name", product.Name));
            command.Parameters.Add(new SqlParameter("@Product_Category_Id", product.Product_categoryId));
            command.Parameters.Add(new SqlParameter("@Description", product.Description));
            command.Parameters.Add(new SqlParameter("@Price", product.Price));

            // Add output parameters
            var errorStatusParam = new SqlParameter("@ErrorStatus", SqlDbType.Int)
            {
                Direction = ParameterDirection.Output
            };
            command.Parameters.Add(errorStatusParam);

            var outputMessageParam = new SqlParameter("@OutputMessage", SqlDbType.NVarChar, 500)
            {
                Direction = ParameterDirection.Output
            };
            command.Parameters.Add(outputMessageParam);

            // Execute the stored procedure
            await _context.Database.OpenConnectionAsync();
            await command.ExecuteNonQueryAsync();

            // Fetch output parameter values
            errorStatus = (int)errorStatusParam.Value;
            outputMessage = (string)outputMessageParam.Value;
        }

        // Return the response with products, error status, and message
        return new ProductResponse
        {
            Products = productList, // Empty list in this case
            ErrorStatus = errorStatus,
            OutputMessage = outputMessage
        };
    }
}

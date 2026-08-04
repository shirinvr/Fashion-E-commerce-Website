using System.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;

public class Product_categoryRepository : IProduct_categoryRepository
{
    private readonly EcommerceContext _context;

    public Product_categoryRepository(EcommerceContext context)
    {
        _context = context;
    }

    // public async Task<IEnumerable<Product>> GetAllProducts()
    // {
    //     return await _context.Products
    //         .FromSqlRaw("EXEC ec.GetAllProducts")
    //         .ToListAsync();
    // }

    public async Task<List<Category>> GetAllCategory()
    {
        var catList = new List<Category>();

        using (var command = _context.Database.GetDbConnection().CreateCommand())
        {
            command.CommandText = "ec.GetAllProducts_Category";
            command.CommandType = System.Data.CommandType.StoredProcedure;

            await _context.Database.OpenConnectionAsync();

            using (var reader = await command.ExecuteReaderAsync())
            {
                if (reader.HasRows)
                {
                    while (await reader.ReadAsync())
                    {
                        catList.Add(
                            new Category
                            {
                                product_categoryId = reader.GetGuid("Product_categoryId"),
                                category_name = reader.GetString(reader.GetOrdinal("category_name"))
                            });
                    }
                }
            }
        }

        return catList;
    }



    public async Task<List<Category>> GetCategoryById(Guid id)
    {
        var catList = new List<Category>();

        using (var command = _context.Database.GetDbConnection().CreateCommand())
        {
            command.CommandText = "ec.GetCategoryById";
            command.CommandType = System.Data.CommandType.StoredProcedure;

            command.Parameters.Add(new SqlParameter("@CategoryId", id));

            await _context.Database.OpenConnectionAsync();

            using (var reader = await command.ExecuteReaderAsync())
            {
                if (reader.HasRows)
                {
                    while (await reader.ReadAsync())
                    {
                        catList.Add(
                            new Category
                            {
                                product_categoryId = reader.GetGuid(reader.GetOrdinal("Product_categoryId")),
                                category_name = reader.GetString(reader.GetOrdinal("category_name"))
                            });
                    }
                }
            }
        }

        return catList;
    }







    public async Task<Category> AddCategory(Category category)
    {
        var productIdParam = new SqlParameter
        {
            ParameterName = "@ProductId",
            SqlDbType = System.Data.SqlDbType.UniqueIdentifier,
            Direction = System.Data.ParameterDirection.Output
        };

        var parameters = new[]
        {
        new SqlParameter("@Name", category.category_name),
        productIdParam
    };

        // Execute stored procedure
        await _context.Database
            .ExecuteSqlRawAsync("EXEC AddProduct @Name, @Price, @Description, @ProductId OUT", parameters);

        // Retrieve the newly generated GUID from the output parameter
        var newProductId = (Guid)productIdParam.Value;

        // Optionally, retrieve the newly added product
        var newProduct = await _context.Category
            .FirstOrDefaultAsync(p => p.product_categoryId == newProductId);

        return newProduct;
    }



    public async Task<Category> UpdateCategory(Category category)
    {
        var parameters = new[]
        {
            new SqlParameter("@ProductId", category.product_categoryId),
            new SqlParameter("@Name", category.category_name),
        };

        await _context.Database.ExecuteSqlRawAsync("EXEC UpdateProduct @ProductId, @Name", parameters);
        return category;
    }

    public async Task DeleteCategory(Guid id)
    {
        // await _context.Database.ExecuteSqlRawAsync("EXEC DeleteProduct @ProductId", new SqlParameter("@ProductId", id));
    }
}

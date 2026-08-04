using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

public class Product_categoryService : IProduct_categoryService
{
    private IProduct_categoryRepository _catrepository;
    private readonly ILogger<Product_categoryService> _logger;

    public Product_categoryService(IProduct_categoryRepository repository, ILogger<Product_categoryService> logger)
    {
        _catrepository = repository;
        _logger = logger;
    }

    public Product_categoryService(IProduct_categoryRepository repository)
    {
        _catrepository = repository;
    }

    public async Task<List<Category>> GetAllCategory()
    {
        return await _catrepository.GetAllCategory();
    }
    // public async Task<List<Product>> GetProductById(Guid id)
    // {
    //     return await _catrepository.GetProductById(id);
    // }

    public async Task<List<Category>> GetCategoryById(Guid id)
    {
        try
        {
            // Attempt to retrieve the product from the repository
            return await _catrepository.GetCategoryById(id);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging and monitoring purposes
            _logger.LogError(ex, "An error occurred", id);

            // Throw a custom exception or handle it as per your application's requirement
            throw new Exception("Failed to retrieve data from database.", ex);
        }
    }

    public async Task<Category> AddCategory(Category category)
    {
        return await _catrepository.AddCategory(category);
    }

    public async Task<Category> UpdateCategory(Category category)
    {
        return await _catrepository.UpdateCategory(category);
    }

    public async Task DeleteCategory(Guid id)
    {
        await _catrepository.DeleteCategory(id);
    }
}

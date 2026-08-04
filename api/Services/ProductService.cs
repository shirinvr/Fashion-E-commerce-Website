using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

public class ProductService : IProductService
{
    private IProductRepository _repository;
    private readonly ILogger<ProductService> _logger;

    public ProductService(IProductRepository repository, ILogger<ProductService> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public ProductService(IProductRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Product>> GetAllProducts(string filter, int pageSize, int pageNumber, int filterType)
    {
        try
        {
            return await _repository.GetAllProducts(filter, pageSize, pageNumber, filterType);
        }
        catch (Exception ex)
        {
            throw new Exception("Failed to retrieve", ex);
        }
    }
    // public async Task<List<Product>> GetProductById(Guid id)
    // {
    //     return await _repository.GetProductById(id);
    // }

    public async Task<List<Product>> GetProductById(Guid id)
    {
        try
        {
            // Attempt to retrieve the product from the repository
            return await _repository.GetProductById(id);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging and monitoring purposes
            _logger.LogError(ex, "An error occurred", id);

            // Throw a custom exception or handle it as per your application's requirement
            throw new Exception("Failed to retrieve data from database.", ex);
        }
    }

    public async Task<ProductResponse> SaveProduct(Product product)
    {
        try
        {
            return await _repository.SaveProduct(product);
        }
        catch (Exception ex)
        {
            throw new Exception("Failed to save or update", ex);
        }
    }

    public async Task<string> DeleteProduct(Guid id)
    {
        try
        {
            // Attempt to delete the product from the repository
            return await _repository.DeleteProduct(id);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging and monitoring purposes
            _logger.LogError(ex, "An error occurred while deleting the product with ID {ProductId}", id);

            // Throw a custom exception or handle it as per your application's requirement
            throw new Exception("Failed to delete the product from the database.", ex);
        }
    }

}

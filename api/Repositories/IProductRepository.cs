public interface IProductRepository
{
    Task<List<Product>> GetAllProducts(string filter, int pageSize, int pageNumber,int filterType);
    Task<List<Product>> GetProductById(Guid id);
    Task<ProductResponse> SaveProduct(Product product);
    Task<string> DeleteProduct(Guid id);
}

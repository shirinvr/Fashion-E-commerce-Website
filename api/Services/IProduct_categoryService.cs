

public interface IProduct_categoryService
{
    Task<List<Category>> GetAllCategory();
    Task<List<Category>> GetCategoryById(Guid id);
    Task<Category> AddCategory(Category category);
    Task<Category> UpdateCategory(Category category);
    Task DeleteCategory(Guid id);
}

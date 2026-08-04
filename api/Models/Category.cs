using Microsoft.EntityFrameworkCore;

[Keyless]
public class Category
{
    public Guid product_categoryId { get; set; }
    public string? category_name { get; set; }
    
    // Navigation property for products
    // public ICollection<Product>? Products { get; set; }
}

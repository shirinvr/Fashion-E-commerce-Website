public class Product
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public decimal Price { get; set; }
    public string? Description { get; set; }
    public int? TotalCount { get; set; }

    public Guid? Product_categoryId { get; set; }
    public string? category_name { get; set; }
    public string? OutputMessage { get; set; }
    public int ErrorStatus { get; set; }
    public int Mode { get; set; }
}

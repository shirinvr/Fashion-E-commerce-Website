using System.ComponentModel.DataAnnotations.Schema;

public class RoleMaster
{
    public int Role_Id { get; set; }
    public string? Role_Name { get; set; }

    [NotMapped]
    public string? Description { get; set; }

    [NotMapped]
    public int? TotalCount { get; set; }

    [NotMapped]
    public string? OutputMessage { get; set; }


    [NotMapped]
    public int ErrorStatus { get; set; }

    [NotMapped]
    public int Mode { get; set; }
}

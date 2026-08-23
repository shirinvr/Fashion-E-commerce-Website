namespace api.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("refresh_tokens", Schema = "dbo")]
public class RefreshToken
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int id { get; set; }

    public int userid { get; set; }

    public string tokenhash { get; set; } = string.Empty;

    public DateTime expiresat { get; set; }

    public DateTime createdat { get; set; } = DateTime.UtcNow;

    public DateTime? revokedat { get; set; }

    public User User { get; set; } = null!;
}
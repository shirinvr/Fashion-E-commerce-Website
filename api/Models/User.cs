using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("users", Schema = "dbo")]
    public class User
    {
        [Key]
        public int id { get; set; }

        [Required]
        public string email { get; set; } = string.Empty;

        [Required]
        public string passwordhash { get; set; } = string.Empty;

        public DateTime createdat { get; set; } = DateTime.UtcNow;

        public DateTime updatedat { get; set; } = DateTime.UtcNow;

        public bool isactive { get; set; } = true;

        public ICollection<RefreshToken> RefreshTokens { get; set; }
            = new List<RefreshToken>();
    }
}
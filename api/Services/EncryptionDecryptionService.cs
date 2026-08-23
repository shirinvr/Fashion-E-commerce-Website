using System.Security.Cryptography;
using System.Text;

namespace api.Services
{
    public class EncryptionService
    {
        private readonly string _key;
        private readonly string _iv;

        public EncryptionService(IConfiguration configuration)
        {
            _key = configuration["Encryption:AESKey"] ?? string.Empty;
            _iv = configuration["Encryption:AESIV"] ?? string.Empty;
        }

        public string Encrypt(string plainText)
        {
            if (string.IsNullOrEmpty(plainText))
                return plainText;

            try
            {
                using Aes aes = Aes.Create();

                aes.Key = Encoding.UTF8.GetBytes(_key);
                aes.IV = Encoding.UTF8.GetBytes(_iv);
                aes.Mode = CipherMode.CBC;
                aes.Padding = PaddingMode.PKCS7;

                using ICryptoTransform encryptor = aes.CreateEncryptor();

                byte[] plainBytes = Encoding.UTF8.GetBytes(plainText);

                byte[] encryptedBytes = encryptor.TransformFinalBlock(
                    plainBytes,
                    0,
                    plainBytes.Length
                );

                return Convert.ToBase64String(encryptedBytes);
            }
            catch
            {
                // Encryption failed - return original text
                return plainText;
            }
        }

        public string Decrypt(string cipherText)
        {
            if (string.IsNullOrEmpty(cipherText))
                return cipherText;

            try
            {
                using Aes aes = Aes.Create();

                aes.Key = Encoding.UTF8.GetBytes(_key);
                aes.IV = Encoding.UTF8.GetBytes(_iv);
                aes.Mode = CipherMode.CBC;
                aes.Padding = PaddingMode.PKCS7;

                using ICryptoTransform decryptor = aes.CreateDecryptor();

                byte[] cipherBytes = Convert.FromBase64String(cipherText);

                byte[] decryptedBytes = decryptor.TransformFinalBlock(
                    cipherBytes,
                    0,
                    cipherBytes.Length
                );

                return Encoding.UTF8.GetString(decryptedBytes);
            }
            catch
            {
                // Decryption failed - return original text
                return cipherText;
            }
        }
    }
}
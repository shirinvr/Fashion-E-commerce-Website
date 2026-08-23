import CryptoJS from 'crypto-js';

const SECRET_KEY = '1234567890123456'; // exactly 16 bytes
const IV = '1234567890123456';          // exactly 16 bytes

export function encryptAES128(value) {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const iv = CryptoJS.enc.Utf8.parse(IV);

  const encrypted = CryptoJS.AES.encrypt(
    value,
    key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  );

  return encrypted.toString();
}

export function decryptAES128(encryptedValue) {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const iv = CryptoJS.enc.Utf8.parse(IV);

  const decrypted = CryptoJS.AES.decrypt(
    encryptedValue,
    key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  );

  return decrypted.toString(CryptoJS.enc.Utf8);
}
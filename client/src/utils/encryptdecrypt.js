import CryptoJS from "crypto-js";

const SECRET_KEY = "1234567890123456";
const IV = "1234567890123456";

export function encryptAES128(value) {
    if (!value) return "";

    const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
    const iv = CryptoJS.enc.Utf8.parse(IV);

    const encrypted = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(value),
        key,
        {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );

    return encrypted.ciphertext.toString(
        CryptoJS.enc.Base64
    );
}

export function decryptAES128(encryptedValue) {
    if (!encryptedValue) return "";

    const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
    const iv = CryptoJS.enc.Utf8.parse(IV);

    const cipherParams =
        CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(
                encryptedValue
            )
        });

    const decrypted = CryptoJS.AES.decrypt(
        cipherParams,
        key,
        {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );

    return decrypted.toString(
        CryptoJS.enc.Utf8
    );
}

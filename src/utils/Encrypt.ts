import CryptoJS from 'crypto-js';
export default function Encrypt(obj: any) {
    let key = CryptoJS.enc.Utf8.parse('1234567890ABCDEF1234567890ABCDEF');
    let iv = CryptoJS.enc.Utf8.parse('0123456789ABCDEF');

    let srcs = JSON.stringify(obj);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    // 需要返回base64格式的加密结果
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

    // 需要返回hex格式的加密结果
    // return encrypted.ciphertext.toString().toUpperCase();
}
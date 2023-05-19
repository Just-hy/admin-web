// import CryptoJS from 'crypto-js';
// export default function Decrypt(str: string) {
//     let key = CryptoJS.enc.Utf8.parse('1234567890ABCDEF1234567890ABCDEF');
//     let iv = CryptoJS.enc.Utf8.parse('0123456789ABCDEF');

//     let base64 = CryptoJS.enc.Base64.parse(str);
//     let src = CryptoJS.enc.Base64.stringify(base64);

//     var decrypt = CryptoJS.AES.decrypt(src, key, {
//         iv: iv,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7
//     });

//     var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
//     let resultObj = JSON.parse(decryptedStr);
//     return resultObj;
// }
import CryptoJS from 'crypto-js';

export default function Decrypt(encrypted: string) {
    let key = CryptoJS.enc.Utf8.parse('1234567890ABCDEF1234567890ABCDEF');
    let iv = CryptoJS.enc.Utf8.parse('0123456789ABCDEF');

    // 先把Base64字符串转成CipherParams对象
    let cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(encrypted),
    });

    // 解密
    let decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    // console.log('decrypted:', decrypted);
    // console.log('decrypted.toString():', decrypted.toString());
    // console.log('decrypted.toString(CryptoJS.enc.Utf8):', decrypted.toString(CryptoJS.enc.Utf8));

    // 把解密结果转为JSON对象并返回
    return JSON.parse(CryptoJS.enc.Utf8.stringify(decrypted).replace(/\0+$/, ''));
}
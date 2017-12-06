/**
 * AES加密
 */
define(['modeEcb'], function () {
    //AES加密
    var aesEncrypt = function (word) {
        //转换成utf8的字符串
        var key       = CryptoJS.enc.Utf8.parse("2015xy0505QQHb2b");
        var srcs      = CryptoJS.enc.Utf8.parse(word);
        //ecb对称加密
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
        return encrypted.toString();
    };
    return {
        aesEncrypt: aesEncrypt
    }
});
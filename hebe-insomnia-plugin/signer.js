const aCrypto = require('crypto');

function getDigest(body) {
    if (body == null) return "";

    const hash = aCrypto.createHash('SHA256');
    hash.update(body);
    return hash.digest("base64");
}

function getSignatureValue(values, pkey) {
    const sign = aCrypto.createSign('RSA-SHA256');
    sign.update(values);
    return sign.sign("-----BEGIN PRIVATE KEY-----\n" + pkey + "\n-----END PRIVATE KEY-----", "base64");
}

function getCanonicalUrl(fullUrl) {
    const url = fullUrl.match("(api/mobile/.+)");
    if (url == null) throw 'The URL does not seem correct (does not match `(api/mobile/.+)` regex)';

    return encodeURIComponent(url[0]).toLowerCase();
}

function getHeadersList(body, digest, canonicalUrl, timestamp) {
    const signData = [
        ['vCanonicalUrl', canonicalUrl],
        body == null ? null : ['Digest', digest],
        ['vDate', new Date(timestamp + 1000).toUTCString()]
    ].filter(item => !!item);

    return {
        "headers": signData.map(item => item[0]).join(" "),
        "values": signData.map(item => item[1]).join()
    };
}

function getSignatureValues(fingerprint, pkey, body, fullUrl, timestamp) {
    const canonicalUrl = getCanonicalUrl(fullUrl);
    const digest = getDigest(body);
    const {headers, values} = getHeadersList(body, digest, canonicalUrl, timestamp);
    const signatureValue = getSignatureValue(values, pkey);

    return {
        "digest": `SHA-256=${digest}`,
        "canonicalUrl": canonicalUrl,
        "signature": `keyId="${fingerprint}",headers="${headers}",algorithm="sha256withrsa",signature=Base64(SHA256withRSA(${signatureValue}))`
    };
}

exports.getSignatureValues = getSignatureValues;

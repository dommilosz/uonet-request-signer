const aCrypto = require('crypto');

function getDigest(body) {
    if (body == null) return "";

    const hash = aCrypto.createHash('SHA256');
    hash.update(body);
    return hash.digest("base64");
}

function getSignature(values, pkey) {
    const sign = aCrypto.createSign('RSA-SHA256');
    sign.update(values);
    return sign.sign(pkey, "base64");
}

function getCanonicalUrl(fullUrl) {
    const url = fullUrl.match("(api/mobile/.+)");
    if (url == null) throw 'The URL does not seem correct (does not match `(api/mobile/.+)` regex)';

    return encodeURIComponent(url[0]).toLowerCase();
}

function getHeadersList(body, digest, canonicalUrl, timestamp) {
    const timestampStrHeader = new Date(timestamp + 1000).toUTCString();
    let signData = [
        ['vCanonicalUrl', canonicalUrl],
        body == null ? null : ['Digest', digest],
        ['vDate', timestampStrHeader]
    ];
    let headers = "";
    let values = "";
    let first = true;
    for (let data in signData) {
        data = signData[data];
        if (data == null)
            continue;
        if (!first)
            headers += " ";
        first = false;
        headers += data[0];
        values += data[1];
    }

    return {"headers": headers, "values": values};
}

function getSignatureValues(fingerprint, pkey, body, fullUrl, timestamp) {
    const canonicalUrl = getCanonicalUrl(fullUrl);
    const digest = getDigest(body);
    const {headers, values} = getHeadersList(body, digest, canonicalUrl, timestamp);
    const signature = getSignature(values, pkey);

    return {
        "digest": digest,
        "keyId": fingerprint,
        "headers": headers,
        "signature": signature,
        "canonicalUrl": canonicalUrl
    };
}

exports.getSignatureValues = getSignatureValues;

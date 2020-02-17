const uuid = require('uuid/v4');
const {getSignatureValues} = require("./signer");

function getOrThrow(context, name) {
    let header = context.request.getHeader(name);
    if (header === null || header.length === 0) {
        throw `No ${name} header`;
    }
    return header;
}

module.exports.requestHooks = [
    async (context) => {
        if (!context.request.hasHeader('PrivateKey')) return;

        const pkey = "-----BEGIN PRIVATE KEY-----\n" + getOrThrow(context, "PrivateKey") + "\n-----END PRIVATE KEY-----";
        const fingerprint = getOrThrow(context, "Fingerprint");
        const deviceModel = getOrThrow(context, "DeviceModel");
        const firebaseToken = getOrThrow(context, "FirebaseToken");

        let timestamp = +context.request.getHeader('Timestamp');
        if (timestamp === 0) timestamp = +new Date();
        const timestampStrHeader = new Date(timestamp + 1000).toUTCString();

        const body = getWrappedBody(context.request.getMethod(), context.request.getBodyText(), fingerprint, firebaseToken, timestamp);
        context.request.setBodyText(body);

        const {digest, signature, headers, keyId, canonicalUrl} = getSignatureValues(fingerprint, pkey, body, context.request.getUrl(), timestamp);

        context.request.setHeader('User-Agent', 'okhttp/3.11.0');
        context.request.setHeader('vOS', 'Android');
        context.request.setHeader('vDeviceModel', deviceModel);
        context.request.setHeader('vAPI', 1);
        context.request.setHeader('vDate', timestampStrHeader);
        context.request.setHeader('vCanonicalUrl', canonicalUrl);
        context.request.setHeader('Signature', `keyId="${keyId}",headers="${headers}",algorithm="sha256withrsa",signature=Base64(SHA256withRSA(${signature}))`);
        if (body != null) context.request.setHeader('Digest', `SHA-256=${digest}`);

        context.request.removeHeader('PrivateKey');
        context.request.removeHeader('Fingerprint');
        context.request.removeHeader('DeviceModel');
        context.request.removeHeader('Timestamp');
        context.request.removeHeader('FirebaseToken');
    }
];

function getWrappedBody(method, body, fingerprint, firebaseToken, timestamp) {
    if (method !== 'POST') {
        if (method !== 'GET') throw 'Incorrect request method (GET or POST).';
        else return null
    }

    return JSON.stringify({
        AppName: 'DzienniczekPlus 2.0',
        AppVersion: '1.0',
        CertificateId: fingerprint,
        Envelope: JSON.parse(body),
        FirebaseToken: firebaseToken,
        API: 1,
        RequestId: uuid(),
        Timestamp: timestamp,
        TimestampFormatted: new Date(timestamp + 3600 * 1000 + 1000).toUTCString()
    });
}

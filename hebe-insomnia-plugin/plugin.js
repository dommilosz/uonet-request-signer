

aCrypto = require('crypto');
const uuidv4 = require('uuid/v4');

module.exports.requestHooks = [
    async (context) => {
        if (context.request.hasHeader('PrivateKey')) {
            let body = context.request.getBodyText();


            let pkey = context.request.getHeader('PrivateKey');
            if (pkey === null) {
                throw 'No PrivateKey header';
            }
            pkey = "-----BEGIN PRIVATE KEY-----\n"+context.request.getHeader('PrivateKey')+"\n-----END PRIVATE KEY-----";
            let fingerprint = context.request.getHeader('Fingerprint');
            if (fingerprint === null || fingerprint.length === 0) {
                throw 'No Fingerprint header';
            }
            let deviceModel = context.request.getHeader('DeviceModel');
            if (deviceModel === null || fingerprint.length === 0) {
                throw 'No DeviceModel header';
            }
            let firebaseToken = context.request.getHeader('FirebaseToken');
            if (firebaseToken === null || firebaseToken.length === 0) {
                throw 'No FirebaseToken header';
            }

            let timestamp = + context.request.getHeader('Timestamp');
            if (timestamp === 0)
                timestamp = + new Date();

            let timestampStr = new Date(timestamp + 3600*1000 + 1000).toUTCString();
            let timestampStrHeader = new Date(timestamp + 1000).toUTCString();



            if (context.request.getMethod() !== 'POST') {
                if (context.request.getMethod() !== 'GET') {
                    throw 'Incorrect request method (GET or POST).';
                }
                body = null
            }
            else {
                console.log(body);
                body = JSON.parse(body);
                console.log(body);
                body = JSON.stringify({
                    AppName: 'DzienniczekPlus 2.0',
                    AppVersion: '1.0',
                    CertificateId: fingerprint,
                    Envelope: body,
                    FirebaseToken: firebaseToken,
                    API: 1,
                    RequestId: uuidv4(),
                    Timestamp: timestamp,
                    TimestampFormatted: timestampStr
                });
                context.request.setBodyText(body);
                console.log(body);
            }

            let url = context.request.getUrl().match("(api/mobile/.+)");
            if (url == null) {
                throw 'The URL does not seem correct (does not match `(api/mobile/.+)` regex).';
            }
            url = encodeURIComponent(url[0]).toLowerCase();

            let digest = "";
            if (body != null) {
                let hash = aCrypto.createHash('SHA256');
                hash.update(body);
                digest = hash.digest("base64");
            }

            let signData = [
                ['vCanonicalUrl', url],
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

            console.log(headers);
            console.log(values);

            let sign = aCrypto.createSign('RSA-SHA256');
            sign.update(values);
            let signature = sign.sign(pkey, "base64");

            context.request.removeHeader('PrivateKey');
            context.request.removeHeader('Fingerprint');
            context.request.removeHeader('DeviceModel');
            context.request.removeHeader('Timestamp');
            context.request.removeHeader('FirebaseToken');
            context.request.setHeader('User-Agent', 'okhttp/3.11.0');
            context.request.setHeader('vOS', 'Android');
            context.request.setHeader('vDeviceModel', deviceModel);
            context.request.setHeader('vAPI', 1);
            context.request.setHeader('vDate', timestampStrHeader);
            context.request.setHeader('vCanonicalUrl', url);
            if (body != null)
                context.request.setHeader('Digest', 'SHA-256='+digest);
            context.request.setHeader('Signature', 'keyId="'+fingerprint+'",headers="'+headers+'",algorithm="sha256withrsa",signature=Base64(SHA256withRSA('+signature+'))');
        }
    }
];

# UONET+ hebe request signer for Node.js

[![npm](https://img.shields.io/npm/v/@wulkanowy/uonet-request-signer-node-hebe.svg?style=flat-square)](https://www.npmjs.com/package/@wulkanowy/uonet-request-signer-node-hebe)

## Instalation

```bash
$ npm i @wulkanowy/uonet-request-signer-node-hebe
```

## Usage

```js
const {getSignatureValues} = require("@wulkanowy/uonet-request-signer-node-hebe");

const {digest, canonicalUrl, signature} = getSignatureValues(fingerprint, privateKey, body, fullUrl, new Date().toUTCString());
```

See example in [tests](test.js)

## Tests

```bash
$ npm run test
```

# Uonet+ request signer for JavaScript

[![npm](https://img.shields.io/npm/v/@wulkanowy/uonet-request-signer.svg?style=flat-square)](https://www.npmjs.com/package/@wulkanowy/uonet-request-signer)

## Instalation

```bash
$ npm i @wulkanowy/uonet-request-signer
```

[Browser demo](https://wulkanowy.github.io/uonet-request-signer/)

## Usage

In browser:

```html
<script src="signer.js"></script>
<script>
    const signed = signer.signContent(password, certificate, content);
</script>
```

In Node.js:

```js
const signer = require("@wulkanowy/uonet-request-signer");

const signed = signer.signContent(password, certificate, content);
```

## Tests

```bash
$ npm run test
```

# Insomnia Dzienniczek+ 2020 request signer

[![npm](https://img.shields.io/npm/v/@wulkanowy/insomnia-plugin-uonet-request-signer-hebe.svg?style=flat-square)](https://www.npmjs.com/package/@wulkanowy/insomnia-plugin-uonet-request-signer-hebe)

This is a plugin for [Insomnia](https://insomnia.rest) that allows users to automatically sign requests to the API of Dzienniczek+ 2020 (codenamed `hebe`) app.

## Installation

Install the `@wulkanowy/insomnia-plugin-uonet-request-signer-hebe` plugin from Preferences > Plugins.

## Usage

Add to `Headers`:
- `PrivateKey` - API certificate's private key in PEM format - plain Base64 (no headers)
- `Fingerprint` - API certificate's SHA1 sum/fingerprint in hex format (no delimiters, lowercase)
- `DeviceModel` - user's Android device model, used to provide `vDeviceModel` request header
- `FirebaseToken` - user's Android device Firebase token - used to send push notifications to device. May be fake, not recommended.

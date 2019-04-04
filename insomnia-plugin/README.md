# Insomnia UONET+ request signer

[![npm](https://img.shields.io/npm/v/@wulkanowy/insomnia-plugin-uonet-request-signer.svg?style=flat-square)](https://www.npmjs.com/package/@wulkanowy/insomnia-plugin-uonet-request-signer)

This is a plugin for [Insomnia](https://insomnia.rest) that allows users to automatically sign requests to UONET+.

## Installation

Install the `@wulkanowy/insomnia-plugin-uonet-request-signer` plugin from Preferences > Plugins.

## Usage

Add to `Headers`:
- `RequestCertificatePassword` with API key
- `RequestCertificatePfx` - `CertyfikatPfx` from `Uczen.v3.UczenStart/Certyfikat`
- `RequestCertificateKey` - `CertyfikatKlucz` from `Uczen.v3.UczenStart/Certyfikat`

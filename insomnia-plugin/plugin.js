const signer = require("@wulkanowy/uonet-request-signer/signer");

forge = require('node-forge');

module.exports.requestHooks = [
  async (context) => {
    if (context.request.hasHeader('RequestCertificatePassword')) {
      await signer.signContent(
        context.request.getHeader('RequestCertificatePassword'),
        context.request.getHeader('RequestCertificatePfx'),
        context.request.getBodyText()
      ).then(function(result) {
        context.request.setHeader('RequestSignatureValue', result);
        context.request.removeHeader('RequestCertificatePfx');
        context.request.removeHeader('RequestCertificatePassword');
      });
    }
  }
];

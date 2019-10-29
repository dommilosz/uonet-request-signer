package io.github.wulkanowy.signer

import org.apache.commons.codec.binary.Base64
import java.io.ByteArrayInputStream
import java.security.KeyStore
import java.security.PrivateKey
import java.security.Signature

fun signContent(password: String, certificate: String?, content: String): String {
    val keystore = KeyStore.getInstance("pkcs12").apply {
        load(ByteArrayInputStream(Base64.decodeBase64(certificate)), password.toCharArray())
    }
    val signature = Signature.getInstance("SHA1WithRSA").apply {
        initSign(keystore.getKey("LoginCert", password.toCharArray()) as PrivateKey)
        update(content.toByteArray())
    }
    return Base64.encodeBase64String(signature.sign())
}

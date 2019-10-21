package io.github.wulkanowy.signer.android

import android.util.Base64
import java.io.ByteArrayInputStream
import java.security.KeyStore
import java.security.PrivateKey
import java.security.Signature

fun signContent(password: String, certificate: String?, content: String): String {
    val keystore = KeyStore.getInstance("pkcs12").apply {
        load(ByteArrayInputStream(Base64.decode(certificate, Base64.NO_WRAP)), password.toCharArray())
    }
    val signature = Signature.getInstance("SHA1WithRSA").apply {
        initSign(keystore.getKey("LoginCert", password.toCharArray()) as PrivateKey)
        update(content.toByteArray())
    }
    return Base64.encodeToString(signature.sign(), Base64.NO_WRAP)
}

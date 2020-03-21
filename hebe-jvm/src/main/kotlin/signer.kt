package io.github.wulkanowy.signer.hebe

import com.migcomponents.migbase64.Base64
import java.net.URLEncoder
import java.security.KeyFactory
import java.security.Signature
import java.security.spec.PKCS8EncodedKeySpec
import java.text.SimpleDateFormat
import java.util.*
import java.security.MessageDigest.getInstance as createSign

private fun getDigest(body: String?): String {
    if (body == null) return ""
    return Base64.encodeToString(createSign("SHA-256").digest(body.toByteArray()), false)
}

private fun getSignatureValue(values: String, privateKey: String): String {
    val bl = Base64.decode(privateKey)
    val spec = PKCS8EncodedKeySpec(bl)
    val kf = KeyFactory.getInstance("RSA")

    val privateSignature = Signature.getInstance("SHA256withRSA")
    privateSignature.initSign(kf.generatePrivate(spec))
    privateSignature.update(values.toByteArray())

    return Base64.encodeToString(privateSignature.sign(), false)
}

private fun getEncodedPath(path: String): String {
    val url = ("(api/mobile/.+)".toRegex().find(path))
        ?: throw IllegalArgumentException("The URL does not seem correct (does not match `(api/mobile/.+)` regex)")

    return URLEncoder.encode(url.groupValues[0], "UTF-8").orEmpty().toLowerCase()
}

private fun getHeadersList(body: String?, digest: String, canonicalUrl: String, timestamp: Date): Pair<String, String> {
    val signData = mutableMapOf<String, String>()
    signData["vCanonicalUrl"] = canonicalUrl
    if (body != null) signData["Digest"] = digest
    signData["vDate"] = SimpleDateFormat("EEE, d MMM yyyy hh:mm:ss z", Locale.ENGLISH).apply {
        timeZone = TimeZone.getTimeZone("GMT")
    }.format(timestamp)

    return Pair(
        first = signData.keys.joinToString(" "),
        second = signData.values.joinToString("")
    )
}

fun getSignatureValues(
    fingerprint: String,
    privateKey: String,
    body: String?,
    requestPath: String,
    timestamp: Date
): Triple<String, String, String> {
    val canonicalUrl = getEncodedPath(requestPath)
    val digest = getDigest(body)
    val (headers, values) = getHeadersList(body, digest, canonicalUrl, timestamp)
    val signatureValue = getSignatureValue(values, privateKey)

    return Triple(
        "SHA-256=${digest}",
        canonicalUrl,
        """keyId="$fingerprint",headers="$headers",algorithm="sha256withrsa",signature=Base64(SHA256withRSA($signatureValue))"""
    )
}

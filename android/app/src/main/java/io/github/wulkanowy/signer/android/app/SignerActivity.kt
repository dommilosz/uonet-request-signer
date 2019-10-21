package io.github.wulkanowy.signer.android.app

import android.app.Activity
import android.os.Bundle
import android.util.Log
import io.github.wulkanowy.signer.android.signContent
import kotlinx.android.synthetic.main.activity_main.*
import java.util.*
import java.util.concurrent.TimeUnit


class SignerActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        button.setOnClickListener {
            result.text = try {
                Log.d("signer", "Sign starts...")
                val start = Date()
                signContent(
                    password.text.toString(),
                    certificate.text.toString(),
                    content.text.toString()
                ).also {
                    val end = Date()
                    Log.d("signer", "Sign ends")
                    timer.text = getTimeTakenString(start, end)
                }
            } catch (e: Throwable) {
                Log.d("signer", "Sign errored: ${e.localizedMessage}")
                e.localizedMessage
            }
        }
    }

    private fun getTimeTakenString(start: Date, end: Date): String {
        val diff = end.time - start.time
        return String.format(
            "[%s] secs : [%s] microseconds",
            TimeUnit.MILLISECONDS.toSeconds(diff),
            TimeUnit.MICROSECONDS.toMicros(diff)
        )
    }
}

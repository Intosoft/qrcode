package com.intosoft.qrcode

import android.content.Context
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import com.google.gson.Gson
import java.io.BufferedReader
import java.io.InputStreamReader

enum class BodyShape(val value: String) {
    DOTS("dots"),
    CLASSY("classy")
}

enum class EyeballShape(val value: String) {
    LEAF("leaf"),
    POINTED("pointed"),
    EXTRA_ROUNDED("extra-rounded")
}

enum class EyeFrameShape(val value: String) {
    LEAF("leaf"),
    POINTED("pointed")
}

data class GradientConfig(
    val type: String,
    val colors: List<String>,
    val rotation: Double? = null
)

data class LogoConfig(
    val url: String,
    val size: Double = 0.15,
    val removeBackground: Boolean = false
)

data class QRCodeConfig(
    val text: String,
    val width: Int = 200,
    val height: Int = 200,
    val margin: Int = 10,
    val dotsColor: String = "#000000",
    val backgroundColor: String = "#ffffff",
    val bodyShape: BodyShape? = null,
    val eyeballShape: EyeballShape? = null,
    val eyeFrameShape: EyeFrameShape? = null,
    val gradient: GradientConfig? = null,
    val logo: LogoConfig? = null
)

class IntosoftQRCode private constructor() {
    companion object {
        private var v8Runtime: V8? = null
        private var isInitialized = false
        private val gson = Gson()

        @Synchronized
        private fun initialize(context: Context) {
            if (isInitialized) return

            v8Runtime = V8.createV8Runtime()
            
            val jsCode = context.assets.open("qrcode.js").use { inputStream ->
                BufferedReader(InputStreamReader(inputStream)).use { reader ->
                    reader.readText()
                }
            }
            
            v8Runtime?.executeScript(jsCode)
            isInitialized = true
        }

        fun generateSVG(context: Context, config: QRCodeConfig): String {
            initialize(context)
            
            val runtime = v8Runtime ?: throw QRCodeException("V8 runtime not initialized")
            
            val configMap = mutableMapOf<String, Any>(
                "text" to config.text,
                "width" to config.width,
                "height" to config.height,
                "margin" to config.margin,
                "dotsColor" to config.dotsColor,
                "bgColor" to config.backgroundColor
            )
            
            config.bodyShape?.let { configMap["bodyShape"] = it.value }
            config.eyeballShape?.let { configMap["eyeballShape"] = it.value }
            config.eyeFrameShape?.let { configMap["eyeFrameShape"] = it.value }
            
            config.gradient?.let { gradient ->
                configMap["gradient"] = mapOf(
                    "type" to gradient.type,
                    "colors" to gradient.colors,
                    "rotation" to gradient.rotation
                ).filterValues { it != null }
            }
            
            config.logo?.let { logo ->
                configMap["logo"] = mapOf(
                    "url" to logo.url,
                    "size" to logo.size,
                    "removeBackground" to logo.removeBackground
                )
            }
            
            val configJson = gson.toJson(configMap)
            
            val script = """
                (function() {
                    try {
                        const config = $configJson;
                        return window.qrcode.generateSVGString(config);
                    } catch (error) {
                        return JSON.stringify({ error: error.message });
                    }
                })()
            """.trimIndent()
            
            val result = runtime.executeStringScript(script)
            
            if (result.contains("\"error\"")) {
                throw QRCodeException("JavaScript error: $result")
            }
            
            return result
        }

        fun generateSVG(
            context: Context,
            text: String,
            width: Int = 200,
            height: Int = 200,
            dotsColor: String = "#000000",
            backgroundColor: String = "#ffffff"
        ): String {
            val config = QRCodeConfig(
                text = text,
                width = width,
                height = height,
                dotsColor = dotsColor,
                backgroundColor = backgroundColor
            )
            return generateSVG(context, config)
        }

        fun release() {
            v8Runtime?.release()
            v8Runtime = null
            isInitialized = false
        }
    }
}

class QRCodeException(message: String) : Exception(message)

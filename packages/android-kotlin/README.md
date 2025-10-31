# Intosoft QRCode - Android (Kotlin)

Native Kotlin wrapper for the Intosoft QRCode library. Generates beautiful, customizable QR codes using your existing JavaScript implementation via J2V8.

## Installation

### Gradle (build.gradle.kts)

```kotlin
dependencies {
    implementation("com.intosoft:qrcode-android:0.1.4")
}
```

### Gradle (build.gradle)

```groovy
dependencies {
    implementation 'com.intosoft:qrcode-android:0.1.4'
}
```

### Manual Installation

1. Copy `qrcode.js` to `src/main/assets/`
2. Add J2V8 dependency:
```gradle
implementation 'com.eclipsesource.j2v8:j2v8:6.2.1@aar'
implementation 'com.google.code.gson:gson:2.10.1'
```

## Usage

### Basic Example

```kotlin
import com.intosoft.qrcode.IntosoftQRCode

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        try {
            val svgString = IntosoftQRCode.generateSVG(
                context = this,
                text = "https://example.com",
                width = 300,
                height = 300
            )
            
            // Display in WebView
            webView.loadDataWithBaseURL(
                null,
                """
                <!DOCTYPE html>
                <html>
                <body style="margin:0;display:flex;justify-content:center;align-items:center;height:100vh;">
                    $svgString
                </body>
                </html>
                """.trimIndent(),
                "text/html",
                "UTF-8",
                null
            )
        } catch (e: Exception) {
            Log.e("QRCode", "Error generating QR code", e)
        }
    }
}
```

### Advanced Configuration

```kotlin
import com.intosoft.qrcode.*

// Create gradient
val gradient = GradientConfig(
    type = "linear",
    colors = listOf("#667eea", "#764ba2"),
    rotation = 45.0
)

// Add logo
val logo = LogoConfig(
    url = "https://example.com/logo.png",
    size = 0.2,
    removeBackground = true
)

// Full configuration
val config = QRCodeConfig(
    text = "https://example.com",
    width = 300,
    height = 300,
    margin = 10,
    dotsColor = "#000000",
    backgroundColor = "#ffffff",
    bodyShape = BodyShape.DOTS,
    eyeballShape = EyeballShape.LEAF,
    eyeFrameShape = EyeFrameShape.POINTED,
    gradient = gradient,
    logo = logo
)

val svgString = IntosoftQRCode.generateSVG(this, config)
```

### Jetpack Compose

```kotlin
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.viewinterop.AndroidView
import android.webkit.WebView

@Composable
fun QRCodeView(
    text: String,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    var svgString by remember { mutableStateOf("") }
    
    LaunchedEffect(text) {
        svgString = IntosoftQRCode.generateSVG(
            context = context,
            text = text,
            width = 300,
            height = 300
        )
    }
    
    AndroidView(
        modifier = modifier.size(300.dp),
        factory = { ctx ->
            WebView(ctx).apply {
                settings.javaScriptEnabled = false
            }
        },
        update = { webView ->
            webView.loadDataWithBaseURL(
                null,
                """
                <!DOCTYPE html>
                <html>
                <body style="margin:0;">
                    $svgString
                </body>
                </html>
                """.trimIndent(),
                "text/html",
                "UTF-8",
                null
            )
        }
    )
}

// Usage
@Composable
fun MyScreen() {
    QRCodeView(text = "https://example.com")
}
```

### Display in XML Layout

```xml
<!-- activity_main.xml -->
<WebView
    android:id="@+id/webView"
    android:layout_width="300dp"
    android:layout_height="300dp" />
```

```kotlin
// MainActivity.kt
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        val webView = findViewById<WebView>(R.id.webView)
        
        val svgString = IntosoftQRCode.generateSVG(
            context = this,
            text = "https://example.com"
        )
        
        val html = """
            <!DOCTYPE html>
            <html>
            <body style="margin:0;display:flex;justify-content:center;align-items:center;height:100vh;">
                $svgString
            </body>
            </html>
        """.trimIndent()
        
        webView.loadDataWithBaseURL(null, html, "text/html", "UTF-8", null)
    }
    
    override fun onDestroy() {
        super.onDestroy()
        IntosoftQRCode.release() // Clean up V8 runtime
    }
}
```

## Available Options

### Body Shapes
- `BodyShape.DOTS` - Dotted pattern
- `BodyShape.CLASSY` - Classic squares with rounded corners

### Eyeball Shapes
- `EyeballShape.LEAF` - Leaf-shaped eyeballs
- `EyeballShape.POINTED` - Pointed corners
- `EyeballShape.EXTRA_ROUNDED` - Extra rounded corners

### Eye Frame Shapes
- `EyeFrameShape.LEAF` - Leaf-shaped frames
- `EyeFrameShape.POINTED` - Pointed frames

## Memory Management

Remember to release the V8 runtime when done:

```kotlin
override fun onDestroy() {
    super.onDestroy()
    IntosoftQRCode.release()
}
```

## ProGuard Rules

If using ProGuard/R8, add these rules:

```proguard
-keep class com.intosoft.qrcode.** { *; }
-keep class com.eclipsesource.v8.** { *; }
```

## Requirements

- Android API 21+ (Android 5.0+)
- Kotlin 1.9+
- Gradle 8.0+

## Supported ABIs

J2V8 supports:
- armeabi-v7a
- arm64-v8a
- x86
- x86_64

## License

MIT License - see LICENSE file for details

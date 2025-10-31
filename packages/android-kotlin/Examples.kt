// Android Kotlin Example - How to use IntosoftQRCode in your app

package com.example.qrcode

import android.os.Bundle
import android.webkit.WebView
import android.widget.Button
import android.widget.EditText
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import com.intosoft.qrcode.*

// MARK: - Jetpack Compose Example

@Composable
fun QRCodeScreen() {
    var text by remember { mutableStateOf("https://custoqr.com") }
    var svgString by remember { mutableStateOf("") }
    var errorMessage by remember { mutableStateOf("") }
    val context = LocalContext.current
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "QR Code Generator",
            style = MaterialTheme.typography.headlineMedium
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        OutlinedTextField(
            value = text,
            onValueChange = { text = it },
            label = { Text("Enter text or URL") },
            modifier = Modifier.fillMaxWidth()
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Button(
            onClick = {
                try {
                    svgString = IntosoftQRCode.generateSVG(
                        context = context,
                        text = text,
                        width = 300,
                        height = 300
                    )
                    errorMessage = ""
                } catch (e: Exception) {
                    errorMessage = e.message ?: "Unknown error"
                    svgString = ""
                }
            }
        ) {
            Text("Generate QR Code")
        }
        
        if (errorMessage.isNotEmpty()) {
            Text(
                text = errorMessage,
                color = MaterialTheme.colorScheme.error
            )
        }
        
        if (svgString.isNotEmpty()) {
            Spacer(modifier = Modifier.height(16.dp))
            QRCodeWebView(
                svgString = svgString,
                modifier = Modifier.size(300.dp)
            )
        }
    }
}

// MARK: - Advanced Compose Example with Customization

@Composable
fun AdvancedQRCodeScreen() {
    val context = LocalContext.current
    var svgString by remember { mutableStateOf("") }
    
    LaunchedEffect(Unit) {
        // Create gradient
        val gradient = GradientConfig(
            type = "linear",
            colors = listOf("#667eea", "#764ba2"),
            rotation = 45.0
        )
        
        // Add logo
        val logo = LogoConfig(
            url = "https://custoqr.com/logo.png",
            size = 0.2,
            removeBackground = true
        )
        
        // Full configuration
        val config = QRCodeConfig(
            text = "https://custoqr.com",
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
        
        try {
            svgString = IntosoftQRCode.generateSVG(context, config)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "Custom QR Code",
            style = MaterialTheme.typography.headlineMedium
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        if (svgString.isNotEmpty()) {
            QRCodeWebView(
                svgString = svgString,
                modifier = Modifier.size(300.dp)
            )
        }
    }
}

// MARK: - WebView Composable

@Composable
fun QRCodeWebView(
    svgString: String,
    modifier: Modifier = Modifier
) {
    AndroidView(
        modifier = modifier,
        factory = { context ->
            WebView(context).apply {
                settings.javaScriptEnabled = false
                setBackgroundColor(android.graphics.Color.TRANSPARENT)
            }
        },
        update = { webView ->
            val html = """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            margin: 0;
                            padding: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                        }
                    </style>
                </head>
                <body>
                    $svgString
                </body>
                </html>
            """.trimIndent()
            
            webView.loadDataWithBaseURL(null, html, "text/html", "UTF-8", null)
        }
    )
}

// MARK: - Traditional XML Layout Example

class MainActivity : ComponentActivity() {
    private lateinit var webView: WebView
    private lateinit var editText: EditText
    private lateinit var generateButton: Button
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // For Compose UI
        setContent {
            MaterialTheme {
                QRCodeScreen()
            }
        }
        
        // Or use traditional XML layout
        // setContentView(R.layout.activity_main)
        // setupXmlLayout()
    }
    
    private fun setupXmlLayout() {
        editText = findViewById(R.id.editText)
        generateButton = findViewById(R.id.generateButton)
        webView = findViewById(R.id.webView)
        
        editText.setText("https://custoqr.com")
        
        generateButton.setOnClickListener {
            generateQRCode()
        }
        
        generateQRCode()
    }
    
    private fun generateQRCode() {
        val text = editText.text.toString()
        if (text.isEmpty()) return
        
        try {
            val svgString = IntosoftQRCode.generateSVG(
                context = this,
                text = text,
                width = 300,
                height = 300
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
        } catch (e: Exception) {
            // Show error dialog
            androidx.appcompat.app.AlertDialog.Builder(this)
                .setTitle("Error")
                .setMessage(e.message)
                .setPositiveButton("OK", null)
                .show()
        }
    }
    
    override fun onDestroy() {
        super.onDestroy()
        // Clean up V8 runtime
        IntosoftQRCode.release()
    }
}

// MARK: - XML Layout (activity_main.xml)

/*
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">
    
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="QR Code Generator"
        android:textSize="24sp"
        android:textStyle="bold"
        android:layout_gravity="center"
        android:layout_marginBottom="16dp"/>
    
    <EditText
        android:id="@+id/editText"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Enter text or URL"/>
    
    <Button
        android:id="@+id/generateButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Generate QR Code"
        android:layout_gravity="center"
        android:layout_marginTop="16dp"/>
    
    <WebView
        android:id="@+id/webView"
        android:layout_width="300dp"
        android:layout_height="300dp"
        android:layout_gravity="center"
        android:layout_marginTop="16dp"/>
    
</LinearLayout>
*/

// MARK: - How to integrate in your project

/*
 1. Add dependency in build.gradle:
    dependencies {
        implementation 'com.intosoft:qrcode-android:0.1.4'
    }
 
 2. Add repository (if using JitPack):
    repositories {
        maven { url 'https://jitpack.io' }
    }
 
 3. Import in your file:
    import com.intosoft.qrcode.*
 
 4. Use it:
    val svg = IntosoftQRCode.generateSVG(context, "Hello")
 
 5. Available shapes:
    - BodyShape.DOTS, BodyShape.CLASSY
    - EyeballShape.LEAF, EyeballShape.POINTED, EyeballShape.EXTRA_ROUNDED
    - EyeFrameShape.LEAF, EyeFrameShape.POINTED
 
 6. Remember to clean up:
    override fun onDestroy() {
        super.onDestroy()
        IntosoftQRCode.release()
    }
 
 7. ProGuard rules (if needed):
    -keep class com.intosoft.qrcode.** { *; }
    -keep class com.eclipsesource.v8.** { *; }
*/

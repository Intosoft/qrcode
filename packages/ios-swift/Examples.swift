// iOS Swift Example - How to use IntosoftQRCode in your app

import SwiftUI
import IntosoftQRCode
import WebKit

// MARK: - SwiftUI Example

struct ContentView: View {
    @State private var qrText = "https://custoqr.com"
    @State private var svgString = ""
    @State private var errorMessage = ""
    
    var body: some View {
        VStack(spacing: 20) {
            Text("QR Code Generator")
                .font(.title)
                .bold()
            
            TextField("Enter text or URL", text: $qrText)
                .textFieldStyle(.roundedBorder)
                .padding()
            
            Button("Generate QR Code") {
                generateQR()
            }
            .buttonStyle(.borderedProminent)
            
            if !errorMessage.isEmpty {
                Text(errorMessage)
                    .foregroundColor(.red)
            }
            
            if !svgString.isEmpty {
                QRCodeWebView(svgString: svgString)
                    .frame(width: 300, height: 300)
                    .border(Color.gray.opacity(0.3))
            }
            
            Spacer()
        }
        .padding()
    }
    
    private func generateQR() {
        do {
            // Simple generation
            svgString = try IntosoftQRCode.generateSVG(
                text: qrText,
                width: 300,
                height: 300
            )
            errorMessage = ""
        } catch {
            errorMessage = error.localizedDescription
            svgString = ""
        }
    }
}

// MARK: - Advanced Example with Customization

struct AdvancedQRView: View {
    @State private var svgString = ""
    
    var body: some View {
        VStack {
            Text("Custom QR Code")
                .font(.title)
            
            if !svgString.isEmpty {
                QRCodeWebView(svgString: svgString)
                    .frame(width: 300, height: 300)
            }
        }
        .onAppear {
            generateCustomQR()
        }
    }
    
    private func generateCustomQR() {
        // Create gradient
        let gradient = GradientConfig(
            type: "linear",
            colors: ["#667eea", "#764ba2"],
            rotation: 45
        )
        
        // Add logo
        let logo = LogoConfig(
            url: "https://custoqr.com/logo.png",
            size: 0.2,
            removeBackground: true
        )
        
        // Full configuration
        let config = QRCodeConfig(
            text: "https://custoqr.com",
            width: 300,
            height: 300,
            margin: 10,
            dotsColor: "#000000",
            backgroundColor: "#ffffff",
            bodyShape: .dots,
            eyeballShape: .leaf,
            eyeFrameShape: .pointed,
            gradient: gradient,
            logo: logo
        )
        
        do {
            svgString = try IntosoftQRCode.generateSVG(config: config)
        } catch {
            print("Error: \(error)")
        }
    }
}

// MARK: - WebView to display SVG

struct QRCodeWebView: UIViewRepresentable {
    let svgString: String
    
    func makeUIView(context: Context) -> WKWebView {
        let webView = WKWebView()
        webView.isOpaque = false
        webView.backgroundColor = .clear
        return webView
    }
    
    func updateUIView(_ webView: WKWebView, context: Context) {
        let html = """
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
            \(svgString)
        </body>
        </html>
        """
        webView.loadHTMLString(html, baseURL: nil)
    }
}

// MARK: - UIKit Example

class QRViewController: UIViewController {
    let webView = WKWebView()
    let textField = UITextField()
    let generateButton = UIButton(type: .system)
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        setupUI()
        generateInitialQR()
    }
    
    private func setupUI() {
        // TextField
        textField.placeholder = "Enter text or URL"
        textField.borderStyle = .roundedRect
        textField.text = "https://custoqr.com"
        textField.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(textField)
        
        // Button
        generateButton.setTitle("Generate QR Code", for: .normal)
        generateButton.addTarget(self, action: #selector(generateQR), for: .touchUpInside)
        generateButton.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(generateButton)
        
        // WebView
        webView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(webView)
        
        // Layout
        NSLayoutConstraint.activate([
            textField.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 20),
            textField.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            textField.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            
            generateButton.topAnchor.constraint(equalTo: textField.bottomAnchor, constant: 10),
            generateButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            webView.topAnchor.constraint(equalTo: generateButton.bottomAnchor, constant: 20),
            webView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            webView.widthAnchor.constraint(equalToConstant: 300),
            webView.heightAnchor.constraint(equalToConstant: 300)
        ])
    }
    
    @objc private func generateQR() {
        guard let text = textField.text, !text.isEmpty else { return }
        
        do {
            let svgString = try IntosoftQRCode.generateSVG(
                text: text,
                width: 300,
                height: 300
            )
            
            let html = """
            <!DOCTYPE html>
            <html>
            <body style="margin:0;display:flex;justify-content:center;align-items:center;height:100vh;">
                \(svgString)
            </body>
            </html>
            """
            
            webView.loadHTMLString(html, baseURL: nil)
        } catch {
            let alert = UIAlertController(
                title: "Error",
                message: error.localizedDescription,
                preferredStyle: .alert
            )
            alert.addAction(UIAlertAction(title: "OK", style: .default))
            present(alert, animated: true)
        }
    }
    
    private func generateInitialQR() {
        generateQR()
    }
}

// MARK: - How to integrate in your project

/*
 1. Add Swift Package:
    File → Add Package Dependencies
    URL: https://github.com/Intosoft/qrcode.git
 
 2. Import in your file:
    import IntosoftQRCode
 
 3. Use it:
    let svg = try IntosoftQRCode.generateSVG(text: "Hello")
 
 4. Available shapes:
    - BodyShape: .dots, .classy
    - EyeballShape: .leaf, .pointed, .extraRounded
    - EyeFrameShape: .leaf, .pointed
 
 5. Error handling:
    do {
        let svg = try IntosoftQRCode.generateSVG(text: "Hello")
    } catch QRCodeError.failedToLoadJSBundle {
        print("JS bundle not found")
    } catch {
        print("Error: \(error)")
    }
*/

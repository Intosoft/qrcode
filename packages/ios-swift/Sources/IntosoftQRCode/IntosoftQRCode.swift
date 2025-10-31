import Foundation
import JavaScriptCore

public enum BodyShape: String {
    case dots
    case classy
}

public enum EyeballShape: String {
    case leaf
    case pointed
    case extraRounded = "extra-rounded"
}

public enum EyeFrameShape: String {
    case leaf
    case pointed
}

public struct GradientConfig {
    public let type: String
    public let colors: [String]
    public let rotation: Double?
    
    public init(type: String, colors: [String], rotation: Double? = nil) {
        self.type = type
        self.colors = colors
        self.rotation = rotation
    }
}

public struct LogoConfig {
    public let url: String
    public let size: Double
    public let removeBackground: Bool
    
    public init(url: String, size: Double = 0.15, removeBackground: Bool = false) {
        self.url = url
        self.size = size
        self.removeBackground = removeBackground
    }
}

public struct QRCodeConfig {
    public var text: String
    public var width: Int
    public var height: Int
    public var margin: Int
    public var dotsColor: String
    public var backgroundColor: String
    public var bodyShape: BodyShape?
    public var eyeballShape: EyeballShape?
    public var eyeFrameShape: EyeFrameShape?
    public var gradient: GradientConfig?
    public var logo: LogoConfig?
    
    public init(
        text: String,
        width: Int = 200,
        height: Int = 200,
        margin: Int = 10,
        dotsColor: String = "#000000",
        backgroundColor: String = "#ffffff",
        bodyShape: BodyShape? = nil,
        eyeballShape: EyeballShape? = nil,
        eyeFrameShape: EyeFrameShape? = nil,
        gradient: GradientConfig? = nil,
        logo: LogoConfig? = nil
    ) {
        self.text = text
        self.width = width
        self.height = height
        self.margin = margin
        self.dotsColor = dotsColor
        self.backgroundColor = backgroundColor
        self.bodyShape = bodyShape
        self.eyeballShape = eyeballShape
        self.eyeFrameShape = eyeFrameShape
        self.gradient = gradient
        self.logo = logo
    }
}

public class IntosoftQRCode {
    private static var jsContext: JSContext?
    private static var isInitialized = false
    
    private static func initialize() throws {
        guard !isInitialized else { return }
        
        guard let jsPath = Bundle.module.url(forResource: "qrcode", withExtension: "js", subdirectory: "Resources"),
              let jsCode = try? String(contentsOf: jsPath) else {
            throw QRCodeError.failedToLoadJSBundle
        }
        
        jsContext = JSContext()
        jsContext?.exceptionHandler = { context, exception in
            print("JS Error: \(exception?.toString() ?? "unknown error")")
        }
        
        jsContext?.evaluateScript(jsCode)
        isInitialized = true
    }
    
    public static func generateSVG(config: QRCodeConfig) throws -> String {
        try initialize()
        
        guard let context = jsContext else {
            throw QRCodeError.jsContextNotInitialized
        }
        
        var configDict: [String: Any] = [
            "text": config.text,
            "width": config.width,
            "height": config.height,
            "margin": config.margin,
            "dotsColor": config.dotsColor,
            "bgColor": config.backgroundColor
        ]
        
        if let bodyShape = config.bodyShape {
            configDict["bodyShape"] = bodyShape.rawValue
        }
        
        if let eyeballShape = config.eyeballShape {
            configDict["eyeballShape"] = eyeballShape.rawValue
        }
        
        if let eyeFrameShape = config.eyeFrameShape {
            configDict["eyeFrameShape"] = eyeFrameShape.rawValue
        }
        
        if let gradient = config.gradient {
            var gradientDict: [String: Any] = [
                "type": gradient.type,
                "colors": gradient.colors
            ]
            if let rotation = gradient.rotation {
                gradientDict["rotation"] = rotation
            }
            configDict["gradient"] = gradientDict
        }
        
        if let logo = config.logo {
            configDict["logo"] = [
                "url": logo.url,
                "size": logo.size,
                "removeBackground": logo.removeBackground
            ]
        }
        
        guard let configData = try? JSONSerialization.data(withJSONObject: configDict),
              let configJSON = String(data: configData, encoding: .utf8) else {
            throw QRCodeError.invalidConfiguration
        }
        
        let script = """
        (function() {
            try {
                const config = \(configJSON);
                return window.qrcode.generateSVGString(config);
            } catch (error) {
                return JSON.stringify({ error: error.message });
            }
        })()
        """
        
        guard let result = context.evaluateScript(script),
              let svgString = result.toString(),
              !svgString.isEmpty else {
            throw QRCodeError.failedToGenerateSVG
        }
        
        if svgString.contains("\"error\"") {
            throw QRCodeError.jsError(svgString)
        }
        
        return svgString
    }
    
    public static func generateSVG(
        text: String,
        width: Int = 200,
        height: Int = 200,
        dotsColor: String = "#000000",
        backgroundColor: String = "#ffffff"
    ) throws -> String {
        let config = QRCodeConfig(
            text: text,
            width: width,
            height: height,
            dotsColor: dotsColor,
            backgroundColor: backgroundColor
        )
        return try generateSVG(config: config)
    }
}

public enum QRCodeError: Error {
    case failedToLoadJSBundle
    case jsContextNotInitialized
    case invalidConfiguration
    case failedToGenerateSVG
    case jsError(String)
}

extension QRCodeError: LocalizedError {
    public var errorDescription: String? {
        switch self {
        case .failedToLoadJSBundle:
            return "Failed to load QR code JavaScript bundle"
        case .jsContextNotInitialized:
            return "JavaScript context not initialized"
        case .invalidConfiguration:
            return "Invalid QR code configuration"
        case .failedToGenerateSVG:
            return "Failed to generate SVG string"
        case .jsError(let message):
            return "JavaScript error: \(message)"
        }
    }
}

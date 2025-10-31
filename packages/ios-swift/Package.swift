// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "IntosoftQRCode",
    platforms: [
        .iOS(.v13),
        .macOS(.v10_15)
    ],
    products: [
        .library(
            name: "IntosoftQRCode",
            targets: ["IntosoftQRCode"]
        ),
    ],
    targets: [
        .target(
            name: "IntosoftQRCode",
            dependencies: [],
            resources: [
                .copy("Resources/qrcode.js")
            ]
        ),
        .testTarget(
            name: "IntosoftQRCodeTests",
            dependencies: ["IntosoftQRCode"]
        ),
    ]
)

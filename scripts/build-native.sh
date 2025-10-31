#!/bin/bash

set -e

echo "🚀 Building native packages..."
echo ""

echo "📦 Step 1: Building JavaScript bundle..."
yarn build:web

echo ""
echo "📱 Step 2: Copying to iOS (Swift)..."
mkdir -p packages/ios-swift/Sources/IntosoftQRCode/Resources
cp dist/iife/index.js packages/ios-swift/Sources/IntosoftQRCode/Resources/qrcode.js
echo "✅ iOS bundle updated ($(wc -c < packages/ios-swift/Sources/IntosoftQRCode/Resources/qrcode.js) bytes)"

echo ""
echo "🤖 Step 3: Copying to Android (Kotlin)..."
mkdir -p packages/android-kotlin/src/main/assets
cp dist/iife/index.js packages/android-kotlin/src/main/assets/qrcode.js
echo "✅ Android bundle updated ($(wc -c < packages/android-kotlin/src/main/assets/qrcode.js) bytes)"

echo ""
echo "🎉 All native packages updated successfully!"
echo ""
echo "Next steps:"
echo "  - iOS: Open Package.swift in Xcode or use 'swift build'"
echo "  - Android: Use './gradlew build' in packages/android-kotlin/"

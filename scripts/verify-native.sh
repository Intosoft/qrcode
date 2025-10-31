#!/bin/bash

# Test script to verify native packages are correctly set up

echo "🔍 Testing Native Package Setup"
echo "================================"
echo ""

# Check if JS bundles exist
echo "1️⃣ Checking JavaScript bundles..."
if [ -f "dist/iife/index.js" ]; then
    SIZE=$(wc -c < dist/iife/index.js | tr -d ' ')
    echo "   ✅ Source bundle exists: ${SIZE} bytes"
else
    echo "   ❌ Source bundle missing! Run 'yarn build:web' first"
    exit 1
fi

# Check iOS package
echo ""
echo "2️⃣ Checking iOS Swift package..."
if [ -f "packages/ios-swift/Package.swift" ]; then
    echo "   ✅ Package.swift exists"
else
    echo "   ❌ Package.swift missing!"
fi

if [ -f "packages/ios-swift/Sources/IntosoftQRCode/IntosoftQRCode.swift" ]; then
    echo "   ✅ Swift source code exists"
else
    echo "   ❌ Swift source code missing!"
fi

if [ -f "packages/ios-swift/Sources/IntosoftQRCode/Resources/qrcode.js" ]; then
    SIZE=$(wc -c < packages/ios-swift/Sources/IntosoftQRCode/Resources/qrcode.js | tr -d ' ')
    echo "   ✅ Embedded JS bundle exists: ${SIZE} bytes"
else
    echo "   ❌ Embedded JS bundle missing!"
fi

# Check Android package
echo ""
echo "3️⃣ Checking Android Kotlin package..."
if [ -f "packages/android-kotlin/build.gradle" ]; then
    echo "   ✅ build.gradle exists"
else
    echo "   ❌ build.gradle missing!"
fi

if [ -f "packages/android-kotlin/src/main/java/com/intosoft/qrcode/IntosoftQRCode.kt" ]; then
    echo "   ✅ Kotlin source code exists"
else
    echo "   ❌ Kotlin source code missing!"
fi

if [ -f "packages/android-kotlin/src/main/assets/qrcode.js" ]; then
    SIZE=$(wc -c < packages/android-kotlin/src/main/assets/qrcode.js | tr -d ' ')
    echo "   ✅ Embedded JS bundle exists: ${SIZE} bytes"
else
    echo "   ❌ Embedded JS bundle missing!"
fi

# Verify bundles are identical
echo ""
echo "4️⃣ Verifying bundle integrity..."
SOURCE_HASH=$(shasum dist/iife/index.js | cut -d' ' -f1)
IOS_HASH=$(shasum packages/ios-swift/Sources/IntosoftQRCode/Resources/qrcode.js | cut -d' ' -f1)
ANDROID_HASH=$(shasum packages/android-kotlin/src/main/assets/qrcode.js | cut -d' ' -f1)

if [ "$IOS_HASH" = "$SOURCE_HASH" ]; then
    echo "   ✅ iOS bundle matches source"
else
    echo "   ⚠️  iOS bundle is outdated! Run './scripts/build-native.sh'"
fi

if [ "$ANDROID_HASH" = "$SOURCE_HASH" ]; then
    echo "   ✅ Android bundle matches source"
else
    echo "   ⚠️  Android bundle is outdated! Run './scripts/build-native.sh'"
fi

echo ""
echo "================================"
echo "✨ Setup verification complete!"
echo ""
echo "📖 Usage:"
echo "   iOS:     See packages/ios-swift/README.md"
echo "   Android: See packages/android-kotlin/README.md"
echo ""
echo "🔧 To update bundles:"
echo "   yarn build:native"

#!/bin/bash

# Automated release script for all platforms
# Usage: ./scripts/release.sh <version>
# Example: ./scripts/release.sh 0.1.5

set -e

VERSION=$1

if [ -z "$VERSION" ]; then
    echo "❌ Error: Version number required"
    echo "Usage: ./scripts/release.sh <version>"
    echo "Example: ./scripts/release.sh 0.1.5"
    exit 1
fi

echo "🚀 Starting release process for v${VERSION}"
echo "================================================"

# Step 1: Update version in package.json
echo ""
echo "📝 Step 1: Updating version in package.json..."
npm version $VERSION --no-git-tag-version
echo "✅ Version updated to $VERSION"

# Step 2: Build native packages
echo ""
echo "🔨 Step 2: Building native packages..."
yarn build:native
echo "✅ Native packages built"

# Step 3: Run tests
echo ""
echo "🧪 Step 3: Running tests..."
yarn tsc --noEmit
echo "✅ Tests passed"

# Step 4: Git operations
echo ""
echo "📦 Step 4: Creating git commit and tag..."
git add .
git commit -m "Release v${VERSION}" || echo "No changes to commit"
git tag "v${VERSION}"
echo "✅ Git commit and tag created"

# Step 5: Verify native packages
echo ""
echo "🔍 Step 5: Verifying native packages..."
./scripts/verify-native.sh

# Step 6: Show next steps
echo ""
echo "================================================"
echo "✨ Release v${VERSION} prepared successfully!"
echo ""
echo "📤 Next steps:"
echo ""
echo "1️⃣  Push to GitHub:"
echo "   git push origin main --tags"
echo ""
echo "2️⃣  Create GitHub Release:"
echo "   Go to: https://github.com/Intosoft/qrcode/releases/new"
echo "   - Tag: v${VERSION}"
echo "   - Title: v${VERSION}"
echo "   - Click 'Publish release'"
echo ""
echo "3️⃣  Publish to NPM (optional for web package):"
echo "   npm publish"
echo ""
echo "📦 What happens automatically:"
echo "   ✅ iOS: Available via Swift Package Manager immediately"
echo "   ✅ Android: JitPack builds automatically from the release"
echo "   ✅ NPM: After you run 'npm publish'"
echo ""
echo "🔗 Verification links:"
echo "   - GitHub: https://github.com/Intosoft/qrcode/releases"
echo "   - JitPack: https://jitpack.io/#Intosoft/qrcode"
echo "   - NPM: https://www.npmjs.com/package/@intosoft/qrcode"

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### ✨ Added - New Body Shapes (v0.2.0)

Four new artistic body shape patterns:

- **Mosaic** - Tile-like pattern with intelligent corner rounding based on neighbors
- **Fluid** - Organic flowing design with circles for isolated dots, adaptive rounding for connected cells
- **Edge-Cut** - Sharp angular aesthetic with modern edge treatment
- **Japanese** - Minimalist Japanese-inspired design with circles and shrunk rectangles

### 🖼️ Enhanced - Logo Integration (v0.2.0)

Advanced logo configuration options:

- **`padding`** - Add white space around logo (type: `number`, default: `0`)
- **`borderRadius`** - Rounded corners for logos using SVG clipPath (type: `number`, default: `0`)
- **`opacity`** - Transparency control 0-1 (type: `number`, default: `1`)
- **`excavate`** - Explicit control over QR dot removal (type: `boolean`, default: `true`)

### 📸 Enhanced - Image Format Support (v0.2.0)

- New function: `getImageMimeType()` for format detection
- Enhanced validation with warnings for unsupported formats
- Supported formats: PNG, JPEG, GIF, WebP, SVG, BMP, ICO

### 📚 Added - Documentation (v0.2.0)

- **`FEATURES.md`** - Comprehensive features guide with 17 body shapes, logo integration, best practices, and 5+ complete examples
- **`examples/design-showcase.html`** - Interactive showcase with 25+ live QR code examples demonstrating all features

### 🔧 Improved - Logo Rendering (v0.2.0)

Complete rewrite of `renderLogoFromConfig()`:
- Calculates total size including padding
- Creates background rectangle when padding > 0
- Generates SVG clipPath for border radius
- Applies opacity attribute
- Proper centering considering padding

### Added

-   Comprehensive input validation for config parameters
-   Better error handling with descriptive error messages
-   TypeScript types for config input with optional properties
-   Default configuration values system
-   Security policy documentation
-   Improved build configuration to exclude compiled files from linting
-   **iOS Swift Package** with JavaScriptCore integration (SPM support, zero dependencies)
-   **Android Kotlin Package** with J2V8 engine (JitPack publishing)

### Changed

-   Updated config interface to support partial input configurations
-   Improved type safety throughout the codebase
-   Enhanced documentation with better examples
-   Updated `.npmignore` to exclude native packages
-   Enhanced README with new features and design showcase link

### Fixed

-   ESLint configuration to exclude compiled files from linting
-   React Native TypeScript configuration for JSX support
-   Missing type definitions for React and React Native
-   Security vulnerabilities in dependencies

### Security

-   Added input validation to prevent potential injection attacks
-   Enhanced `validateURL()` with format detection
-   Updated vulnerable dependencies to secure versions
-   Implemented proper error handling to prevent information leakage

## [0.1.4] - Previous Release

### Added

-   Initial QR code generation functionality
-   Support for multiple frameworks (React, React Native, Vue, Angular, Vanilla JS)
-   Customizable shapes and colors
-   Logo integration support
-   Gradient support
-   Multiple export formats (CommonJS, ESM, IIFE)

### Features

-   Cross-platform compatibility
-   High-resolution output
-   Error correction levels
-   Extensive customization options

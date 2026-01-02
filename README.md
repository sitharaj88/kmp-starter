# KMP Starter 🚀

A production-ready **Kotlin Multiplatform Library Template** with 5-platform support, Maven Central publishing, and sample apps. Stop configuring, start building.

[![Kotlin](https://img.shields.io/badge/Kotlin-2.3.0-7F52FF?style=flat&logo=kotlin&logoColor=white)](https://kotlinlang.org)
[![Compose Multiplatform](https://img.shields.io/badge/Compose-1.9.3-4285F4?style=flat&logo=jetpack-compose&logoColor=white)](https://www.jetbrains.com/lp/compose-multiplatform/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

## 📱 Supported Platforms

| Platform | Status | Target |
|----------|--------|--------|
| Android | ✅ | `androidTarget` |
| iOS | ✅ | `iosArm64`, `iosX64`, `iosSimulatorArm64` |
| Desktop | ✅ | `jvm("desktop")` |
| Web (JS) | ✅ | `js(IR)` |
| Web (WASM) | ⚠️ Beta | `wasmJs` |

## 🛠 System Requirements

| Requirement | Version | Notes |
|------------|---------|-------|
| **JDK** | 17+ | Required for Gradle and Android |
| **Android Studio** | 2024.2.1+ | Ladybug or newer with KMP plugin |
| **Xcode** | 15.0+ | For iOS development |
| **Node.js** | 18+ | For JS/WASM targets |
| **Gradle** | 8.10+ | Included via wrapper |
| **macOS** | Required | For iOS builds |

## 🚀 Quick Start

### 1. Clone the Template

```bash
git clone https://github.com/sitharaj88/kmp-starter.git my-library
cd my-library
```

### 2. Customize with Setup Script

```bash
./setup.sh mylib com.example.mylib
```

This will:
- Rename packages from `com.example.library` to your package
- Update artifact names
- Configure Gradle properties

### 3. Or Manually Configure `gradle.properties`

```properties
GROUP=com.yourcompany.mylib
POM_ARTIFACT_ID=mylib
LIBRARY_NAME=MyLib
LIBRARY_PACKAGE=com.yourcompany.mylib
VERSION_NAME=1.0.0
```

## 📦 Build Commands

### Library

| Command | Description |
|---------|-------------|
| `./gradlew :library:build` | Build all library targets |
| `./gradlew :library:assemble` | Assemble all artifacts |
| `./gradlew :library:check` | Run all tests |
| `./gradlew :library:clean` | Clean build outputs |

### Platform-Specific Library Builds

```bash
# Android
./gradlew :library:compileAndroidMain

# Desktop (JVM)
./gradlew :library:compileKotlinDesktop

# iOS
./gradlew :library:compileKotlinIosArm64
./gradlew :library:compileKotlinIosX64
./gradlew :library:compileKotlinIosSimulatorArm64

# JavaScript
./gradlew :library:compileKotlinJs

# WASM
./gradlew :library:compileKotlinWasmJs
```

### iOS Framework

```bash
# Debug framework for simulator
./gradlew :sample:linkDebugFrameworkIosSimulatorArm64

# Release framework
./gradlew :sample:linkReleaseFrameworkIosArm64

# Embed for Xcode
./gradlew :sample:embedAndSignAppleFrameworkForXcode
```

## ▶️ Run Sample Apps

### Android

```bash
# Via Android Studio: Run 'androidApp' configuration
# Or via command line:
./gradlew :androidApp:installDebug
```

### Desktop

```bash
./gradlew :sample:run
```

### iOS

1. Open `iosApp/iosApp.xcodeproj` in Xcode
2. Select an iOS Simulator
3. Press `⌘+R` to run

Or build from command line:
```bash
cd iosApp
xcodebuild -project iosApp.xcodeproj -scheme iosApp -configuration Debug -sdk iphonesimulator build
```

### Web (JavaScript)

```bash
# Development server with hot reload
./gradlew :sample:jsBrowserDevelopmentRun

# Production build
./gradlew :sample:jsBrowserProductionWebpack
```

### Web (WASM)

```bash
# Development server
./gradlew :sample:wasmJsBrowserDevelopmentRun

# Production build
./gradlew :sample:wasmJsBrowserProductionWebpack
```

## 📤 Maven Central Publishing

### Prerequisites

1. **Sonatype Account**: Register at [central.sonatype.com](https://central.sonatype.com)
2. **GPG Key**: Generate signing keys (see [📖 GPG Setup Guide](GPG_SETUP.md) for detailed instructions)
3. **Configure `~/.gradle/gradle.properties`**:

```properties
signing.keyId=YOUR_KEY_ID
signing.password=YOUR_KEY_PASSWORD
signing.secretKeyRingFile=/path/to/.gnupg/secring.gpg

ossrhUsername=YOUR_SONATYPE_USERNAME
ossrhPassword=YOUR_SONATYPE_PASSWORD
```

### Publishing Commands

| Command | Description |
|---------|-------------|
| `./gradlew :library:publishToMavenLocal` | Publish to local Maven (~/.m2) |
| `./gradlew :library:publishAllPublicationsToLocalStagingRepository` | Stage locally for review |
| `./gradlew :library:zipBundle` | Create signed bundle ZIP |
| `./gradlew :library:zipBundleUnsigned` | Create unsigned bundle (testing) |

### Bundle Location

After running `zipBundle`:
```
library/build/bundle/library-bundle.zip
```

Upload this ZIP to [central.sonatype.com](https://central.sonatype.com) to publish.

## 📁 Project Structure

```
kmp-starter/
├── library/                  # Your KMP library module
│   └── src/
│       ├── commonMain/       # Shared code (expect declarations)
│       ├── androidMain/      # Android implementation
│       ├── iosMain/          # iOS implementation
│       ├── desktopMain/      # Desktop JVM implementation
│       ├── jsMain/           # JavaScript implementation
│       └── wasmJsMain/       # WASM implementation
├── sample/                   # Compose Multiplatform demo app
├── androidApp/               # Android app entry point
├── iosApp/                   # iOS Xcode project
├── docs-site/                # Documentation website source
├── docs/                     # Built docs for GitHub Pages
├── gradle.properties         # ← Customize your library here!
└── setup.sh                  # Quick setup script
```

## ⚙️ Configuration Files

### `gradle.properties` - Library Metadata

```properties
# Memory settings
org.gradle.jvmargs=-Xmx4g -Dfile.encoding=UTF-8
org.gradle.parallel=true
org.gradle.caching=true

# Compose experimental targets
org.jetbrains.compose.experimental.jscanvas.enabled=true
org.jetbrains.compose.experimental.wasm.enabled=true

# Library configuration
GROUP=com.example
POM_ARTIFACT_ID=library
LIBRARY_NAME=MyLibrary
LIBRARY_PACKAGE=com.example.library
VERSION_NAME=1.0.0
```

### `library/build.gradle.kts` - Key Sections

- **Android Target**: Uses new `androidKmpLibrary` plugin
- **iOS Targets**: Supports arm64, x64, and simulator
- **Publishing**: Maven Central with GPG signing
- **Compose**: Runtime, Foundation, UI dependencies

## 🧪 Testing

```bash
# Run all tests
./gradlew :library:check

# Platform-specific tests
./gradlew :library:desktopTest
./gradlew :library:jsTest
./gradlew :library:iosSimulatorArm64Test
```

## 📚 Documentation

### Local Development

```bash
cd docs-site
npm install
npm run dev
```

### Build for GitHub Pages

```bash
cd docs-site
npm run build
```

Output goes to `../docs/` - commit and push to enable GitHub Pages.

## 🔧 IDE Setup

### Android Studio / IntelliJ IDEA

1. Open the project root folder
2. Wait for Gradle sync
3. Install the Kotlin Multiplatform plugin
4. Run configurations will be auto-detected

### Xcode (iOS)

1. Open `iosApp/iosApp.xcodeproj`
2. Wait for Swift package resolution
3. Select target simulator/device
4. Build and run

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `./gradlew check`
5. Submit a pull request

## 📄 License

```
Copyright 2024 Sitharaj Seenivasan

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

## ☕ Support the Project

If this template saved you time, consider buying me a coffee!

<a href="https://buymeacoffee.com/sitharaj88" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50">
</a>

## 🔗 Links

- **Documentation**: [sitharaj88.github.io/kmp-starter](https://sitharaj88.github.io/kmp-starter)
- **GitHub**: [github.com/sitharaj88/kmp-starter](https://github.com/sitharaj88/kmp-starter)
- **Author**: [Sitharaj Seenivasan](https://github.com/sitharaj88)
- **Support**: [Buy Me a Coffee](https://buymeacoffee.com/sitharaj88)


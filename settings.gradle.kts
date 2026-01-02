pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
    }
}

// ============================================
// CUSTOMIZE: Change project name
// ============================================
rootProject.name = "mylibrary-kmp"

include(":library")
include(":sample")
include(":androidApp")

package com.example.library

/**
 * MyLibrary - A Kotlin Multiplatform Library
 *
 * This is the main entry point for the library.
 * Replace this with your actual implementation.
 *
 * ## Usage
 * ```kotlin
 * val result = MyLibrary.doSomething("input")
 * ```
 */
public expect object MyLibrary {
    /**
     * Example function - replace with your implementation
     *
     * @param input The input to process
     * @return The processed result
     */
    public fun doSomething(input: String): String
    
    /**
     * Get the current platform name
     *
     * @return Platform identifier
     */
    public fun getPlatformName(): String
}

/**
 * Platform capabilities - detect what's available at runtime
 */
public expect object MyLibraryCapabilities {
    /**
     * Whether feature X is available on this platform
     */
    public val isFeatureXAvailable: Boolean
}

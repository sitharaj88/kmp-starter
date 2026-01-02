package com.example.library

/**
 * iOS implementation
 */
public actual object MyLibrary {
    public actual fun doSomething(input: String): String {
        return "iOS: $input"
    }
    
    public actual fun getPlatformName(): String = "iOS"
}

public actual object MyLibraryCapabilities {
    public actual val isFeatureXAvailable: Boolean = true
}

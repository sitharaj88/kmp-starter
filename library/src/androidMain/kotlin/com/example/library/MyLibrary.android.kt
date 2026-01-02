package com.example.library

/**
 * Android implementation
 */
public actual object MyLibrary {
    public actual fun doSomething(input: String): String {
        return "Android: $input"
    }
    
    public actual fun getPlatformName(): String = "Android"
}

public actual object MyLibraryCapabilities {
    public actual val isFeatureXAvailable: Boolean = true
}

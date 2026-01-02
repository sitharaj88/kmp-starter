package com.example.library

/**
 * JS (Web) implementation
 */
public actual object MyLibrary {
    public actual fun doSomething(input: String): String {
        return "Web: $input"
    }
    
    public actual fun getPlatformName(): String = "Web (JS)"
}

public actual object MyLibraryCapabilities {
    public actual val isFeatureXAvailable: Boolean = false
}

package com.example.library

/**
 * Desktop (JVM) implementation
 */
public actual object MyLibrary {
    public actual fun doSomething(input: String): String {
        return "Desktop: $input"
    }
    
    public actual fun getPlatformName(): String = "Desktop"
}

public actual object MyLibraryCapabilities {
    public actual val isFeatureXAvailable: Boolean = true
}

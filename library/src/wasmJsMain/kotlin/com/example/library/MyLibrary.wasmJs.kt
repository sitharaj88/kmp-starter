package com.example.library

/**
 * WASM implementation
 */
public actual object MyLibrary {
    public actual fun doSomething(input: String): String {
        return "WASM: $input"
    }
    
    public actual fun getPlatformName(): String = "Web (WASM)"
}

public actual object MyLibraryCapabilities {
    public actual val isFeatureXAvailable: Boolean = false
}

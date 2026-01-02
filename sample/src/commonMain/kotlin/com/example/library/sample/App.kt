package com.example.library.sample

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.library.MyLibrary
import com.example.library.MyLibraryCapabilities

@Composable
fun App() {
    var result by remember { mutableStateOf("") }
    
    MaterialTheme(
        colorScheme = darkColorScheme(
            primary = Color(0xFF7C4DFF),
            surface = Color(0xFF1E1E1E),
            background = Color(0xFF121212)
        )
    ) {
        Scaffold(
            topBar = {
                @OptIn(ExperimentalMaterial3Api::class)
                TopAppBar(
                    title = { Text("MyLibrary Demo", fontWeight = FontWeight.Bold) },
                    colors = TopAppBarDefaults.topAppBarColors(
                        containerColor = Color(0xFF7C4DFF),
                        titleContentColor = Color.White
                    )
                )
            },
            containerColor = MaterialTheme.colorScheme.background
        ) { padding ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding)
                    .padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                // Platform Info
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFF2D2D2D))
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(
                            "Platform: ${MyLibrary.getPlatformName()}",
                            color = Color.White,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            "Feature X Available: ${MyLibraryCapabilities.isFeatureXAvailable}",
                            color = Color.Gray
                        )
                    }
                }
                
                // Test Button
                Button(
                    onClick = {
                        result = MyLibrary.doSomething("Hello, World!")
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF7C4DFF))
                ) {
                    Text("Test Library")
                }
                
                // Result Display
                if (result.isNotEmpty()) {
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        colors = CardDefaults.cardColors(containerColor = Color(0xFF3D3D3D))
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Text("Result:", color = Color.Gray)
                            Text(result, color = Color.White, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        }
    }
}

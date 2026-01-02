import { useState, useEffect } from 'react'
import { Github, Package, Smartphone, Monitor, Globe, BookOpen, Zap, Copy, Check, Menu, X, Terminal, Cpu, Download, Upload, TestTube, FolderTree, Sun, Moon, ChevronDown, ExternalLink } from 'lucide-react'

// Apple-style icon component
const AppleIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
)

function App() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeTab, setActiveTab] = useState<'android' | 'ios' | 'desktop' | 'web'>('android')
    const [isDark, setIsDark] = useState(true)
    const [activeSection, setActiveSection] = useState('')

    // Initialize theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark
        setIsDark(shouldBeDark)
        document.documentElement.classList.toggle('light', !shouldBeDark)
    }, [])

    // Toggle theme
    const toggleTheme = () => {
        const newIsDark = !isDark
        setIsDark(newIsDark)
        document.documentElement.classList.toggle('light', !newIsDark)
        localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
    }

    // Track active section for nav highlighting
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { threshold: 0.3 }
        )

        document.querySelectorAll('section[id]').forEach((section) => {
            observer.observe(section)
        })

        return () => observer.disconnect()
    }, [])

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text)
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2000)
    }

    const CodeBlock = ({ code, index, title }: { code: string; index: number; title?: string }) => (
        <div className="card overflow-hidden">
            {title && (
                <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg-tertiary)' }}>
                    <span className="font-medium text-sm" style={{ color: 'var(--text-secondary)' }}>{title}</span>
                    <button
                        onClick={() => copyToClipboard(code, index)}
                        className="flex items-center gap-2 transition text-sm hover:opacity-80"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        {copiedIndex === index ? (
                            <><Check className="w-4 h-4 text-green-500" /> Copied!</>
                        ) : (
                            <><Copy className="w-4 h-4" /> Copy</>
                        )}
                    </button>
                </div>
            )}
            <pre className="p-4 text-sm overflow-x-auto" style={{ background: 'var(--bg-secondary)' }}>
                <code style={{ color: 'var(--accent-light)' }}>{code}</code>
            </pre>
        </div>
    )

    const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
        <a
            href={href}
            className={`text-sm font-medium transition-colors ${activeSection === href.slice(1) ? 'text-[var(--accent)]' : 'hover:text-[var(--accent)]'
                }`}
            style={{ color: activeSection === href.slice(1) ? 'var(--accent)' : 'var(--text-secondary)' }}
        >
            {children}
        </a>
    )

    return (
        <div className="min-h-screen transition-colors" style={{ background: 'var(--bg-primary)' }}>
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <a href="#" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
                                <Package className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>KMP Starter</span>
                        </a>

                        <div className="hidden lg:flex items-center gap-6">
                            <NavLink href="#features">Features</NavLink>
                            <NavLink href="#requirements">Requirements</NavLink>
                            <NavLink href="#installation">Installation</NavLink>
                            <NavLink href="#build">Build</NavLink>
                            <NavLink href="#run">Run</NavLink>
                            <NavLink href="#publish">Publish</NavLink>
                            <NavLink href="#gpg">GPG</NavLink>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="theme-toggle"
                                aria-label="Toggle theme"
                            >
                                <div className="theme-toggle-knob">
                                    {isDark ? <Moon className="w-4 h-4 text-white" /> : <Sun className="w-4 h-4 text-white" />}
                                </div>
                            </button>

                            <a
                                href="https://github.com/sitharaj88/kmp-starter"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden sm:flex items-center gap-2 btn-secondary text-sm"
                            >
                                <Github className="w-4 h-4" />
                                GitHub
                            </a>

                            <button
                                className="lg:hidden p-2"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t animate-fade-in" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                        <div className="px-4 py-4 space-y-4">
                            {['Features', 'Requirements', 'Installation', 'Build', 'Run', 'Publish', 'GPG'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="block py-2 font-medium"
                                    style={{ color: 'var(--text-secondary)' }}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                            <a
                                href="https://github.com/sitharaj88/kmp-starter"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 py-2 font-medium"
                                style={{ color: 'var(--accent)' }}
                            >
                                <Github className="w-4 h-4" />
                                View on GitHub
                            </a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-28 pb-20 px-4 relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-in" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                        <Zap className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Kotlin Multiplatform Library Template</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                        Build KMP Libraries
                        <br />in Minutes
                    </h1>

                    <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-fade-in" style={{ color: 'var(--text-secondary)', animationDelay: '0.1s' }}>
                        Production-ready template with 5-platform support, Maven Central publishing, and sample apps.
                        Stop configuring. Start building.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <a
                            href="https://github.com/sitharaj88/kmp-starter"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg"
                        >
                            <Github className="w-5 h-5" />
                            Get Started
                            <ExternalLink className="w-4 h-4 opacity-50" />
                        </a>
                        <a
                            href="#installation"
                            className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg"
                        >
                            <BookOpen className="w-5 h-5" />
                            Documentation
                            <ChevronDown className="w-4 h-4 opacity-50" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Platform Icons */}
            <section className="py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <p className="text-center uppercase tracking-widest text-xs font-semibold mb-8" style={{ color: 'var(--text-muted)' }}>
                        Supported Platforms
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
                        {[
                            { icon: 'android', name: 'Android', status: '✅', color: 'from-green-400 to-emerald-500' },
                            { icon: 'apple', name: 'iOS', status: '✅', color: 'from-gray-400 to-gray-600' },
                            { icon: 'desktop', name: 'Desktop', status: '✅', color: 'from-blue-400 to-blue-600' },
                            { icon: 'web', name: 'Web JS', status: '✅', color: 'from-yellow-400 to-orange-500' },
                            { icon: 'wasm', name: 'WASM', status: '⚠️', color: 'from-purple-400 to-pink-500' },
                        ].map((platform, i) => (
                            <div key={i} className="card p-6 flex flex-col items-center gap-4 group cursor-default">
                                <div className={`w-16 h-16 bg-gradient-to-br ${platform.color} rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
                                    {platform.icon === 'android' && <Smartphone className="w-8 h-8 text-white" />}
                                    {platform.icon === 'apple' && <AppleIcon />}
                                    {platform.icon === 'desktop' && <Monitor className="w-8 h-8 text-white" />}
                                    {platform.icon === 'web' && <Globe className="w-8 h-8 text-white" />}
                                    {platform.icon === 'wasm' && <Globe className="w-8 h-8 text-white" />}
                                </div>
                                <div className="text-center">
                                    <span className="font-semibold block" style={{ color: 'var(--text-primary)' }}>{platform.name}</span>
                                    <span className="text-2xl">{platform.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* System Requirements */}
            <section id="requirements" className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 mb-4" style={{ color: 'var(--accent)' }}>
                            <Cpu className="w-5 h-5" />
                            <span className="text-sm font-semibold uppercase tracking-wider">System Requirements</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>What You Need</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: 'Required',
                                items: [
                                    { name: 'JDK', version: '17+', note: 'For Gradle and Android' },
                                    { name: 'Android Studio', version: '2024.2.1+', note: 'Ladybug or newer' },
                                    { name: 'Gradle', version: '8.10+', note: 'Included via wrapper' },
                                ]
                            },
                            {
                                title: 'Platform-Specific',
                                items: [
                                    { name: 'Xcode', version: '15.0+', note: 'For iOS builds' },
                                    { name: 'Node.js', version: '18+', note: 'For JS/WASM' },
                                    { name: 'macOS', version: 'Required', note: 'For iOS development' },
                                ]
                            }
                        ].map((section, idx) => (
                            <div key={idx} className="card p-6">
                                <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>{section.title}</h3>
                                <div className="space-y-3">
                                    {section.items.map((req, i) => (
                                        <div key={i} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                                            <div>
                                                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{req.name}</span>
                                                <span className="text-sm ml-2" style={{ color: 'var(--text-muted)' }}>{req.note}</span>
                                            </div>
                                            <span className="font-mono text-sm px-2 py-1 rounded" style={{ background: 'var(--bg-tertiary)', color: 'var(--accent)' }}>{req.version}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-20 px-4" style={{ background: 'var(--bg-secondary)' }}>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                            Everything You Need
                        </h2>
                        <p className="max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                            Complete template with all boilerplate handled. Focus on your library's features.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: '5-Platform Support', description: 'Android, iOS, Desktop JVM, Web JS, and WASM targets pre-configured.', icon: '🎯' },
                            { title: 'Maven Central Ready', description: 'GPG signing, javadocs, and bundle generation configured.', icon: '📦' },
                            { title: 'Sample Apps Included', description: 'Compose Multiplatform sample with all platform entry points.', icon: '📱' },
                            { title: 'Modern Gradle Setup', description: 'Version catalogs and Android KMP library plugin.', icon: '⚡' },
                            { title: 'Setup Script', description: 'One command to customize packages and names.', icon: '🚀' },
                            { title: 'Documentation Site', description: 'Vite + React + Tailwind for GitHub Pages.', icon: '📄' },
                        ].map((feature, i) => (
                            <div key={i} className="card p-6">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Installation */}
            <section id="installation" className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 mb-4" style={{ color: 'var(--accent)' }}>
                            <Download className="w-5 h-5" />
                            <span className="text-sm font-semibold uppercase tracking-wider">Installation</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>Get Started in Seconds</h2>
                    </div>

                    <div className="space-y-6">
                        <CodeBlock title="1. Clone the Template" code="git clone https://github.com/sitharaj88/kmp-starter.git my-library\ncd my-library" index={0} />
                        <CodeBlock title="2. Customize with Setup Script" code="./setup.sh mylib com.example.mylib" index={1} />
                        <CodeBlock title="3. Or Configure gradle.properties" code={`GROUP=com.yourcompany.mylib\nPOM_ARTIFACT_ID=mylib\nLIBRARY_NAME=MyLib\nVERSION_NAME=1.0.0`} index={2} />
                    </div>
                </div>
            </section>

            {/* Build Commands */}
            <section id="build" className="py-20 px-4" style={{ background: 'var(--bg-secondary)' }}>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 mb-4" style={{ color: 'var(--accent)' }}>
                            <Terminal className="w-5 h-5" />
                            <span className="text-sm font-semibold uppercase tracking-wider">Build Commands</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>Build Your Library</h2>
                    </div>

                    <div className="space-y-8">
                        <div className="card overflow-hidden">
                            <div className="px-4 py-3 font-bold" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>Library Commands</div>
                            <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                                {[
                                    { cmd: './gradlew :library:build', desc: 'Build all targets' },
                                    { cmd: './gradlew :library:assemble', desc: 'Assemble artifacts' },
                                    { cmd: './gradlew :library:check', desc: 'Run all tests' },
                                    { cmd: './gradlew :library:clean', desc: 'Clean outputs' },
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 gap-2">
                                        <code className="text-sm font-mono" style={{ color: 'var(--accent)' }}>{item.cmd}</code>
                                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <CodeBlock title="Platform-Specific Builds" code={`# Android\n./gradlew :library:compileAndroidMain\n\n# Desktop (JVM)\n./gradlew :library:compileKotlinDesktop\n\n# iOS\n./gradlew :library:compileKotlinIosArm64\n\n# JavaScript\n./gradlew :library:compileKotlinJs\n\n# WASM\n./gradlew :library:compileKotlinWasmJs`} index={10} />
                    </div>
                </div>
            </section>

            {/* Run Apps */}
            <section id="run" className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 mb-4" style={{ color: 'var(--accent)' }}>
                            <Zap className="w-5 h-5" />
                            <span className="text-sm font-semibold uppercase tracking-wider">Run Sample Apps</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>Run on Any Platform</h2>
                    </div>

                    {/* Platform Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {(['android', 'ios', 'desktop', 'web'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-xl font-semibold transition capitalize ${activeTab === tab ? 'btn-primary' : 'btn-secondary'
                                    }`}
                            >
                                {tab === 'ios' ? 'iOS' : tab}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        {activeTab === 'android' && (
                            <>
                                <CodeBlock title="Android - Via IDE" code="Run 'androidApp' configuration" index={20} />
                                <CodeBlock title="Android - Command Line" code="./gradlew :androidApp:installDebug" index={21} />
                            </>
                        )}
                        {activeTab === 'ios' && (
                            <>
                                <div className="card p-6">
                                    <h4 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Via Xcode</h4>
                                    <ol className="list-decimal list-inside space-y-2" style={{ color: 'var(--text-secondary)' }}>
                                        <li>Open <code style={{ color: 'var(--accent)' }}>iosApp/iosApp.xcodeproj</code></li>
                                        <li>Select an iOS Simulator</li>
                                        <li>Press <code style={{ color: 'var(--accent)' }}>⌘+R</code> to run</li>
                                    </ol>
                                </div>
                                <CodeBlock title="iOS - Command Line" code={`cd iosApp\nxcodebuild -scheme iosApp -sdk iphonesimulator build`} index={22} />
                            </>
                        )}
                        {activeTab === 'desktop' && (
                            <>
                                <CodeBlock title="Desktop - Run" code="./gradlew :sample:run" index={23} />
                                <CodeBlock title="Desktop - Create Distribution" code="./gradlew :sample:createDistributable" index={24} />
                            </>
                        )}
                        {activeTab === 'web' && (
                            <>
                                <CodeBlock title="JavaScript - Dev Server" code="./gradlew :sample:jsBrowserDevelopmentRun" index={25} />
                                <CodeBlock title="WASM - Dev Server" code="./gradlew :sample:wasmJsBrowserDevelopmentRun" index={27} />
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Publishing */}
            <section id="publish" className="py-20 px-4" style={{ background: 'var(--bg-secondary)' }}>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 mb-4" style={{ color: 'var(--accent)' }}>
                            <Upload className="w-5 h-5" />
                            <span className="text-sm font-semibold uppercase tracking-wider">Maven Central</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>Publish Your Library</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="card p-6">
                            <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Prerequisites</h3>
                            <ol className="list-decimal list-inside space-y-2" style={{ color: 'var(--text-secondary)' }}>
                                <li>Register at <a href="https://central.sonatype.com" target="_blank" className="underline" style={{ color: 'var(--accent)' }}>central.sonatype.com</a></li>
                                <li>Generate GPG signing keys</li>
                                <li>Configure <code style={{ color: 'var(--accent)' }}>~/.gradle/gradle.properties</code></li>
                            </ol>
                        </div>

                        <CodeBlock title="~/.gradle/gradle.properties" code={`signing.keyId=YOUR_KEY_ID\nsigning.password=YOUR_PASSWORD\nsigning.secretKeyRingFile=/path/to/secring.gpg`} index={30} />

                        <div className="card overflow-hidden">
                            <div className="px-4 py-3 font-bold" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>Publishing Commands</div>
                            <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                                {[
                                    { cmd: './gradlew :library:publishToMavenLocal', desc: 'Publish to ~/.m2' },
                                    { cmd: './gradlew :library:zipBundle', desc: 'Create signed bundle' },
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 gap-2">
                                        <code className="text-sm font-mono" style={{ color: 'var(--accent)' }}>{item.cmd}</code>
                                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* GPG Setup */}
            <section id="gpg" className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 mb-4" style={{ color: 'var(--accent)' }}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                            <span className="text-sm font-semibold uppercase tracking-wider">GPG Setup</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>Generate Signing Keys</h2>
                        <p className="mt-4 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                            GPG keys are required for signing your library before publishing to Maven Central.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* macOS */}
                        <div className="card p-6">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                <span className="text-2xl">🍎</span> macOS
                            </h3>
                            <div className="space-y-4">
                                <CodeBlock title="1. Install GPG" code="brew install gnupg" index={60} />
                                <CodeBlock title="2. Generate Key" code={`gpg --full-generate-key

# When prompted:
# Key type: (1) RSA and RSA
# Key size: 4096
# Expiration: 0 (never)`} index={61} />
                                <CodeBlock title="3. List & Export Keys" code={`# List keys (note the 8-char KEY_ID after rsa4096/)
gpg --list-keys --keyid-format SHORT

# Export secret keyring
gpg --export-secret-keys -o ~/.gnupg/secring.gpg

# Upload to keyserver
gpg --keyserver keyserver.ubuntu.com --send-keys YOUR_KEY_ID`} index={62} />
                            </div>
                        </div>

                        {/* Windows */}
                        <div className="card p-6">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                <span className="text-2xl">🪟</span> Windows
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                                    <p style={{ color: 'var(--text-secondary)' }}>
                                        1. Download and install <a href="https://www.gpg4win.org/" target="_blank" className="underline" style={{ color: 'var(--accent)' }}>Gpg4win</a>
                                    </p>
                                </div>
                                <CodeBlock title="2. Generate Key (PowerShell)" code={`gpg --full-generate-key

# Follow prompts (same as macOS)`} index={63} />
                                <CodeBlock title="3. Export Keys" code={`gpg --list-keys --keyid-format SHORT
gpg --export-secret-keys -o C:\\Users\\YourName\\.gnupg\\secring.gpg
gpg --keyserver keyserver.ubuntu.com --send-keys YOUR_KEY_ID`} index={64} />
                            </div>
                        </div>

                        {/* Linux */}
                        <div className="card p-6">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                <span className="text-2xl">🐧</span> Linux
                            </h3>
                            <div className="space-y-4">
                                <CodeBlock title="1. Install GPG" code={`# Ubuntu/Debian
sudo apt-get install gnupg

# Fedora
sudo dnf install gnupg2`} index={65} />
                                <CodeBlock title="2. Generate & Export" code={`gpg --full-generate-key
gpg --list-keys --keyid-format SHORT
gpg --export-secret-keys -o ~/.gnupg/secring.gpg
chmod 600 ~/.gnupg/secring.gpg
gpg --keyserver keyserver.ubuntu.com --send-keys YOUR_KEY_ID`} index={66} />
                            </div>
                        </div>

                        {/* Gradle Config */}
                        <div className="card p-6" style={{ borderColor: 'var(--accent)', borderWidth: '2px' }}>
                            <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--accent)' }}>
                                ⚙️ Configure Gradle (All Platforms)
                            </h3>
                            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                                Add to <code style={{ color: 'var(--accent)' }}>~/.gradle/gradle.properties</code>:
                            </p>
                            <CodeBlock title="~/.gradle/gradle.properties" code={`# GPG Signing
signing.keyId=YOUR_8_CHAR_KEY_ID
signing.password=your-gpg-passphrase
signing.secretKeyRingFile=/Users/you/.gnupg/secring.gpg

# Sonatype Credentials
ossrhUsername=your-sonatype-username
ossrhPassword=your-sonatype-password`} index={67} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Structure */}
            <section className="py-20 px-4" style={{ background: 'var(--bg-secondary)' }}>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 mb-4" style={{ color: 'var(--accent)' }}>
                            <FolderTree className="w-5 h-5" />
                            <span className="text-sm font-semibold uppercase tracking-wider">Project Structure</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>How It's Organized</h2>
                    </div>

                    <CodeBlock title="Directory Structure" code={`kmp-starter/
├── library/          # KMP library module
│   └── src/
│       ├── commonMain/   # Shared code
│       ├── androidMain/  # Android
│       ├── iosMain/      # iOS
│       ├── desktopMain/  # Desktop
│       ├── jsMain/       # JavaScript
│       └── wasmJsMain/   # WASM
├── sample/           # Demo app
├── androidApp/       # Android entry
├── iosApp/           # Xcode project
├── docs-site/        # This website
└── gradle.properties # ← Configure here!`} index={40} />
                </div>
            </section>

            {/* Testing */}
            <section className="py-20 px-4" style={{ background: 'var(--bg-secondary)' }}>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 mb-4" style={{ color: 'var(--accent)' }}>
                            <TestTube className="w-5 h-5" />
                            <span className="text-sm font-semibold uppercase tracking-wider">Testing</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>Run Tests</h2>
                    </div>

                    <CodeBlock title="Testing Commands" code={`# All tests\n./gradlew :library:check\n\n# Platform-specific\n./gradlew :library:desktopTest\n./gradlew :library:jsTest\n./gradlew :library:iosSimulatorArm64Test`} index={50} />
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                        Ready to Build Your KMP Library?
                    </h2>
                    <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        Stop spending hours on configuration. Use this template and start shipping today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://github.com/sitharaj88/kmp-starter"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex items-center justify-center gap-3 px-10 py-5 text-lg"
                        >
                            <Github className="w-6 h-6" />
                            Get the Template
                            <ExternalLink className="w-5 h-5 opacity-50" />
                        </a>
                        <a
                            href="https://buymeacoffee.com/sitharaj88"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-semibold rounded-xl transition transform hover:scale-105"
                            style={{ background: '#FFDD00', color: '#000000' }}
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.159 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364z" />
                            </svg>
                            Buy Me a Coffee
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 px-4 border-t" style={{ borderColor: 'var(--border)' }}>
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Package className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>KMP Starter</span>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        Built with ❤️ by <a href="https://github.com/sitharaj88" className="underline hover:no-underline" style={{ color: 'var(--accent)' }}>Sitharaj</a>
                    </p>
                    <a
                        href="https://github.com/sitharaj88/kmp-starter"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:opacity-80"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        <Github className="w-6 h-6" />
                    </a>
                </div>
            </footer>
        </div>
    )
}

export default App

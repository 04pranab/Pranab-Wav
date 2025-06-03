import { useState, useEffect } from "react";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <PortfolioApp />
      <Toaster position="top-right" theme="dark" />
    </div>
  );
}

function PortfolioApp() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'certificates', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navigation isScrolled={isScrolled} activeSection={activeSection} />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificatesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

function Navigation({ isScrolled, activeSection }: { isScrolled: boolean; activeSection: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🎮' },
    { id: 'certificates', label: 'Certificates', icon: '🏆' },
    { id: 'contact', label: 'Contact', icon: '📡' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-xl shadow-2xl border-b-2 border-purple-500/30' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm md:text-lg">OM</span>
              </div>
              <div className="hidden md:block">
                <div className="text-xs text-purple-400 font-mono">LEVEL 99</div>
                <div className="text-xs text-gray-400 font-mono">DEVELOPER</div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative group border-2 rounded-lg ${
                    activeSection === item.id
                      ? 'text-purple-400 border-purple-500 bg-purple-500/10'
                      : 'text-gray-300 border-gray-600 hover:text-purple-400 hover:border-purple-500/50'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-300 hover:text-purple-400 hover:bg-gray-800/50 transition-all duration-200"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center px-3 py-2 text-base font-medium text-gray-300 hover:text-purple-400 hover:bg-gray-800/50 w-full text-left rounded-md transition-all duration-200"
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [health, setHealth] = useState(100);
  const [mana, setMana] = useState(85);
  const [exp, setExp] = useState(8400);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 md:pt-20">
      {/* Game UI Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>

        {/* Animated Orbs */}
        <div className="absolute -top-40 -right-40 w-60 h-60 md:w-80 md:h-80 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 md:w-80 md:h-80 bg-pink-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 md:w-80 md:h-80 bg-red-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Game UI HUD */}
      <div className="absolute top-16 md:top-20 left-2 right-2 md:left-4 md:right-4 z-20">
        <div className="flex justify-between items-start">
          {/* Player Stats */}
          <div className="bg-black/80 border-2 border-purple-500/50 rounded-lg p-2 md:p-4 backdrop-blur-sm">
            <div className="text-purple-400 text-xs md:text-sm font-mono mb-1 md:mb-2">PLAYER STATUS</div>
            <div className="space-y-1 md:space-y-2">
              <div className="flex items-center space-x-1 md:space-x-2">
                <span className="text-red-400 text-xs">HP</span>
                <div className="w-12 md:w-20 h-1.5 md:h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full" style={{ width: `${health}%` }}></div>
                </div>
                <span className="text-white text-xs font-mono">{health}/100</span>
              </div>
              <div className="flex items-center space-x-1 md:space-x-2">
                <span className="text-blue-400 text-xs">MP</span>
                <div className="w-12 md:w-20 h-1.5 md:h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{ width: `${mana}%` }}></div>
                </div>
                <span className="text-white text-xs font-mono">{mana}/100</span>
              </div>
              <div className="flex items-center space-x-1 md:space-x-2">
                <span className="text-yellow-400 text-xs">EXP</span>
                <div className="w-12 md:w-20 h-1.5 md:h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full" style={{ width: `${(exp % 1000) / 10}%` }}></div>
                </div>
                <span className="text-white text-xs font-mono">{exp}/10000</span>
              </div>
            </div>
          </div>

          {/* System Time */}
          <div className="bg-black/80 border-2 border-purple-500/50 rounded-lg p-2 md:p-4 backdrop-blur-sm">
            <div className="text-purple-400 text-xs md:text-sm font-mono mb-1 md:mb-2">SYSTEM TIME</div>
            <div className="text-white font-mono text-sm md:text-lg">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-gray-400 font-mono text-xs md:text-sm">
              {currentTime.toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Character Name Plate */}
            <div className="bg-black/80 border-2 border-purple-500 rounded-lg p-4 md:p-6 mb-6 md:mb-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className="text-purple-400 text-xs md:text-sm font-mono">CHARACTER INFO</div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse animation-delay-2000"></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse animation-delay-4000"></div>
                </div>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4">
                <span className="block text-white drop-shadow-2xl font-mono">Om Pranab</span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent font-mono">
                  Mohanty
                </span>
              </h1>
              
              <div className="space-y-1 text-xs md:text-sm font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-purple-400">CLASS:</span>
                  <span className="text-white">Creative Developer</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400">LEVEL:</span>
                  <span className="text-white">99</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400">GUILD:</span>
                  <span className="text-white">Code Architects</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400">STATUS:</span>
                  <span className="text-green-400">ONLINE</span>
                </div>
              </div>
            </div>

            <p className="text-sm md:text-lg text-gray-400 mb-6 md:mb-10 max-w-2xl leading-relaxed font-mono">
              {"> Initializing creative protocols..."}<br/>
              {"> Loading innovation modules..."}<br/>
              {"> Ready to craft digital experiences"}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 relative overflow-hidden group border-2 border-purple-500"
              >
                <span className="relative z-10 font-mono text-sm md:text-base">🎮 START QUEST</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 md:px-8 py-3 md:py-4 border-2 border-purple-500 text-purple-400 rounded-lg font-semibold hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-300 backdrop-blur-sm font-mono text-sm md:text-base"
              >
                📡 SEND MESSAGE
              </button>
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2">
            {/* Cool 3D Terminal Avatar */}
            <div className="w-60 h-60 md:w-80 md:h-80 mx-auto relative">
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center justify-center text-white shadow-2xl relative overflow-hidden border-4 border-purple-500 p-4 md:p-6">
                {/* Terminal Header */}
                <div className="absolute top-0 left-0 right-0 bg-gray-800 h-8 md:h-10 flex items-center px-3 md:px-4 border-b border-purple-500/50">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-3 md:ml-4 text-xs md:text-sm text-gray-400 font-mono">terminal.exe</div>
                </div>
                
                {/* Terminal Content */}
                <div className="mt-8 md:mt-10 text-center space-y-2 md:space-y-3 font-mono">
                  <div className="text-green-400 text-xs md:text-sm animate-pulse">$ whoami</div>
                  <div className="text-white text-lg md:text-2xl font-bold">Om Pranab Mohanty</div>
                  <div className="text-purple-400 text-xs md:text-sm">Developer | Designer | Creator</div>
                  <div className="text-green-400 text-xs md:text-sm animate-pulse">$ status</div>
                  <div className="text-yellow-400 text-xs md:text-sm">ONLINE & CODING...</div>
                  <div className="text-green-400 text-xs md:text-sm">_</div>
                </div>
                
                {/* Matrix Rain Effect */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-green-400 text-xs font-mono animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    >
                      {Math.random() > 0.5 ? '1' : '0'}
                    </div>
                  ))}
                </div>
                
                {/* Level Badge */}
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded-full border-2 border-yellow-400">
                  LV.99
                </div>
                
                {/* Status Indicators */}
                <div className="absolute -bottom-2 -left-2 flex space-x-1">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-green-400 animate-pulse" title="Online"></div>
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full border-2 border-blue-400 animate-pulse" title="Coding"></div>
                </div>
              </div>
              
              {/* Floating UI Elements */}
              <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-black/80 border border-yellow-500 rounded px-2 py-1 text-yellow-400 text-xs font-mono animate-bounce">
                +100 XP
              </div>
              <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 bg-black/80 border border-green-500 rounded px-2 py-1 text-green-400 text-xs font-mono animate-pulse">
                ACTIVE
              </div>
              <div className="absolute top-1/2 -right-6 md:-right-8 bg-black/80 border border-purple-500 rounded px-2 py-1 text-purple-400 text-xs font-mono animate-ping">
                SKILL UP!
              </div>
              
              {/* Orbiting Elements */}
              <div className="absolute inset-0 rounded-lg border-2 border-purple-400/30 animate-spin" style={{ animationDuration: '10s' }}></div>
              <div className="absolute inset-2 md:inset-4 rounded-lg border border-pink-400/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Notification */}
      <div className="absolute bottom-16 md:bottom-20 right-2 md:right-4 bg-black/90 border-2 border-yellow-500 rounded-lg p-3 md:p-4 backdrop-blur-sm animate-bounce">
        <div className="text-yellow-400 text-xs md:text-sm font-mono mb-1">🏆 ACHIEVEMENT UNLOCKED!</div>
        <div className="text-white text-xs font-mono">Portfolio Access Granted</div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-20 bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">📊 CHARACTER PROFILE</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-2">
            <div className="bg-black/60 border-2 border-purple-500/50 rounded-lg p-6 md:p-8 backdrop-blur-sm">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg md:text-xl text-purple-400 mb-4 md:mb-6 font-light font-mono">
                  {"> Hello! I'm Om Pranab Mohanty, a passionate developer and designer"} 
                  currently pursuing my Bachelor's in Mathematics & Computing.
                </p>
                <p className="text-gray-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  With a strong foundation in both theoretical mathematics and practical 
                  programming, I love creating solutions that are both elegant and efficient. 
                  My journey in tech has been driven by curiosity and a desire to build 
                  meaningful digital experiences that push boundaries.
                </p>
                
                <div className="space-y-4 md:space-y-6">
                  <div className="bg-gray-800/50 p-4 md:p-6 rounded-xl border border-purple-500/30 backdrop-blur-sm">
                    <h3 className="text-lg md:text-xl font-semibold text-purple-400 mb-3 md:mb-4 font-mono">🎓 EDUCATION TREE</h3>
                    
                    <div className="space-y-3 md:space-y-4">
                      <div className="border-l-4 border-purple-500 pl-3 md:pl-4">
                        <h4 className="font-semibold text-gray-200 font-mono text-sm md:text-base">Bachelor of Science - Mathematics & Computing</h4>
                        <p className="text-purple-400 font-semibold text-sm md:text-base">GPA: 8.4/10</p>
                        <p className="text-gray-400 text-xs md:text-sm">Current Level</p>
                      </div>
                      
                      <div className="border-l-4 border-pink-500 pl-3 md:pl-4">
                        <h4 className="font-semibold text-gray-200 font-mono text-sm md:text-base">Sri Sathya Sai Higher Secondary School, Prasanthi Nilayam</h4>
                        <p className="text-pink-400 font-semibold text-sm md:text-base">CBSE – Class 12, 2024</p>
                        <p className="text-gray-400 text-xs md:text-sm">Major Subjects: Physics, Chemistry, Mathematics, English, Computer Science</p>
                        <p className="text-green-400 font-semibold text-sm md:text-base">Academic Performance: 85%</p>
                      </div>
                      
                      <div className="border-l-4 border-green-500 pl-3 md:pl-4">
                        <h4 className="font-semibold text-gray-200 font-mono text-sm md:text-base">Ghanashyam Hemala Vidya Mandir, Puri, Odisha</h4>
                        <p className="text-green-400 font-semibold text-sm md:text-base">CBSE - Class 10, 2020</p>
                        <p className="text-green-400 font-semibold text-sm md:text-base">Academic Performance: 94%</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 p-4 md:p-6 rounded-xl border border-purple-500/30 backdrop-blur-sm">
                    <h3 className="text-lg md:text-xl font-semibold text-purple-400 mb-3 md:mb-4 font-mono">🎯 INTERESTS & HOBBIES</h3>
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl md:text-2xl">✈️</span>
                        <span className="text-gray-300 text-sm md:text-base">Traveling</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl md:text-2xl">📚</span>
                        <span className="text-gray-300 text-sm md:text-base">Books</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl md:text-2xl">💻</span>
                        <span className="text-gray-300 text-sm md:text-base">Coding</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl md:text-2xl">✍️</span>
                        <span className="text-gray-300 text-sm md:text-base">Creative Writing</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 p-4 md:p-6 rounded-xl border border-purple-500/30 backdrop-blur-sm">
                    <h3 className="text-lg md:text-xl font-semibold text-purple-400 mb-3 md:mb-4 font-mono">🏆 ACHIEVEMENTS & ACTIVITIES</h3>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-start space-x-2 md:space-x-3">
                        <span className="text-yellow-500 text-base md:text-lg">🎤</span>
                        <div>
                          <p className="text-gray-300 font-semibold text-sm md:text-base">[2025] Coordinator - Awaaz Club @SSSIHL</p>
                          <p className="text-gray-400 text-xs md:text-sm">Public Speaking coordinator, managing morning foyer sessions</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 md:space-x-3">
                        <span className="text-blue-500 text-base md:text-lg">📖</span>
                        <div>
                          <p className="text-gray-300 font-semibold text-sm md:text-base">[2024] Technical Lead - Vachanamrutam Club @SSSIHL</p>
                          <p className="text-gray-400 text-xs md:text-sm">Literature analysis and presentations for 600+ audience</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 md:space-x-3">
                        <span className="text-purple-500 text-base md:text-lg">🎭</span>
                        <div>
                          <p className="text-gray-300 font-semibold text-sm md:text-base">[2024] Costume Department Lead</p>
                          <p className="text-gray-400 text-xs md:text-sm">Design and coordination for international performances</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <StatCard number="8.4" label="GPA" icon="📊" />
            <StatCard number="10+" label="Projects" icon="🎮" />
            <StatCard number="10+" label="Certificates" icon="🏆" />
            <StatCard number="3+" label="Leadership Roles" icon="👑" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ number, label, icon }: { number: string; label: string; icon: string }) {
  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-4 md:p-6 rounded-xl text-center hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 border-2 border-purple-500/30 backdrop-blur-sm group">
      <div className="text-2xl md:text-3xl mb-2">{icon}</div>
      <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300 font-mono">{number}</div>
      <div className="text-gray-400 font-medium font-mono text-sm md:text-base">{label}</div>
    </div>
  );
}

function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: "🎨",
      skills: [
        { name: "Web Design", level: 90 },
        { name: "CSS", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "React", level: 85 },
      ]
    },
    {
      title: "Backend",
      icon: "⚙️",
      skills: [
        { name: "Python", level: 85 },
        { name: "C/C++", level: 80 },
        { name: "SQL", level: 75 },
        { name: "Node.js", level: 70 },
      ]
    },
    {
      title: "Database",
      icon: "🗄️",
      skills: [
        { name: "DBMS", level: 80 },
        { name: "MySQL", level: 75 },
        { name: "MongoDB", level: 70 },
        { name: "PostgreSQL", level: 65 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-12 md:py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">⚡ SKILL TREE</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, index) => (
            <SkillCategory key={index} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCategory({ category }: { category: any }) {
  return (
    <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6 md:p-8 rounded-xl shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 border-2 border-purple-500/30 backdrop-blur-sm group">
      <div className="flex items-center justify-center mb-4 md:mb-6">
        <div className="text-3xl md:text-4xl mr-3">{category.icon}</div>
        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300 font-mono">{category.title}</h3>
      </div>
      <div className="space-y-3 md:space-y-4">
        {category.skills.map((skill: any, index: number) => (
          <div key={index}>
            <div className="flex justify-between mb-1 md:mb-2">
              <span className="text-gray-300 font-medium font-mono text-sm md:text-base">{skill.name}</span>
              <span className="text-purple-400 font-semibold font-mono text-sm md:text-base">{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2 md:h-3 overflow-hidden border border-gray-600">
              <div 
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-2 md:h-3 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-purple-500/30 relative"
                style={{ width: `${skill.level}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsSection() {
  const projects = [
    {
      title: "2048 Game",
      description: "A classic 2048 puzzle game implementation with smooth animations and responsive design.",
      tech: ["JavaScript", "CSS", "HTML"],
      link: "https://github.com/04pranab/2048",
      image: "🎮",
      gradient: "from-purple-600 to-blue-600",
      status: "COMPLETED"
    },
    {
      title: "DSA in C",
      description: "Comprehensive implementation of data structures and algorithms in C programming language.",
      tech: ["C", "Algorithms", "Data Structures"],
      link: "https://github.com/04pranab/DSA-in-C",
      image: "📊",
      gradient: "from-pink-600 to-red-600",
      status: "ACTIVE"
    },
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with React and modern web technologies.",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      link: "https://github.com/04pranab",
      image: "💼",
      gradient: "from-green-600 to-teal-600",
      status: "LIVE"
    },
    {
      title: "Math Calculator",
      description: "Advanced mathematical calculator with support for complex operations and functions.",
      tech: ["Python", "Mathematics", "GUI"],
      link: "https://github.com/04pranab",
      image: "🧮",
      gradient: "from-yellow-600 to-orange-600",
      status: "BETA"
    }
  ];

  return (
    <section id="projects" className="py-12 md:py-20 bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">🎮 PROJECT GALLERY</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'text-green-400 border-green-400';
      case 'ACTIVE': return 'text-blue-400 border-blue-400';
      case 'LIVE': return 'text-purple-400 border-purple-400';
      case 'BETA': return 'text-yellow-400 border-yellow-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-xl shadow-2xl overflow-hidden hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-2 border-2 border-purple-500/30 backdrop-blur-sm group">
      <div className={`h-32 md:h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center text-4xl md:text-6xl relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
        <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">{project.image}</span>
        
        {/* Status Badge */}
        <div className={`absolute top-2 md:top-4 right-2 md:right-4 px-2 md:px-3 py-1 rounded-full text-xs font-mono border ${getStatusColor(project.status)} bg-black/80`}>
          {project.status}
        </div>
      </div>
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-purple-400 transition-colors duration-300 font-mono">{project.title}</h3>
        <p className="text-gray-300 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">{project.description}</p>
        <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
          {project.tech.map((tech: string, index: number) => (
            <span key={index} className="px-2 md:px-3 py-1 bg-gray-700/50 text-purple-300 text-xs md:text-sm rounded-full border border-purple-500/30 font-mono">
              {tech}
            </span>
          ))}
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-purple-400 hover:text-pink-400 font-semibold transition-colors duration-300 group/link font-mono text-sm md:text-base"
        >
          🚀 LAUNCH PROJECT
          <svg className="w-3 h-3 md:w-4 md:h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function CertificatesSection() {
  const certificates = [
    { title: "Problem Solving", description: "Intermediate Level", year: "2024", icon: "🧩" },
    { title: "Problem Solving", description: "Basic Level", year: "2024", icon: "🔧" },
    { title: "Python", description: "Basic Programming", year: "2023", icon: "🐍" },
    { title: "SQL", description: "Basic & Intermediate", year: "2023", icon: "🗄️" },
    { title: "CSS", description: "Basic Styling", year: "2023", icon: "🎨" },
    { title: "AI Fundamentals", description: "Core Concepts", year: "2023", icon: "🤖" },
    { title: "Graphic Design", description: "Essentials", year: "2023", icon: "🎭" },
    { title: "Teacher Essentials", description: "Education Skills", year: "2023", icon: "👨‍🏫" },
    { title: "Canva Essentials", description: "Design Tools", year: "2023", icon: "🖌️" },
  ];

  return (
    <section id="certificates" className="py-12 md:py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">🏆 ACHIEVEMENT VAULT</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {certificates.map((cert, index) => (
            <CertificateCard key={index} certificate={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificateCard({ certificate }: { certificate: any }) {
  return (
    <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-4 md:p-6 rounded-xl shadow-2xl text-center hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-1 border-2 border-purple-500/30 hover:border-purple-500/50 backdrop-blur-sm group">
      <div className="text-3xl md:text-4xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">{certificate.icon}</div>
      <h3 className="text-base md:text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300 font-mono">{certificate.title}</h3>
      <p className="text-gray-300 mb-2 md:mb-3 text-sm md:text-base">{certificate.description}</p>
      <span className="inline-block px-2 md:px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 text-xs md:text-sm font-semibold rounded-full border border-purple-500/30 font-mono">
        {certificate.year}
      </span>
    </div>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-12 md:py-20 bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">📡 COMMUNICATION TERMINAL</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div>
            <div className="bg-black/60 border-2 border-purple-500/50 rounded-lg p-6 md:p-8 backdrop-blur-sm">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 font-mono">📞 CONTACT PROTOCOLS</h3>
              <p className="text-gray-300 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                Ready to establish connection! Send a transmission and let's collaborate 
                on creating something extraordinary in the digital realm.
              </p>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center space-x-3 md:space-x-4 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-lg md:text-xl">📧</span>
                  </div>
                  <span className="text-gray-300 group-hover:text-purple-400 transition-colors duration-300 font-mono text-sm md:text-base">ompranabmohanty@gmail.com</span>
                </div>

                <div className="flex flex-wrap gap-2 md:gap-4 mt-6 md:mt-8">
                  <SocialLink href="https://instagram.com/04pranab" icon="📷" label="Instagram" />
                  <SocialLink href="https://linkedin.com/in/om-pranab-mohanty" icon="💼" label="LinkedIn" />
                  <SocialLink href="https://github.com/04pranab" icon="💻" label="GitHub" />
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6 md:p-8 rounded-xl border-2 border-purple-500/30 backdrop-blur-sm">
            <div className="text-purple-400 text-sm font-mono mb-4 md:mb-6 flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              MESSAGE COMPOSER
            </div>
            <div className="space-y-4 md:space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your username..."
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700/50 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 font-mono text-sm md:text-base"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address..."
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700/50 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 font-mono text-sm md:text-base"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Message subject..."
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700/50 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 font-mono text-sm md:text-base"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Type your message here..."
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700/50 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 resize-none transition-all duration-300 font-mono text-sm md:text-base"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 relative overflow-hidden group border-2 border-purple-500"
              >
                <span className="relative z-10 font-mono text-sm md:text-base">🚀 TRANSMIT MESSAGE</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-gray-700/50 rounded-lg hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 hover:text-purple-400 transition-all duration-300 border-2 border-gray-600 hover:border-purple-500/50 group"
    >
      <span className="text-base md:text-lg group-hover:scale-110 transition-transform duration-300">{icon}</span>
      <span className="font-medium font-mono text-sm md:text-base">{label}</span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t-2 border-purple-500/30 text-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gray-800/50 border border-purple-500/30 rounded-lg p-4 md:p-6 backdrop-blur-sm">
          <p className="text-gray-400 mb-2 font-mono text-sm md:text-base">
            &copy; 2024 Om Pranab Mohanty. All rights reserved.
          </p>
          <p className="text-gray-400 font-mono text-sm md:text-base">
            Made with <span className="text-red-500">❤️</span> and lots of <span className="text-yellow-500">☕</span>
          </p>
          <div className="mt-3 md:mt-4 text-purple-400 text-xs md:text-sm font-mono">
            {"> System Status: ONLINE | Version: 2.0.1 | Last Updated: 2024"}
          </div>
        </div>
      </div>
    </footer>
  );
}

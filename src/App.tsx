import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Process from './components/Process'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import BlogPostPage from './components/BlogPostPage'

// Komponenta koja automatski skroluje na vrh kada se promeni stranica (ruta)
function ScrollToTopRouter() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}

function HomePage() {
    return (
        <>
            <Navbar />
            <Hero />
            <Services />
            <Process />
            <Blog />
            <Contact />
            <Footer />
        </>
    )
}

function App() {
    return (
        <div className="bg-slate-950 text-white overflow-x-hidden min-h-screen relative">

            {/* Pozadinski efekti (uvek prisutni) */}
            <div className="fixed inset-0 bg-grid pointer-events-none"></div>
            <div className="glow-orb w-96 h-96 bg-orange-500 top-0 -left-48 animate-float"></div>
            <div className="glow-orb w-96 h-96 bg-amber-400 top-96 -right-48 animate-float" style={{animationDelay: '2s'}}></div>
            <div className="glow-orb w-96 h-96 bg-orange-600 bottom-0 left-1/2 animate-float" style={{animationDelay: '4s'}}></div>

            {/* Logika za skrolovanje i plutajuće dugme */}
            <ScrollToTopRouter />
            <ScrollToTop />

            {/* Rute (stranice) */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog/:slug" element={
                                              <>
                                                  <Navbar />
                                                  <BlogPostPage />
                                                  <Footer />
                                              </>
                                          } />
            </Routes>

        </div>
    )
}

export default App
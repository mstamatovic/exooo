import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    // Funkcija koja navigira na home page i skroluje do sekcije
    const scrollToSection = (sectionId: string) => {
        if (location.pathname !== '/') {
            // Ako nismo na home page, prvo navigiraj tamo
            navigate('/')
            // Sačekaj da se stranica učita pa skroluj
            setTimeout(() => {
                const element = document.getElementById(sectionId)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            }, 100)
        } else {
            // Ako smo već na home page, samo skroluj
            const element = document.getElementById(sectionId)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
        setIsOpen(false) // Zatvori mobilni meni
    }

    return (
        <nav className="relative z-50 border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/80">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/')
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-2xl font-bold gradient-text cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        exooo
                    </a>

                    {/* Desktop Meni */}
                    <div className="hidden md:flex items-center gap-8">
                        <button
                            onClick={() => scrollToSection('usluge')}
                            className="text-slate-300 hover:text-white transition-colors bg-transparent border-none cursor-pointer text-base"
                        >
                            Usluge
                        </button>
                        <button
                            onClick={() => scrollToSection('proces')}
                            className="text-slate-300 hover:text-white transition-colors bg-transparent border-none cursor-pointer text-base"
                        >
                            Proces
                        </button>
                        <button
                            onClick={() => scrollToSection('blog')}
                            className="text-slate-300 hover:text-white transition-colors bg-transparent border-none cursor-pointer text-base"
                        >
                            Blog
                        </button>
                        <button
                            onClick={() => scrollToSection('kontakt')}
                            className="text-slate-300 hover:text-white transition-colors bg-transparent border-none cursor-pointer text-base"
                        >
                            Kontakt
                        </button>
                        <button
                            onClick={() => scrollToSection('kontakt')}
                            className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all"
                        >
                            Zakaži konsultacije
                        </button>
                    </div>

                    {/* Mobilno dugme */}
                    <button
                        className="md:hidden text-white focus:outline-none p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobilni meni */}
                {isOpen && (
                    <div className="md:hidden mt-6 pb-4 flex flex-col space-y-4 bg-slate-900/50 rounded-xl p-6 border border-slate-800 backdrop-blur-md">
                        <button
                            onClick={() => scrollToSection('usluge')}
                            className="text-slate-300 hover:text-white transition-colors text-lg bg-transparent border-none cursor-pointer text-left"
                        >
                            Usluge
                        </button>
                        <button
                            onClick={() => scrollToSection('proces')}
                            className="text-slate-300 hover:text-white transition-colors text-lg bg-transparent border-none cursor-pointer text-left"
                        >
                            Proces
                        </button>
                        <button
                            onClick={() => scrollToSection('blog')}
                            className="text-slate-300 hover:text-white transition-colors text-lg bg-transparent border-none cursor-pointer text-left"
                        >
                            Blog
                        </button>
                        <button
                            onClick={() => scrollToSection('kontakt')}
                            className="text-slate-300 hover:text-white transition-colors text-lg bg-transparent border-none cursor-pointer text-left"
                        >
                            Kontakt
                        </button>
                        <button
                            onClick={() => scrollToSection('kontakt')}
                            className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all"
                        >
                            Zakaži konsultacije
                        </button>
                    </div>
                )}
            </div>
        </nav>
    )
}
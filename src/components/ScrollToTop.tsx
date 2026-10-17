import { useState, useEffect } from 'react'

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Funkcija koja proverava koliko smo skrolovali
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        // Slušamo skrolovanje prozora
        window.addEventListener('scroll', toggleVisibility)

        // Čistimo listener kada se komponenta ukloni
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    // Funkcija za glatko skrolovanje na vrh
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <button
            onClick={(e) => {
                scrollToTop();
                e.currentTarget.blur(); // Ovo oduzima fokus dugmetu odmah nakon klika
            }}
            aria-label="Nazad na vrh"
            className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-110 ${
                isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10 pointer-events-none'
            }`}
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>
    )
}
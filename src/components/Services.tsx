export default function Services() {
    return (
        <section id="usluge" className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Naše usluge</h2>
                <p className="text-xl text-slate-400">Kompletna rešenja za vaš softver</p>
            </div>

            {/* Grid sa 4 jednake kartice */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Software Development */}
                <div className="service-card relative group bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm overflow-hidden flex flex-col">
                    <div className="relative z-10 flex flex-col flex-1">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        {/* Fiksirana visina naslova */}
                        <h3 className="text-2xl font-bold mb-4 min-h-[3.5rem]">Software Development</h3>
                        {/* Opis koji se rasteže */}
                        <p className="text-slate-400 mb-6 flex-1 min-h-[4.5rem]">Custom rešenjenja, Cloud arhitekture, Web & Mobile aplikacije. Gradimo skalabilne sisteme sa čistim kodom.</p>
                        {/* Tech stack uvek na dnu */}
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {['React', 'Node.js', 'AWS', 'TypeScript'].map(tech => (
                                <span key={tech} className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300">{tech}</span>
                            ))}
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl"></div>
                </div>

                {/* Software Testing */}
                <div className="service-card relative group bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm overflow-hidden flex flex-col">
                    <div className="relative z-10 flex flex-col flex-1">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 min-h-[3.5rem]">Software Testing</h3>
                        <p className="text-slate-400 mb-6 flex-1 min-h-[4.5rem]">Automatizacija, Performance testing, CI/CD. Nula bagova, maksimalna brzina.</p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {['Selenium', 'Jest', 'Cypress', 'Playwright'].map(tech => (
                                <span key={tech} className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300">{tech}</span>
                            ))}
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-amber-400/20 to-transparent rounded-full blur-3xl"></div>
                </div>

                {/* Software Security */}
                <div className="service-card relative group bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm overflow-hidden flex flex-col">
                    <div className="relative z-10 flex flex-col flex-1">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 min-h-[3.5rem]">Software Security</h3>
                        <p className="text-slate-400 mb-6 flex-1 min-h-[4.5rem]">Penetraciono testiranje, Code review, DevSecOps. Proaktivna zaštita.</p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {['OWASP', 'ISO 27001', 'GDPR', 'SAST'].map(tech => (
                                <span key={tech} className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300">{tech}</span>
                            ))}
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-400/20 to-transparent rounded-full blur-3xl"></div>
                </div>

                {/* Consulting */}
                <div className="service-card relative group bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm overflow-hidden flex flex-col">
                    <div className="relative z-10 flex flex-col flex-1">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 min-h-[3.5rem]">Consulting</h3>
                        <p className="text-slate-400 mb-6 flex-1 min-h-[4.5rem]">Strateško savetovanje, arhitekturni pregledi, optimizacija timova i procesa. Vaš tehnički partner.</p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {['Strategy', 'Architecture', 'Team Lead', 'Agile'].map(tech => (
                                <span key={tech} className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300">{tech}</span>
                            ))}
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl"></div>
                </div>

            </div>
        </section>
    )
}
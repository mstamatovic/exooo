import { Link } from 'react-router-dom'

export default function Blog() {
    const articles = [
        {
            slug: "ddos-zastita-rest-api",
            category: "Bezbednost",
            title: "Kako zaštititi REST API od DDoS napada",
            excerpt: "Detaljan vodič kroz implementaciju rate limiting-a, WAF pravila i analizu saobraćaja u realnom vremenu.",
            date: "12. Okt 2026",
            readTime: "8 min čitanja",
            gradient: "from-orange-500 to-red-600",
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            )
        },
        {
            slug: "docker-security-best-practices",
            category: "DevOps",
            title: "Container Security: Best Practices za Docker",
            excerpt: "Smanjivanje attack surface-a, skeniranje slika u CI/CD pipeline-u i bezbedno upravljanje tajnama.",
            date: "05. Okt 2026",
            readTime: "6 min čitanja",
            gradient: "from-amber-400 to-orange-500",
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        },
        {
            slug: "shift-left-security",
            category: "Teorija",
            title: "Zašto je Shift-Left Security neophodan",
            excerpt: "Analiza troškova ispravljanja bagova u različitim fazama razvoja softvera i kako integrisati SAST alate.",
            date: "28. Sep 2026",
            readTime: "5 min čitanja",
            gradient: "from-orange-600 to-amber-400",
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        }
    ];

    return (
        <section id="blog" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Iz našeg bloga</h2>
                <p className="text-xl text-slate-400">Tehnički članci, novosti i best practices</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                    <Link
                        to={`/blog/${article.slug}`}
                        key={article.slug}
                        className="group bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-2 flex flex-col"
                    >
                        {/* "Cover" deo kartice */}
                        <div className={`h-48 bg-gradient-to-br ${article.gradient} flex items-center justify-center relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                            <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                                {article.icon}
                            </div>
                            {/* Kategorija badge */}
                            <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-sm text-orange-400 text-xs font-bold px-3 py-1 rounded-full border border-orange-500/20">
                                {article.category}
                            </div>
                        </div>

                        {/* Sadržaj kartice */}
                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors leading-tight">
                                {article.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                                {article.excerpt}
                            </p>

                            {/* Footer kartice */}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                                <div className="text-xs text-slate-500">
                                    {article.date} • {article.readTime}
                                </div>
                                <div className="text-orange-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Čitaj više
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
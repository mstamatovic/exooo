export default function Process() {
    return (
        <section id="proces" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Kako radimo</h2>
                <p className="text-xl text-slate-400">Od ideje do produkcije u 4 koraka</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { step: "01", title: "Analiza", desc: "Dubinsko razumevanje vaših potreba i kreiranje robustne arhitekture." },
                    { step: "02", title: "Razvoj", desc: "Pisanje čistog, skalabilnog koda uz primenu najboljih industrijskih praksi." },
                    { step: "03", title: "Testiranje", desc: "Rigorozno QA i bezbednosno testiranje pre svakog puštanja u rad." },
                    { step: "04", title: "Deploy", desc: "Glatko puštanje u produkciju, monitoring i kontinuirano održavanje." }
                ].map((item) => (
                    <div key={item.step} className="relative bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-orange-500/30 transition-all group overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

                        {/* Veliki broj koraka */}
                        <div className="text-5xl font-black gradient-text mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                            {item.step}
                        </div>

                        {/* Naslov koraka (sada će raditi jer smo dodali 'title' u objekat) */}
                        <h3 className="text-xl font-bold text-white mb-2">
                            {item.title}
                        </h3>

                        <p className="text-slate-400 leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
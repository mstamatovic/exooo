export default function Footer() {
    return (
        <footer className="relative z-10 border-t border-slate-800/50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/*<div className="text-2xl font-bold gradient-text">eXooo</div>*/}
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-2xl font-bold gradient-text cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        eXooo
                    </a>
                    {/*<div className="flex gap-6">*/}
                    {/*    <a href="https://github.com/mstamatovic" className="text-slate-400 hover:text-white transition-colors">GitHub</a>*/}
                    {/*    <a href="http://linkedin.com/in/milosstamatovic" className="text-slate-400 hover:text-white transition-colors">LinkedIn</a>*/}
                    {/*    /!*<a href="#" className="text-slate-400 hover:text-white transition-colors">Twitter</a>*!/*/}
                    {/*</div>*/}
                    <div className="flex gap-6">
                        <a
                            href="https://github.com/mstamatovic"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            GitHub
                        </a>
                        <a
                            href="http://linkedin.com/in/milosstamatovic"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            LinkedIn
                        </a>
                    </div>
                    <div className="text-slate-500 text-sm">
                        © 2026 eXooo. Sva prava zadržana.
                    </div>
                </div>
            </div>
        </footer>
    )
}
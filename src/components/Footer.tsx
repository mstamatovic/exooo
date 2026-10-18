import { useTranslation } from 'react-i18next'

export default function Footer() {
    const { t } = useTranslation()

    return (
        <footer className="relative z-10 border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-xl mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Logo */}
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-2xl font-bold gradient-text cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        exooo
                    </a>

                    {/* Linkovi */}
                    <div className="flex gap-6">
                        <a href="https://github.com/tvoj-profil" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">GitHub</a>
                        <a href="https://linkedin.com/in/tvoj-profil" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">LinkedIn</a>
                    </div>

                    {/* Copyright */}
                    <p className="text-sm text-slate-500">
                        © 2026 eXooo. {t('footer.rights')}
                    </p>
                </div>
            </div>
        </footer>
    )
}
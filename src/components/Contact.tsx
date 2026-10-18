import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Contact() {
    const { t } = useTranslation()
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Ovde će kasnije ići prava logika za slanje (npr. EmailJS ili backend)
        alert(t('contact.submitButton') + ' - OK!')
        setFormData({ name: '', email: '', message: '' })
    }

    return (
        <section id="kontakt" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('contact.title')}</h2>
                <p className="text-xl text-slate-400">{t('contact.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-slate-900/30 border border-slate-800 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                {/* LEVA STRANA: Informacije */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">{t('contact.chatTitle')}</h3>
                        <p className="text-slate-400 leading-relaxed">{t('contact.chatDesc')}</p>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold">{t('contact.emailLabel')}</h4>
                                <p className="text-slate-400">info@exooo.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-amber-400/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold">{t('contact.phoneLabel')}</h4>
                                <p className="text-slate-400">+381 64 119 8208</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-orange-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold">{t('contact.locationLabel')}</h4>
                                <p className="text-slate-400">Zlatibor, Srbija (Remote)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DESNA STRANA: Forma */}
                <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">{t('contact.nameLabel')}</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                                placeholder={t('contact.namePlaceholder')}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">{t('contact.emailLabel')}</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                                placeholder={t('contact.emailPlaceholder')}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">{t('contact.messageLabel')}</label>
                            <textarea
                                rows={4}
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                                placeholder={t('contact.messagePlaceholder')}
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all transform hover:scale-[1.02]">
                            {t('contact.submitButton')}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
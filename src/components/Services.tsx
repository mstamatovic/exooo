import { useTranslation } from 'react-i18next'

export default function Services() {
    const { t } = useTranslation()

    const services = [
        {
            title: t('services.devTitle'),
            description: t('services.devDesc'),
            icon: (
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            )
        },
        {
            title: t('services.qaTitle'),
            description: t('services.qaDesc'),
            icon: (
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            title: t('services.secTitle'),
            description: t('services.secDesc'),
            icon: (
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            )
        }
    ]

    return (
        <section id="usluge" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('services.title')}</h2>
                <p className="text-xl text-slate-400">{t('services.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-2">
                        <div className="w-16 h-16 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6">
                            {service.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                        <p className="text-slate-400 leading-relaxed">{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
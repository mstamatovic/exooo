import { useTranslation } from 'react-i18next'

export default function Process() {
    const { t } = useTranslation()

    const steps = [
        { number: "01", title: t('process.step1Title'), description: t('process.step1Desc') },
        { number: "02", title: t('process.step2Title'), description: t('process.step2Desc') },
        { number: "03", title: t('process.step3Title'), description: t('process.step3Desc') },
        { number: "04", title: t('process.step4Title'), description: t('process.step4Desc') },
    ]

    return (
        <section id="proces" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('process.title')}</h2>
                <p className="text-xl text-slate-400">{t('process.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                    <div key={index} className="relative group">
                        <div className="text-6xl font-black text-slate-800/50 mb-4 group-hover:text-orange-500/20 transition-colors">
                            {step.number}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                        <p className="text-slate-400 leading-relaxed">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
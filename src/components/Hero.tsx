import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const sequences = [
    // 1. NAPREDNI SECURITY AUDIT (OWASP ZAP + SAST)
    [
        { type: 'prompt', text: '$ owasp-zap.sh --target https://api.exooo.rs --deep-scan' },
        { type: 'info', text: 'Initializing OWASP ZAP 2.14.0...' },
        { type: 'info', text: 'Loading scripts: 47 active, 23 passive' },
        { type: 'success', text: '[+] Spider crawling: 1,847 URLs discovered' },
        { type: 'success', text: '[+] AJAX spider: 234 dynamic endpoints' },
        { type: 'warning', text: '[!] Medium: X-Frame-Options header missing' },
        { type: 'warning', text: '[!] Medium: Cookie without Secure flag' },
        { type: 'error', text: '[×] High: SQL Injection in /api/users?id=' },
        { type: 'error', text: '[×] High: XSS Reflected in search parameter' },
        { type: 'info', text: '' },
        { type: 'prompt', text: '$ semgrep --config=p/r2c-security-audit ./src' },
        { type: 'success', text: '[+] Scanning 142 files...' },
        { type: 'success', text: '[+] Findings: 0 critical, 2 high, 5 medium' },
        { type: 'info', text: '' },
        { type: 'prompt', text: '$ status: AUDIT COMPLETE - 4 vulnerabilities found' },
    ],
    // 2. KUBERNETES PRODUCTION DEPLOY
    [
        { type: 'prompt', text: '$ kubectl apply -f k8s/production/ --namespace=exooo-cms-prod' },
        { type: 'info', text: 'deployment.apps/exooo-cms-api configured' },
        { type: 'info', text: 'service/exooo-cms-api configured' },
        { type: 'info', text: 'configmap/exooo-cms-config configured' },
        { type: 'info', text: '' },
        { type: 'prompt', text: '$ kubectl rollout status deployment/exooo-cms-api -n exooo-cms-prod' },
        { type: 'info', text: 'Waiting for deployment "exooo-cms-api" rollout to finish:' },
        { type: 'info', text: '  1 of 3 updated replicas are available...' },
        { type: 'info', text: '  2 of 3 updated replicas are available...' },
        { type: 'success', text: '[+] deployment "exooo-cms-api" successfully rolled out' },
        { type: 'info', text: '' },
        { type: 'prompt', text: '$ kubectl get pods -n exooo-cms-prod -o wide' },
        { type: 'success', text: 'NAME                        READY   STATUS    IP          NODE' },
        { type: 'success', text: 'exooo-cms-api-7d9f8b6c4-x2k9p   1/1     Running   10.244.1.15 node-1' },
        { type: 'success', text: 'exooo-cms-api-7d9f8b6c4-m8n3q   1/1     Running   10.244.2.22 node-2' },
        { type: 'success', text: 'exooo-cms-api-7d9f8b6c4-r5t7w   1/1     Running   10.244.3.8  node-3' },
        { type: 'info', text: '' },
        { type: 'prompt', text: '$ status: DEPLOYED - 3/3 replicas healthy' },
    ],
    // 3. TERRAFORM INFRASTRUCTURE
    [
        { type: 'prompt', text: '$ terraform plan -var-file=prod.tfvars' },
        { type: 'info', text: 'Refreshing state... [id=exooo-cms-vpc-prod]' },
        { type: 'info', text: '' },
        { type: 'info', text: 'Terraform will perform the following actions:' },
        { type: 'info', text: '' },
        { type: 'success', text: '  # aws_ecs_cluster.exooo-cms will be created' },
        { type: 'success', text: '  + resource "aws_ecs_cluster" "exooo-cms" {' },
        { type: 'success', text: '      + name = "exooo-cms-production"' },
        { type: 'success', text: '      + capacity_providers = ["FARGATE"]' },
        { type: 'success', text: '    }' },
        { type: 'info', text: '' },
        { type: 'success', text: '  # aws_rds_cluster.exooo_db will be created' },
        { type: 'success', text: '  + resource "aws_rds_cluster" "exooo_db" {' },
        { type: 'success', text: '      + engine = "aurora-postgresql"' },
        { type: 'success', text: '      + engine_version = "15.4"' },
        { type: 'success', text: '    }' },
        { type: 'info', text: '' },
        { type: 'prompt', text: '$ terraform apply -auto-approve' },
        { type: 'success', text: '[+] Apply complete! Resources: 2 added, 0 changed, 0 destroyed.' },
        { type: 'info', text: '' },
        { type: 'prompt', text: '$ status: INFRASTRUCTURE PROVISIONED' },
    ],
    // 4. CI/CD PIPELINE (GitHub Actions)
    [
        { type: 'prompt', text: '$ gh run view 8472951036 --log' },
        { type: 'info', text: '2026-10-16T14:23:01Z [build] Job started' },
        { type: 'info', text: '2026-10-16T14:23:03Z [build] Run actions/checkout@v4' },
        { type: 'info', text: '2026-10-16T14:23:05Z [build] Run actions/setup-node@v4' },
        { type: 'success', text: '2026-10-16T14:23:08Z [build] ✓ Node.js 20.x installed' },
        { type: 'info', text: '2026-10-16T14:23:10Z [build] Run npm ci' },
        { type: 'success', text: '2026-10-16T14:23:47Z [build] ✓ Dependencies installed (37s)' },
        { type: 'info', text: '2026-10-16T14:23:49Z [build] Run npm run build' },
        { type: 'success', text: '2026-10-16T14:24:12Z [build] ✓ Build completed (23s)' },
        { type: 'info', text: '2026-10-16T14:24:14Z [test] Job started' },
        { type: 'info', text: '2026-10-16T14:24:16Z [test] Run npm run test:coverage' },
        { type: 'success', text: '2026-10-16T14:24:58Z [test] ✓ Tests: 142 passed, 0 failed' },
        { type: 'success', text: '2026-10-16T14:24:58Z [test] ✓ Coverage: 87.3% (threshold: 80%)' },
        { type: 'info', text: '2026-10-16T14:25:00Z [deploy] Job started' },
        { type: 'success', text: '2026-10-16T14:25:34Z [deploy] ✓ Deployed to production (34s)' },
        { type: 'info', text: '' },
        { type: 'prompt', text: '$ status: PIPELINE SUCCESS - All jobs passed' },
    ]
];

export default function Hero() {
    const { t } = useTranslation() // <--- DODATO ZA PREVODE
    const [currentSeqIndex, setCurrentSeqIndex] = useState(0);
    const [lines, setLines] = useState<{ type: string, text: string }[]>([]);
    const [activeLine, setActiveLine] = useState<{ type: string, text: string } | null>(null);
    const [step, setStep] = useState(0);

    useEffect(() => {
        let timeoutId: number;
        let typeInterval: number;

        const currentSeq = sequences[currentSeqIndex];

        if (step >= currentSeq.length) {
            timeoutId = setTimeout(() => {
                setLines([]);
                setStep(0);
                setCurrentSeqIndex(prev => (prev + 1) % sequences.length);
            }, 3000);
            return () => clearTimeout(timeoutId);
        }

        const item = currentSeq[step];
        const isTyping = item.type === 'prompt';

        if (isTyping) {
            let char = 0;
            setActiveLine({ type: item.type, text: '' });

            typeInterval = setInterval(() => {
                char++;
                setActiveLine({ type: item.type, text: item.text.substring(0, char) });

                if (char >= item.text.length) {
                    clearInterval(typeInterval);
                    setLines(prev => [...prev, item]);
                    setActiveLine(null);
                    setStep(prev => prev + 1);
                }
            }, 45);

            return () => clearInterval(typeInterval);
        } else {
            timeoutId = setTimeout(() => {
                setLines(prev => [...prev, item]);
                setStep(prev => prev + 1);
            }, item.text === '' ? 300 : 150);

            return () => clearTimeout(timeoutId);
        }
    }, [step, currentSeqIndex]);

    return (
        <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 lg:pt-32 lg:pb-32">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">

                {/* LEVA STRANA: Tekst i CTA */}
                <div className="space-y-8 animate-fade-in-up">
                    {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-sm text-orange-400 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        {t('hero.badge')}
                    </div> */}

                    <h3 className="text-4xl md:text-6xl lg:text-4xl font-black leading-[1.5] tracking-tight">
                        <span className="text-white">{t('hero.title1')}</span><br />
                        <span className="text-white">{t('hero.title2')}</span><br />
                        <span className="gradient-text">{t('hero.title3')}</span>
                    </h3>

                    <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed text-justify">
                        {t('hero.description')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        {/* Dugme 1: Zakaži konsultacije -> vodi na Kontakt */}
                        <a
                            href="#kontakt"
                            className="group relative block px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/30 transition-all transform hover:scale-105 overflow-hidden text-center"
                        >
                            <span className="relative z-10 flex items-center justify-center">
                                {t('hero.ctaPrimary')}
                                <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                            </span>
                        </a>

                        {/* Dugme 2: Pogledaj usluge -> vodi na Usluge */}
                        <a
                            href="#usluge"
                            className="block px-8 py-4 bg-slate-900/50 border border-slate-700 text-white rounded-xl font-semibold text-lg hover:bg-slate-800/50 hover:border-orange-500/30 transition-all backdrop-blur-sm text-center"
                        >
                            {t('hero.ctaSecondary')}
                        </a>
                    </div>

                    <div className="flex items-center gap-4 pt-4 text-sm text-slate-500">
                        {/* <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-xs text-orange-400 font-bold">JS</div>
                            <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-xs text-amber-400 font-bold">PY</div>
                            <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-xs text-orange-600 font-bold">TS</div>
                        </div> */}
                        <p>{t('hero.trustText')}</p>
                    </div>
                </div>

                {/* DESNA STRANA: Terminal - poboljšan raspored */}
                <div className="relative animate-fade-in-up lg:pl-8" style={{ animationDelay: '0.3s' }}>
                    {/* Pozadinski sjaj */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-amber-400/10 blur-3xl rounded-full animate-pulse-glow scale-110"></div>

                    {/* Terminal sa 3D efektom */}
                    <div className="relative bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl transform hover:scale-[1.02] transition-transform duration-500">

                        {/* Naslovna traka */}
                        <div className="flex items-center justify-between px-5 py-3 bg-slate-900/90 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <div className="text-xs text-slate-500 font-mono tracking-wide">exooo@devops:~</div>
                            <div className="w-12"></div>
                        </div>

                        {/* Sadržaj terminala */}
                        <div className="p-8 text-[14px] leading-7 h-[420px] overflow-y-auto terminal-font">
                            {lines.map((line, index) => (
                                <div key={index} className={getLineColor(line.type)}>
                                    {line.text}
                                </div>
                            ))}

                            {activeLine && (
                                <div className={getLineColor(activeLine.type)}>
                                    {activeLine.text}
                                    <span className="inline-block w-2.5 h-6 bg-orange-500 animate-pulse ml-0.5 align-middle"></span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function getLineColor(type: string) {
    const base = 'terminal-font';

    switch (type) {
        case 'prompt':
            return `${base} text-orange-400 font-semibold`;
        case 'success':
            return `${base} text-green-400`;
        case 'warning':
            return `${base} text-amber-400`;
        case 'error':
            return `${base} text-red-400`;
        default:
            return `${base} text-slate-300`;
    }
}
export interface BlogPost {
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    gradient: string;
    content: string[];
}

export const blogPosts: BlogPost[] = [
    {
        slug: "ddos-zastita-rest-api",
        category: "Bezbednost",
        title: "Kako zaštititi REST API od DDoS napada",
        excerpt: "Detaljan vodič kroz implementaciju rate limiting-a, WAF pravila i analizu saobraćaja u realnom vremenu.",
        date: "12. Okt 2026",
        readTime: "8 min čitanja",
        gradient: "from-orange-500 to-red-600",
        content: [
            "Distribuirani napadi uskraćivanjem usluge (DDoS) su jedna od najčešćih i najdestruktivnijih pretnji za moderne web aplikacije. U ovom članku ćemo proći kroz praktične korake zaštite vašeg REST API-ja.",
            "## 1. Rate Limiting na nivou aplikacije",
            "Prva linija odbrane je ograničavanje broja zahteva po korisniku. Najpopularniji algoritam je Token Bucket, koji omogućava kratke burst-ove saobraćaja, ali ograničava prosečnu stopu. U Node.js ekosistemu, `express-rate-limit` je odličan izbor:",
            "```ts\nimport rateLimit from 'express-rate-limit';\n\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minuta\n  max: 100, // 100 zahteva po IP-u\n  message: 'Previše zahteva, pokušajte ponovo kasnije'\n});\n\napp.use('/api/', limiter);\n```",
            "## 2. Web Application Firewall (WAF)",
            "WAF analizira saobraćaj na nivou aplikacije i blokira poznate napadačke obrasce. AWS WAF, Cloudflare i ModSecurity su vodeća rešenja. Ključno je definisati pravila za SQL injection, XSS i abnormalne pattern-e u zahtevima.",
            "## 3. Analiza saobraćaja u realnom vremenu",
            "Koristite alate kao što su Prometheus + Grafana za monitoring. Postavite alert-e kada broj zahteva premaši prag od 3 standardne devijacije od proseka. Ovo vam daje vremena da reagujete pre nego što napad postane kritičan.",
            "## Zaključak",
            "DDoS zaštita nije jedan alat, već slojevita strategija: rate limiting na aplikaciji, WAF na mreži, i monitoring za rano upozorenje. Kombinacija ova tri pristupa čini vaš API otpornim na 95% napada."
        ]
    },
    {
        slug: "docker-security-best-practices",
        category: "DevOps",
        title: "Container Security: Best Practices za Docker",
        excerpt: "Smanjivanje attack surface-a, skeniranje slika u CI/CD pipeline-u i bezbedno upravljanje tajnama.",
        date: "05. Okt 2026",
        readTime: "6 min čitanja",
        gradient: "from-amber-400 to-orange-500",
        content: [
            "Docker kontejneri su postali standard za deployment, ali donose i nove bezbednosne izazove. Hajde da prođemo kroz ključne prakse koje svaki DevOps tim treba da implementira.",
            "## 1. Koristite minimalne base slike",
            "Umesto `node:latest` (koji ima preko 1GB), koristite `node:20-alpine` (oko 180MB). Manja slika = manji attack surface. Još bolje, koristite distroless slike koje nemaju čak ni shell:",
            "```dockerfile\n# Umesto ovoga:\nFROM node:20\n\n# Koristite ovo:\nFROM node:20-alpine\n\n# Ili distroless:\nFROM gcr.io/distroless/nodejs20-debian12\n```",
            "## 2. Nemojte pokretati kontejner kao root",
            "Podrazumevano, Docker kontejneri se pokreću kao root korisnik. Ovo je ogroman bezbednosni rizik. Uvek kreirajte ne-privilegovanog korisnika u Dockerfile-u:",
            "```dockerfile\nRUN addgroup -S appgroup && adduser -S appuser -G appgroup\nUSER appuser\n```",
            "## 3. Skenirajte slike u CI/CD pipeline-u",
            "Integrišite `trivy` ili `grype` u vaš GitHub Actions workflow. Ovo automatski skenira sve dependency-je za poznate CVE ranjivosti pre deploy-a:",
            "```yaml\n- name: Scan image\n  uses: aquasecurity/trivy-action@master\n  with:\n    image-ref: 'exooo-cms-api:latest'\n    severity: 'CRITICAL,HIGH'\n```",
            "## 4. Tajne držite van slika",
            "Nikada ne hardkodujte lozinke u Dockerfile. Koristite Docker secrets, environment varijable iz vault-a (HashiCorp Vault, AWS Secrets Manager), ili `.env` fajlove koji su u `.gitignore`.",
            "## Zaključak",
            "Bezbednost kontejnera počinje u Dockerfile-u. Minimalne slike, ne-root korisnici, skeniranje u pipeline-u i pravilno upravljanje tajnama su četiri stuba na kojima se gradi siguran deployment."
        ]
    },
    {
        slug: "shift-left-security",
        category: "Teorija",
        title: "Zašto je Shift-Left Security neophodan",
        excerpt: "Analiza troškova ispravljanja bagova u različitim fazama razvoja softvera i kako integrisati SAST alate.",
        date: "28. Sep 2026",
        readTime: "5 min čitanja",
        gradient: "from-orange-600 to-amber-400",
        content: [
            "Shift-Left Security je filozofija koja kaže: bezbednosne probleme treba otkrivati što ranije u procesu razvoja. Ali zašto je to toliko važno? Odgovor leži u ekonomiji ispravljanja bagova.",
            "## Matematika troškova",
            "Prema istraživanju IBM-a, cena ispravljanja bezbednosnog problema eksponencijalno raste kako se krećemo kroz faze razvoja:",
            "- **Faza dizajna:** 1x (bazna cena)\n- **Faza razvoja:** 6x skuplje\n- **Faza testiranja:** 15x skuplje\n- **Faza produkcije:** 100x skuplje",
            "Ovo znači da ranjivost koja košta 100€ da se ispravi dok pišete kod, koštaće 10.000€ ako se otkrije nakon što je već u produkciji - a to ne uključuje troškove reputacije i potencijalne kazne.",
            "## Kako implementirati Shift-Left?",
            "**1. SAST (Static Application Security Testing)** - alati koji analiziraju kod dok ga pišete. SonarQube, Semgrep i GitHub CodeQL su vodeća rešenja. Integrišu se direktno u IDE i u PR proces.",
            "**2. Pre-commit hook-ovi** - koristite `husky` i `lint-staged` da pokrenete bezbednosne check-ove pre svakog commit-a. Ovo sprečava da nesiguran kod uopšte uđe u repository.",
            "**3. Threat Modeling u fazi dizajna** - pre nego što napišete ijednu liniju koda, analizirajte arhitekturu sa STRIDE metodologijom. Identifikujte potencijalne napade pre nego što postanu stvarni problemi.",
            "**4. Automatizovani dependency scanning** - alati kao što su Dependabot i Snyk automatski prate ranjivosti u vašim bibliotekama i otvaraju PR-ove sa zakrpama.",
            "## Kultura, ne samo alati",
            "Shift-Left nije samo skup alata - to je promena kulture. Developer-i moraju da razumeju osnove bezbednosti, a security tim mora da postane enabler, a ne gatekeeper. Kada bezbednost postane deo definicije 'gotovog' koda, a ne naknadna provera, tek tada govorimo o pravom Shift-Left-u.",
            "## Zaključak",
            "Shift-Left Security nije luksuz - to je ekonomski imperativ. Svaki sat investiran u ranu detekciju štedi dane (i hiljade evra) kasnije. Počnite sa SAST alatima u vašem CI/CD-u i gradite odatle."
        ]
    }
];
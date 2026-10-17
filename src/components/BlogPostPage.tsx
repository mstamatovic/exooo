import { useParams, Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

export default function BlogPostPage() {
    const { slug } = useParams()
    const post = blogPosts.find(p => p.slug === slug)

    // Ako članak nije pronađen, prikaži 404
    if (!post) {
        return (
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
                <h1 className="text-6xl font-black gradient-text mb-4">404</h1>
                <p className="text-xl text-slate-400 mb-8">Članak nije pronađen.</p>
                <Link to="/" className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all">
                    Nazad na početnu
                </Link>
            </div>
        )
    }

    return (
        <article className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20">

            {/* Breadcrumb */}
            <nav className="mb-8 text-sm">
                <Link to="/" className="text-slate-400 hover:text-orange-400 transition-colors">Početna</Link>
                <span className="text-slate-600 mx-2">/</span>
                <Link to="/#blog" className="text-slate-400 hover:text-orange-400 transition-colors">Blog</Link>
                <span className="text-slate-600 mx-2">/</span>
                <span className="text-slate-300">{post.category}</span>
            </nav>

            {/* Header članka */}
            <header className="mb-12">
                <div className={`inline-block px-3 py-1 bg-gradient-to-r ${post.gradient} text-slate-950 text-xs font-bold rounded-full mb-4`}>
                    {post.category}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                    {post.title}
                </h1>
                <div className="flex items-center gap-4 text-slate-400">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    <span>{post.readTime}</span>
                </div>
            </header>

            {/* Sadržaj članka */}
            <div className="prose prose-invert max-w-none">
                {post.content.map((paragraph, index) => {
                    // Ako paragraf počinje sa ##, to je naslov
                    if (paragraph.startsWith('## ')) {
                        return (
                            <h2 key={index} className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6">
                                {paragraph.replace('## ', '')}
                            </h2>
                        )
                    }
                    // Ako paragraf počinje sa ```, to je kod blok
                    if (paragraph.startsWith('```')) {
                        const codeLines = paragraph.split('\n').slice(1, -1)
                        return (
                            <pre key={index} className="bg-slate-900 border border-slate-800 rounded-xl p-6 my-6 overflow-x-auto">
                <code className="text-sm text-slate-300 font-mono">
                  {codeLines.join('\n')}
                </code>
              </pre>
                        )
                    }
                    // Ako paragraf počinje sa -, to je lista
                    if (paragraph.startsWith('- ')) {
                        const items = paragraph.split('\n').filter(line => line.startsWith('- '))
                        return (
                            <ul key={index} className="list-none space-y-2 my-4">
                                {items.map((item, i) => (
                                    <li key={i} className="flex gap-3 text-slate-300 leading-relaxed">
                                        <span className="text-orange-500 mt-1.5">•</span>
                                        <span>{item.replace('- ', '')}</span>
                                    </li>
                                ))}
                            </ul>
                        )
                    }
                    // Ako paragraf počinje sa **, to je bold tekst unutar liste
                    if (paragraph.startsWith('**')) {
                        const parts = paragraph.split('**')
                        return (
                            <div key={index} className="my-3 text-slate-300 leading-relaxed">
                                {parts.map((part, i) =>
                                    i % 2 === 1
                                        ? <strong key={i} className="text-white font-semibold">{part}</strong>
                                        : <span key={i}>{part}</span>
                                )}
                            </div>
                        )
                    }
                    // Običan paragraf
                    return (
                        <p key={index} className="text-slate-300 text-lg leading-relaxed mb-6">
                            {paragraph}
                        </p>
                    )
                })}
            </div>

            {/* Footer članka - navigacija */}
            <div className="mt-16 pt-8 border-t border-slate-800">
                <Link
                    to="/#blog"
                    className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors font-semibold"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Nazad na blog
                </Link>
            </div>
        </article>
    )
}
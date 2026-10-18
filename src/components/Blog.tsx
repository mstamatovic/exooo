import {type JSX, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { client } from '../sanityClient'
import { urlFor } from '../image' // <--- DODATO ZA SLIKE

interface Post {
    _id: string
    title: string
    slug: { current: string }
    category: string
    excerpt: string
    publishedAt: string
    readTime: string
    mainImage?: any // <--- DODATO
}

function getCategoryStyle(category: string) {
    const styles: Record<string, { gradient: string; icon: JSX.Element }> = {
        'Bezbednost': {
            gradient: 'from-orange-500 to-red-600',
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            )
        },
        'DevOps': {
            gradient: 'from-amber-400 to-orange-500',
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        },
        'Teorija': {
            gradient: 'from-orange-600 to-amber-400',
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        },
        'Novosti': {
            gradient: 'from-orange-500 to-amber-400',
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    }
    return styles[category] || styles['Novosti']
}

function formatDate(dateString: string) {
    const date = new Date(dateString)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec']
    return `${date.getDate()}. ${months[date.getMonth()]} ${date.getFullYear()}`
}

export default function Blog() {
    const { t } = useTranslation()
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const query = `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          category,
          excerpt,
          publishedAt,
          readTime,
          mainImage // <--- DODATO DA SE POVUČE SLIKA
        }[0...3]`

                const data = await client.fetch(query)
                setPosts(data)
            } catch (error) {
                console.error('Greška pri učitavanju blog postova:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    if (loading) {
        return (
            <section id="blog" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="text-center">
                    <p className="text-slate-400">Učitavanje članaka...</p>
                </div>
            </section>
        )
    }

    return (
        <section id="blog" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('blog.title')}</h2>
                <p className="text-xl text-slate-400">{t('blog.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => {
                    const style = getCategoryStyle(post.category)
                    return (
                        <Link
                            to={`/blog/${post.slug?.current || 'unnamed-post'}`}
                            key={post._id}
                            className="group bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-2 flex flex-col"
                        >
                            {/* Cover deo kartice: Slika ILI Gradijent */}
                            <div className="h-48 relative overflow-hidden">
                                {post.mainImage ? (
                                    <img
                                        src={urlFor(post.mainImage).width(600).height(300).fit('crop').url()}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className={`w-full h-full bg-gradient-to-br ${style.gradient} flex items-center justify-center relative`}>
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                                        <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                                            {style.icon}
                                        </div>
                                    </div>
                                )}

                                {/* Kategorija badge (uvek vidljiv) */}
                                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-sm text-orange-400 text-xs font-bold px-3 py-1 rounded-full border border-orange-500/20">
                                    {post.category}
                                </div>
                            </div>

                            {/* Sadržaj kartice */}
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                                    <div className="text-xs text-slate-500">
                                        {formatDate(post.publishedAt)} • {post.readTime}
                                    </div>
                                    <div className="text-orange-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                        {t('common.readMore')}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
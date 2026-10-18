import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { client } from '../sanityClient'
import { urlFor } from '../image'

interface Post {
    _id: string
    title: string
    slug: { current: string }
    category: string
    excerpt: string
    publishedAt: string
    readTime: string
    mainImage?: any
    body: any[]
}

function formatDate(dateString: string) {
    const date = new Date(dateString)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec']
    return `${date.getDate()}. ${months[date.getMonth()]} ${date.getFullYear()}`
}

export default function BlogPostPage() {
    const { slug } = useParams()
    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // AŽURIRAN GROQ: Eksplicitno dereferenciramo asset unutar slika u body-ju
                const query = `*[_type == "post" && slug.current == $slug][0] {
          _id,
          title,
          slug,
          category,
          excerpt,
          publishedAt,
          readTime,
          mainImage,
          body[]{
            ...,
            _type == "image" => {
              ...,
              "asset": asset->
            }
          }
        }`

                const data = await client.fetch(query, { slug })
                setPost(data)
            } catch (error) {
                console.error('Greška pri učitavanju članka:', error)
            } finally {
                setLoading(false)
            }
        }

        if (slug) {
            fetchPost()
        }
    }, [slug])

    if (loading) {
        return (
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
                <p className="text-slate-400">Učitavanje članka...</p>
            </div>
        )
    }

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
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 text-xs font-bold rounded-full mb-4">
                    {post.category}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-black text-white mb-6 leading-tight">
                    {post.title}
                </h1>
                <div className="flex items-center gap-4 text-slate-400">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    <span>{post.readTime}</span>
                </div>
            </header>

            {/* Glavna slika (Cover) */}
            {post.mainImage && post.mainImage.asset && (
                <div className="mb-12 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                    <img
                        src={urlFor(post.mainImage).width(1200).height(600).fit('crop').url()}
                        alt={post.title}
                        className="w-full h-[400px] object-cover"
                    />
                </div>
            )}

            {/* Sadržaj članka */}
            <div className="prose prose-invert max-w-none">
                <PortableText
                    value={post.body}
                    components={{
                        block: {
                            h2: ({children}) => <h2 className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6">{children}</h2>,
                            h3: ({children}) => <h3 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">{children}</h3>,
                            normal: ({children}) => <p className="text-slate-300 text-lg leading-relaxed mb-6 text-justify">{children}</p>,
                        },
                        list: {
                            bullet: ({children}) => <ul className="list-none space-y-2 my-4">{children}</ul>,
                            number: ({children}) => <ol className="list-decimal list-inside space-y-2 my-4 text-slate-300">{children}</ol>,
                        },
                        listItem: {
                            bullet: ({children}) => (
                                <li className="flex gap-3 text-slate-300 leading-relaxed">
                                    <span className="text-orange-500 mt-1.5">•</span>
                                    <span>{children}</span>
                                </li>
                            ),
                            // DODATO: Podrška za numerisane liste
                            number: ({children}) => (
                                <li className="text-slate-300 leading-relaxed list-decimal list-inside marker:text-orange-500">
                                    {children}
                                </li>
                            ),
                        },
                        marks: {
                            strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
                            em: ({children}) => <em className="text-slate-200">{children}</em>,
                            code: ({children}) => <code className="bg-slate-900 px-2 py-1 rounded text-orange-400 font-mono text-sm">{children}</code>,
                        },
                        types: {
                            // DODATO: Bezbednosna provera da li slika ima asset pre generisanja URL-a
                            image: ({value}: any) => {
                                if (!value || !value.asset) {
                                    return null; // Ne renderuj ništa ako slika nije otpremljena
                                }
                                return (
                                    <div className="my-8 rounded-xl overflow-hidden border border-slate-800">
                                        <img
                                            src={urlFor(value).width(800).fit('max').url()}
                                            alt={value.alt || 'Blog slika'}
                                            className="w-full h-auto"
                                        />
                                    </div>
                                )
                            },
                        },
                    }}
                />
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
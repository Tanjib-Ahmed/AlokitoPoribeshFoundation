import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import type { BlogPost } from '../context/CMSContext';
import { ArrowRight, Calendar, X } from 'lucide-react';

const Blog = () => {
    const { t } = useLanguage();
    const { state } = useCMS();
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    return (
        <section id="blog" className="py-20 md:py-32 bg-slate-50 relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 md:mb-16 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-4">
                            <span className="w-8 h-1 bg-brand-500 rounded-full" />
                            <span className="text-brand-600 font-bold uppercase tracking-wider text-sm">
                                Blog
                            </span>
                        </div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold text-gray-900"
                        >
                            {t.blog.title}
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <a href="#all-blogs" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 transition-colors">
                            সবগুলো দেখুন <ArrowRight className="w-5 h-5" />
                        </a>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {state.blogPosts.map((post, idx) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 group flex flex-col h-full"
                        >
                            <div className="aspect-video overflow-hidden bg-brand-50 shrink-0">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6 md:p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 shrink-0">
                                    <Calendar className="w-4 h-4" />
                                    <span>{post.date}</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors shrink-0">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mb-6 line-clamp-2 flex-1">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto shrink-0">
                                    <button
                                        onClick={() => setSelectedPost(post)}
                                        className="inline-flex items-center gap-2 text-brand-600 font-bold hover:gap-3 transition-all"
                                    >
                                        {t.blog.readMore} <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>

            {/* Blog Post Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPost(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl z-10 flex flex-col"
                        >
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="absolute top-4 right-4 z-20 p-2 bg-white/50 hover:bg-white backdrop-blur-md rounded-full text-gray-800 transition-colors shadow-sm"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="w-full h-64 sm:h-80 md:h-96 shrink-0 relative">
                                <img
                                    src={selectedPost.image}
                                    alt={selectedPost.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <div className="flex items-center gap-2 text-sm font-medium mb-3 opacity-90">
                                        <Calendar className="w-4 h-4" />
                                        <span>{selectedPost.date}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold leading-tight drop-shadow-md">
                                        {selectedPost.title}
                                    </h2>
                                </div>
                            </div>

                            <div className="p-6 md:p-10">
                                <div className="prose prose-lg max-w-none text-gray-600 font-light">
                                    <p className="text-xl text-gray-800 font-medium mb-6 leading-relaxed">
                                        {selectedPost.excerpt}
                                    </p>
                                    <p>
                                        Detailed article content would be displayed here. Since the blog system is running from a local data file, you can easily add multiple paragraphs or rich text structure to your `blogPosts.ts` logic later to populate this section fully. For now, it dynamically wraps everything perfectly into this native modern modal.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Blog;

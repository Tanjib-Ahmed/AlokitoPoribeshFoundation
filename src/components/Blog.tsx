import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { Calendar, ArrowRight, X, Clock, User } from 'lucide-react';

const Blog = () => {
    const { language } = useLanguage();
    const { state } = useCMS();
    const [selectedPost, setSelectedPost] = useState<any | null>(null);

    return (
        <section id="blog" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-1.5 bg-primary rounded-full" />
                            <span className="text-primary font-black uppercase tracking-[0.2em] text-sm">
                                {language === 'bn' ? 'আমাদের ব্লগ' : 'Latest News'}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-dark font-bangla mb-4">
                            {language === 'bn' ? 'আমাদের কার্যক্রমের আপডেট' : 'Updates from Our Journey'}
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {state.blogPosts.map((post, idx) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => setSelectedPost(post)}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-8 shadow-xl bg-gray-100">
                                <img
                                    src={post.cover}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span className="text-xs font-bold text-dark">{post.date}</span>
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-dark mb-4 font-bangla leading-tight group-hover:text-primary transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-dark/60 leading-relaxed font-medium mb-6 line-clamp-3">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-xs">
                                <span>{language === 'bn' ? 'বিস্তারিত পড়ুন' : 'Read Full Post'}</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>

            {/* Immersive Article Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-3xl p-4 md:p-12 overflow-y-auto"
                    >
                        <div className="max-w-4xl mx-auto bg-white rounded-[3rem] overflow-hidden shadow-2xl">
                            <div className="relative h-[25rem] md:h-[35rem]">
                                <img
                                    src={selectedPost.cover}
                                    alt={selectedPost.title}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={() => setSelectedPost(null)}
                                    className="absolute top-8 right-8 p-4 bg-white/20 hover:bg-white text-white hover:text-dark backdrop-blur-md transition-all rounded-full"
                                >
                                    <X className="w-8 h-8" />
                                </button>
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                            </div>

                            <div className="px-6 md:px-20 py-12 md:py-20 -mt-24 relative z-10 bg-white rounded-t-[3rem]">
                                <div className="flex flex-wrap items-center gap-6 mb-8 text-dark/40 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                                        <Calendar className="w-4 h-4 text-primary" />
                                        <span>{selectedPost.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                                        <Clock className="w-4 h-4 text-secondary" />
                                        <span>5 MIN READ</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                                        <User className="w-4 h-4 text-accent" />
                                        <span>ADMIN</span>
                                    </div>
                                </div>

                                <h2 className="text-4xl md:text-6xl font-black text-dark mb-10 leading-tight font-bangla">
                                    {selectedPost.title}
                                </h2>

                                <div className="prose prose-xl max-w-none text-dark/70 font-medium leading-[1.8] font-bangla space-y-8">
                                    {selectedPost.body.split('\n\n').map((paragraph: string, i: number) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>

                                <div className="mt-20 pt-10 border-t border-gray-100">
                                    <button
                                        onClick={() => setSelectedPost(null)}
                                        className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-all"
                                    >
                                        {language === 'bn' ? 'বন্ধ করুন' : 'Close Article'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Blog;

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import type { BlogPost } from '../context/CMSContext';
import { ArrowRight, Calendar, X, Clock, User } from 'lucide-react';

const Blog = () => {
    const { t, language } = useLanguage();
    const { state } = useCMS();
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    return (
        <section id="blog" className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-4"
                        >
                            {language === 'bn' ? 'আমাদের সংবাদ ও ব্লগ' : 'News & Stories'}
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold text-gray-900 font-bangla"
                        >
                            {language === 'bn' ? 'সমাজের ইতিবাচক পরিবর্তনের গল্প' : 'Stories of Hope & Transformation'}
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <a href="#all-blogs" className="group flex items-center gap-3 px-8 py-4 bg-white rounded-2xl text-primary-600 font-bold shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                            {language === 'bn' ? 'সবগুলো দেখুন' : 'View All Stories'}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </a>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {state.blogPosts.map((post, idx) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
                        >
                            <div className="aspect-[16/10] overflow-hidden relative">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-primary-600 uppercase tracking-tighter shadow-lg">
                                        {language === 'bn' ? 'আলোকিত ফিচার' : 'Featured'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-10 flex flex-col flex-1">
                                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6 font-medium">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-primary-500" />
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-primary-500" />
                                        <span>{language === 'bn' ? '৫ মিনিট' : '5 min read'}</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-primary-600 transition-colors font-bangla">
                                    {post.title}
                                </h3>

                                <p className="text-gray-600 mb-8 line-clamp-3 leading-relaxed flex-1">
                                    {post.excerpt}
                                </p>

                                <button
                                    onClick={() => setSelectedPost(post)}
                                    className="flex items-center gap-3 text-primary-600 font-bold hover:gap-5 transition-all duration-300"
                                >
                                    {t.blog.readMore} <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>

            {/* Premium Blog Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPost(null)}
                            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md cursor-pointer"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-white rounded-[3rem] shadow-2xl z-10 flex flex-col"
                        >
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="absolute top-8 right-8 z-20 p-3 bg-white/20 hover:bg-white backdrop-blur-xl rounded-full text-gray-900 transition-all shadow-xl border border-white/30"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="w-full h-[400px] md:h-[500px] shrink-0 relative">
                                <img
                                    src={selectedPost.image}
                                    alt={selectedPost.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                                <div className="absolute bottom-12 left-12 right-12">
                                    <div className="flex items-center gap-4 text-sm font-bold text-primary-600 mb-6 uppercase tracking-widest bg-white/80 backdrop-blur-md w-fit px-6 py-2 rounded-full shadow-sm">
                                        <Calendar className="w-4 h-4" />
                                        <span>{selectedPost.date}</span>
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight font-bangla">
                                        {selectedPost.title}
                                    </h2>
                                </div>
                            </div>

                            <div className="px-12 pb-20 pt-8">
                                <div className="max-w-3xl">
                                    <div className="flex items-center gap-4 mb-10 pb-10 border-b border-gray-100">
                                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                                            <User className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{language === 'bn' ? 'আলোকিত ফাউন্ডেশন টিম' : 'Alokito Foundation Team'}</p>
                                            <p className="text-sm text-gray-500 lowercase">{language === 'bn' ? 'অ্যাডমিন' : 'Author'}</p>
                                        </div>
                                    </div>

                                    <div className="prose prose-xl prose-primary max-w-none text-gray-700 leading-relaxed font-bangla">
                                        <p className="text-2xl text-gray-900 font-medium mb-10 leading-relaxed bg-primary-50 p-8 rounded-3xl border-l-8 border-primary-500">
                                            {selectedPost.excerpt}
                                        </p>
                                        <p className="mb-6">
                                            {language === 'bn'
                                                ? 'আমরা নিয়মিত আমাদের কার্যক্রমের খবরাখবর এবং সমাজের নানা স্তরের মানুষের গল্প তুলে ধরি। আমাদের প্রতিটি পদক্ষেপের মূল লক্ষ্য হলো একটি আলোকিত ও বাসযোগ্য পৃথিবী গড়ে তোলা। আমাদের এই যাত্রায় আপনার অংশগ্রহণ আমাদের অনুপ্রাণিত করে।'
                                                : 'We regularly share news about our activities and stories from various levels of society. The main goal of our every step is to build an enlightened and habitable world. Your participation in this journey inspires us.'}
                                        </p>
                                        <p>
                                            {language === 'bn'
                                                ? 'বিস্তারিত নিবন্ধটি শীঘ্রই আপডেট করা হবে। আমাদের সাথে যুক্ত থাকতে নিয়মিত ব্লগ ভিজিট করুন।'
                                                : 'The detailed article will be updated soon. Visit our blog regularly to stay connected with us.'}
                                        </p>
                                    </div>
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

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { X, Maximize2, Camera, ArrowRight } from 'lucide-react';
import { gallery } from '../data/projects';

const Gallery = () => {
    const { language } = useLanguage();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section id="gallery" className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6 border border-primary/10"
                        >
                            {language === 'bn' ? 'গ্যালারি' : 'Visual Impact'}
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-black text-dark font-bangla leading-tight">
                            {language === 'bn' ? 'আমাদের কার্যক্রমের কিছু মুহূর্ত' : 'Capturing the Essence of Our Work'}
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {gallery.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => setSelectedImage(item.image)}
                            className={`group relative rounded-[3rem] overflow-hidden bg-gray-100 cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-700 ${idx === 0 ? 'md:col-span-8 aspect-[16/9]' : 'md:col-span-4 aspect-square'
                                }`}
                        >
                            <img
                                src={item.image}
                                alt={language === 'bn' ? item.captionBn : item.captionEn}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">
                                            {language === 'bn' ? 'কার্যক্রম' : 'Activity'}
                                        </p>
                                        <p className="text-white font-bold text-2xl font-bangla translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            {language === 'bn' ? item.captionBn : item.captionEn}
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-dark scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                                        <Maximize2 className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* CTA Card in Bento Grid */}
                    <div className="md:col-span-12 lg:col-span-4 bg-primary rounded-[3rem] p-10 flex flex-col justify-between group cursor-pointer hover:bg-primary-600 transition-colors duration-500 min-h-[300px]">
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                            <Camera className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-white font-black text-3xl mb-4 font-bangla leading-tight">
                                {language === 'bn' ? 'সব মুহূর্ত দেখুন' : 'Explore All Moments'}
                            </h3>
                            <div className="flex items-center gap-2 text-white/80 font-bold text-sm uppercase tracking-widest group-hover:text-white transition-colors">
                                {language === 'bn' ? 'বিস্তারিত' : 'View Full Gallery'}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Immersive Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12"
                    >
                        <button className="absolute top-10 right-10 p-4 bg-white/10 hover:bg-white text-white hover:text-dark transition-all rounded-full z-[110]">
                            <X className="w-8 h-8" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={selectedImage}
                            className="max-w-full max-h-full rounded-[2.5rem] object-contain shadow-2xl shadow-primary/20"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;

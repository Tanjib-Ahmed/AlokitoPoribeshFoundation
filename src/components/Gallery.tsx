import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { X, Maximize2, Camera } from 'lucide-react';

const Gallery = () => {
    const { language } = useLanguage();
    const { state } = useCMS();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section id="gallery" className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-1.5 bg-secondary rounded-full" />
                            <span className="text-primary font-black uppercase tracking-[0.2em] text-sm">
                                {language === 'bn' ? 'গ্যালারি' : 'Our Gallery'}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-dark font-bangla">
                            {language === 'bn' ? 'কার্যক্রমের কিছু মুহূর্ত' : 'Capturing Our Best Moments'}
                        </h2>
                    </div>
                    <div className="hidden lg:block text-right">
                        <div className="flex items-center gap-4 text-primary font-bold">
                            <Camera className="w-6 h-6" />
                            <span className="text-sm uppercase tracking-widest">{state.gallery.length} PHOTOS</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {state.gallery.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => setSelectedImage(item.image)}
                            className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-gray-100 cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
                        >
                            <img
                                src={item.image}
                                alt={language === 'bn' ? item.captionBn : item.captionEn}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                <Maximize2 className="absolute top-8 right-8 text-white w-6 h-6 opacity-0 group-hover:opacity-100 transition-all delay-100" />
                                <p className="text-white font-bold text-xl font-bangla transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    {language === 'bn' ? item.captionBn : item.captionEn}
                                </p>
                            </div>
                        </motion.div>
                    ))}
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
                        <button className="absolute top-8 right-8 p-4 bg-white/10 hover:bg-white text-dark hover:text-dark transition-all rounded-full z-[110]">
                            <X className="w-8 h-8" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={selectedImage}
                            className="max-w-full max-h-full rounded-3xl object-contain shadow-2xl shadow-primary/20"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;

import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
    const { language } = useLanguage();
    const { state } = useCMS();
    const [selectedId, setSelectedId] = useState<number | string | null>(null);

    const selectedImage = state.gallery.find(img => img.id === selectedId);

    const handleNext = () => {
        const currentIndex = state.gallery.findIndex(img => img.id === selectedId);
        const nextIndex = (currentIndex + 1) % state.gallery.length;
        setSelectedId(state.gallery[nextIndex].id);
    };

    const handlePrev = () => {
        const currentIndex = state.gallery.findIndex(img => img.id === selectedId);
        const prevIndex = (currentIndex - 1 + state.gallery.length) % state.gallery.length;
        setSelectedId(state.gallery[prevIndex].id);
    };

    return (
        <section id="gallery" className="py-24 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-4"
                        >
                            {language === 'bn' ? 'আমাদের চিত্রশালা' : 'Visual Stories'}
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold text-gray-900 font-bangla"
                        >
                            {language === 'bn' ? 'কাজের মাধ্যমে পরিবর্তনের খণ্ডচিত্র' : 'Moments of Impact & Change'}
                        </motion.h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {state.gallery.map((image, idx) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => setSelectedId(image.id)}
                            className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden cursor-pointer bg-gray-100"
                        >
                            <img
                                src={image.src}
                                alt={language === 'bn' ? image.captionBn : image.captionEn}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                <Maximize2 className="absolute top-6 right-6 text-white w-6 h-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
                                <p className="text-white font-bold font-bangla text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                    {language === 'bn' ? image.captionBn : image.captionEn}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedId && selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                    >
                        <button
                            onClick={() => setSelectedId(null)}
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <button
                            onClick={handlePrev}
                            className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors p-2"
                        >
                            <ChevronLeft className="w-10 h-10" />
                        </button>

                        <button
                            onClick={handleNext}
                            className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors p-2"
                        >
                            <ChevronRight className="w-10 h-10" />
                        </button>

                        <motion.div
                            layoutId={String(selectedId)}
                            className="max-w-5xl w-full flex flex-col items-center"
                        >
                            <img
                                src={selectedImage.src}
                                alt="Full view"
                                className="max-h-[70vh] w-auto rounded-3xl shadow-2xl"
                            />
                            <div className="mt-8 text-center">
                                <p className="text-2xl font-bold text-white font-bangla mb-2">
                                    {language === 'bn' ? selectedImage.captionBn : selectedImage.captionEn}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';

const Gallery = () => {
    const { t, language } = useLanguage();
    const { state } = useCMS();

    const images = state.gallery;

    return (
        <section id="gallery" className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center gap-2 mb-4">
                        <span className="w-8 h-1 bg-brand-500 rounded-full" />
                        <span className="text-brand-600 font-bold uppercase tracking-wider text-sm">
                            Gallery
                        </span>
                        <span className="w-8 h-1 bg-brand-500 rounded-full" />
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-gray-900"
                    >
                        {t.gallery.title}
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {images.map((img, idx) => (
                        <motion.div
                            key={img.id || idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-brand-100"
                        >
                            <img
                                src={img.src}
                                alt={language === 'bn' ? img.captionBn : img.captionEn}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <h3 className="text-white font-bold text-lg md:text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {language === 'bn' ? img.captionBn : img.captionEn}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;

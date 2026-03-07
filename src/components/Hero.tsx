import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Leaf, Users } from 'lucide-react';

const Hero = () => {
    const { language } = useLanguage();

    return (
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-dark">
            {/* Immersive Background Overlay */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&auto=format&fit=crop"
                    alt="Nature background"
                    className="w-full h-full object-cover opacity-40 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full pt-20">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 mb-8 px-4 py-2 bg-primary/20 backdrop-blur-md rounded-full border border-primary/30 w-fit"
                    >
                        <Leaf className="text-secondary w-5 h-5" />
                        <span className="text-secondary font-bold text-xs md:text-sm uppercase tracking-widest">
                            {language === 'bn' ? 'একটি পরিবেশবান্ধব উদ্যোগ' : 'Eco-conscious Foundation'}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-bold text-white mb-8 leading-[1.15] font-bangla"
                    >
                        {language === 'bn'
                            ? 'একটি সবুজ, পরিচ্ছন্ন ও মানবিক সমাজ গড়ার লক্ষ্যে'
                            : 'Building a green, clean and humane society together'}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-2xl text-white/70 mb-12 leading-relaxed max-w-2xl font-light"
                    >
                        {language === 'bn'
                            ? 'প্রকৃতিকে বাঁচিয়ে রেখেই আমরা গড়ব আগামীর সুন্দর পৃথিবী। আলোকিত পরিবেশ ফাউন্ডেশন সবসময় আপনার পাশে আছে।'
                            : 'Protecting nature is the only way to ensure a beautiful future. Alokito Poribesh Foundation is always by your side.'}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-5"
                    >
                        <a href="#about" className="btn-primary group">
                            {language === 'bn' ? 'আরও জানুন' : 'Learn More'}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="#volunteer" className="btn-secondary group">
                            {language === 'bn' ? 'আমাদের সঙ্গে যোগ দিন' : 'Join Us'}
                            <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-1.5 h-1.5 bg-secondary rounded-full"
                    />
                </div>
            </motion.div>

            {/* Decorative Element */}
            <div className="absolute right-0 bottom-0 w-1/3 h-full pointer-events-none hidden lg:block">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-20 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]" />
            </div>
        </section>
    );
};

export default Hero;

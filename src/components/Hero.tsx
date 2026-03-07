import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { ArrowRight, HeartHandshake } from 'lucide-react';

const Hero = () => {
    const { t, language } = useLanguage();
    const { state } = useCMS();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
        },
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary-900 text-white"
        >
            {/* Background Image with High-End Gradient */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                style={{
                    backgroundImage: state.branding.heroImageUrl.includes('url')
                        ? state.branding.heroImageUrl
                        : `url('${state.branding.heroImageUrl}')`
                }}
            />
            {/* Premium Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary-900/80 via-primary-900/40 to-primary-900/90 z-0" />

            <div className="max-w-6xl relative z-10 mx-auto px-4 md:px-6 pt-20 flex flex-col items-center text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto flex flex-col items-center"
                >
                    <motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                        <HeartHandshake className="w-5 h-5 text-secondary" />
                        <span className="text-sm md:text-base font-bold tracking-wide uppercase text-white/90">
                            {t.hero.subtitle}
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[1.1] font-bangla tracking-tight"
                    >
                        {t.hero.title}
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-3xl text-white/80 mb-12 max-w-3xl font-light leading-relaxed font-sans"
                    >
                        {t.hero.description}
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                        <a
                            href="#activities"
                            className="inline-flex items-center justify-center gap-3 bg-primary-500 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-primary-600 transition-all shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-1 group"
                        >
                            {t.hero.btnActivities}
                            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-xl hover:-translate-y-1"
                        >
                            {language === 'bn' ? 'স্বেচ্ছাসেবক হোন' : 'Become Volunteer'}
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Premium Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-white overflow-hidden">
                    <motion.div
                        animate={{ y: [0, 64, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-full h-1/2 bg-white"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;

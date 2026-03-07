import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { ArrowRight, HeartHandshake } from 'lucide-react';

const Hero = () => {
    const { t } = useLanguage();
    const { state } = useCMS();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section
            id="home"
            className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-brand-900 text-white"
        >
            {/* Background with gradient and subtle texture/shapes */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    background: state.branding.heroImageUrl.includes('url') ? state.branding.heroImageUrl : state.branding.heroImageUrl,
                    backgroundImage: state.branding.heroImageUrl.includes('url') ? state.branding.heroImageUrl : 'none'
                }}
            />
            {/* Dark overlay for readability if using photos */}
            <div className="absolute inset-0 bg-brand-900/60 z-0 mix-blend-multiply" />

            {/* Decorative circles */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-300/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-brand-600/30 rounded-full blur-3xl pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 pt-20 flex flex-col items-center text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto flex flex-col items-center"
                >
                    <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                        <HeartHandshake className="w-5 h-5 text-brand-100" />
                        <span className="text-sm md:text-base font-medium text-brand-50">
                            {t.hero.subtitle}
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                    >
                        {t.hero.title}
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-2xl text-brand-50 mb-10 max-w-2xl font-light"
                    >
                        {t.hero.description}
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <a
                            href="#about"
                            className="inline-flex items-center justify-center gap-2 bg-white text-brand-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-50 transition-colors shadow-lg hover:shadow-xl"
                        >
                            {t.hero.btnAbout}
                        </a>
                        <a
                            href="#activities"
                            className="inline-flex items-center justify-center gap-2 bg-brand-600/30 hover:bg-brand-600/50 backdrop-blur-md border border-brand-300/30 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors"
                        >
                            {t.hero.btnActivities}
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-widest text-brand-100/70">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-5 h-8 border-2 border-brand-100/50 rounded-full flex justify-center p-1"
                >
                    <div className="w-1 h-2 bg-brand-100/70 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;

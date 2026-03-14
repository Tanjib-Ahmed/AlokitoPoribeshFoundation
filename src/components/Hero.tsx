import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Leaf, Users, CheckCircle } from 'lucide-react';
import { branding } from '../data/config';
import { impactStats } from '../data/impact';

const Hero = () => {
    const { language } = useLanguage();

    // Get the first impact stat for the floating card (Trees Planted)
    const treeStat = impactStats.find(s => s.icon === 'Leaf') || impactStats[0];

    return (
        <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050A06]">
            {/* Immersive Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&auto=format&fit=crop"
                    alt="Nature conservation"
                    className="w-full h-full object-cover opacity-30 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050A06]/60 to-[#050A06]" />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10 w-full">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Content Side */}
                    <div className="lg:w-3/5 text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
                        >
                            <Leaf className="w-4 h-4 text-primary" />
                            <span className="text-primary text-xs font-bold uppercase tracking-widest">
                                {language === 'bn' ? branding.taglineBn : branding.taglineEn}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-8xl font-black text-white leading-[1.1] mb-8 font-bangla"
                        >
                            {language === 'bn'
                                ? 'একটি সবুজ ও মানবিক সমাজ গড়ার লক্ষ্যে'
                                : 'Where Small Actions Lead to Big Impact'}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl leading-relaxed"
                        >
                            {language === 'bn'
                                ? 'প্রকৃতিকে বাঁচিয়ে রেখেই আমরা গড়ব আগামীর সুন্দর পৃথিবী। আলোকিত পরিবেশ ফাউন্ডেশন সবসময় আপনার পাশে আছে।'
                                : 'Helping nature thrive through sustainable action and community empowerment. Join us in building a greener future.'}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <a href="#about" className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-600 transition-all shadow-xl shadow-primary/20 flex items-center gap-2 group">
                                {language === 'bn' ? 'আরও জানুন' : 'Learn More'}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="#contact" className="px-8 py-4 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                {language === 'bn' ? 'আমাদের সঙ্গে যোগ দিন' : 'Join Our Mission'}
                            </a>
                        </motion.div>
                    </div>

                    {/* Visual Side / Floating Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="lg:w-2/5 relative"
                    >
                        <div className="relative z-10 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 shadow-2xl overflow-hidden group">
                            {/* Decorative blur */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[80px]" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                                        <CheckCircle className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-xl">
                                            {language === 'bn' ? 'আমাদের অর্জন' : 'Impact Tracked'}
                                        </h3>
                                        <p className="text-white/40 text-sm">Real-time status</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5 group-hover:bg-white/10 transition-colors duration-500">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-white/60 font-medium text-sm">
                                                {language === 'bn' ? treeStat.labelBn : treeStat.labelEn}
                                            </span>
                                            <span className="text-3xl font-black text-white">
                                                {treeStat.value}
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '85%' }}
                                                transition={{ delay: 1, duration: 1.5 }}
                                                className="h-full bg-primary"
                                            />
                                        </div>
                                    </div>

                                    <img
                                        src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=600&fit=crop"
                                        alt="Activity"
                                        className="w-full aspect-[4/3] object-cover rounded-3xl"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Floating mini stats */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -bottom-6 -left-6 bg-accent p-4 rounded-2xl shadow-2xl z-20 flex items-center gap-3"
                        >
                            <div className="w-10 h-10 bg-dark/20 rounded-lg flex items-center justify-center text-dark">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-wider font-black text-dark/60 leading-none mb-1">Volunteers</p>
                                <p className="text-lg font-black text-dark leading-none">120+</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Eye, Leaf, ArrowUpRight } from 'lucide-react';
import { about, branding } from '../data/config';

const About = () => {
    const { language } = useLanguage();

    return (
        <section id="about" className="py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                {/* Header Section */}
                <div className="max-w-3xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-primary text-xs font-bold uppercase tracking-widest">
                            {language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Our Foundation'}
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-dark leading-tight font-bangla"
                    >
                        {language === 'bn' ? about.titleBn : about.titleEn}
                    </motion.h2>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Large Content Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-8 bg-primary-50 rounded-[3rem] p-10 md:p-16 relative overflow-hidden group"
                    >
                        <div className="relative z-10">
                            <p className="text-xl md:text-2xl text-primary-900/80 leading-relaxed font-medium mb-12">
                                {language === 'bn' ? about.descriptionBn : about.descriptionEn}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                                        <Leaf className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-950">
                                        {language === 'bn' ? 'আমাদের লক্ষ্য' : 'Our Mission'}
                                    </h3>
                                    <p className="text-primary-900/60 leading-relaxed">
                                        {language === 'bn' ? about.missionBn : about.missionEn}
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-sm">
                                        <Eye className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-950">
                                        {language === 'bn' ? 'আমাদের ভিশন' : 'Our Vision'}
                                    </h3>
                                    <p className="text-primary-900/60 leading-relaxed">
                                        {language === 'bn' ? about.visionBn : about.visionEn}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                    </motion.div>

                    {/* Image & Experience Card */}
                    <div className="md:col-span-4 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-accent rounded-[3rem] p-8 aspect-square flex flex-col justify-between relative overflow-hidden group"
                        >
                            <div className="relative z-10">
                                <span className="text-6xl md:text-8xl font-black text-dark/90 leading-none block mb-2">
                                    {branding.experienceYearsEn}
                                </span>
                                <span className="text-xl font-bold text-dark/60 uppercase tracking-widest block">
                                    {language === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Years of Impact'}
                                </span>
                            </div>
                            <div className="relative z-10 flex justify-end">
                                <div className="w-14 h-14 bg-dark rounded-full flex items-center justify-center text-accent group-hover:rotate-45 transition-transform duration-500">
                                    <ArrowUpRight className="w-7 h-7" />
                                </div>
                            </div>
                            {/* Decorative blur */}
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -ml-16 -mb-16" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-[3rem] overflow-hidden aspect-[4/3] relative"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=800&fit=crop"
                                alt="Alokito Poribesh Foundation"
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

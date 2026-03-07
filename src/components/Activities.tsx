import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import * as LucideIcons from 'lucide-react';

const Activities = () => {
    const { language } = useLanguage();
    const { state } = useCMS();

    return (
        <section id="work" className="py-24 bg-white relative overflow-hidden">
            {/* Top Wave Decoration */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent opacity-50" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.3em] mb-4"
                    >
                        {language === 'bn' ? 'আমরা কি করি' : 'Our Activities'}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-dark mb-6 font-bangla"
                    >
                        {language === 'bn' ? 'পরিবেশ রক্ষায় আমাদের নিরন্তর প্রচেষ্টা' : 'Our Constant Efforts to Protect Nature'}
                    </motion.h2>
                    <div className="w-24 h-1.5 bg-accent mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {state.activities.map((activity, idx) => {
                        const IconComponent = (LucideIcons as any)[activity.icon] || LucideIcons.Zap;
                        return (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 rounded-[2.5rem] bg-background border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                            >
                                <div className="mb-8 w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    <IconComponent className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-dark mb-4 font-bangla group-hover:text-primary transition-colors">
                                    {language === 'bn' ? activity.titleBn : activity.titleEn}
                                </h3>
                                <p className="text-dark/60 leading-relaxed font-medium">
                                    {language === 'bn' ? activity.descriptionBn : activity.descriptionEn}
                                </p>

                                <div className="mt-8 pt-8 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                        {language === 'bn' ? 'আরও পড়ুন' : 'Read More'}
                                        <LucideIcons.ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Activities;

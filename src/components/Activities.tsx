import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import * as LucideIcons from 'lucide-react';
import { activities } from '../data/projects';

const Activities = () => {
    const { language } = useLanguage();

    return (
        <section id="work" className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6 border border-primary/10"
                        >
                            {language === 'bn' ? 'আমরা কী করি' : 'Our Strategic Activities'}
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black text-dark font-bangla leading-tight"
                        >
                            {language === 'bn' ? 'পরিবেশ রক্ষায় আমাদের নিরন্তর প্রচেষ্টা' : 'Turning Vision Into Verifiable Action'}
                        </motion.h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {activities.map((activity, idx) => {
                        const IconComponent = (LucideIcons as any)[activity.icon] || LucideIcons.Zap;
                        return (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-10 rounded-[3rem] bg-primary-50/50 border border-transparent hover:border-primary/10 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col justify-between aspect-[4/5]"
                            >
                                <div>
                                    <div className="mb-10 w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        <IconComponent className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-dark mb-4 font-bangla group-hover:text-primary transition-colors">
                                        {language === 'bn' ? activity.titleBn : activity.titleEn}
                                    </h3>
                                    <p className="text-dark/60 leading-relaxed font-medium">
                                        {language === 'bn' ? activity.descriptionBn : activity.descriptionEn}
                                    </p>
                                </div>

                                <div className="mt-8 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                                    {language === 'bn' ? 'আরও পড়ুন' : 'Learn More'}
                                    <LucideIcons.ArrowUpRight className="w-4 h-4" />
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

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { Eye, Leaf } from 'lucide-react';

const About = () => {
    const { language } = useLanguage();
    const { state } = useCMS();
    const { about } = state;

    const pillars = [
        {
            icon: <Leaf className="w-8 h-8 text-primary" />,
            titleBn: 'আমাদের লক্ষ্য',
            titleEn: 'Our Mission',
            contentBn: about.missionBn,
            contentEn: about.missionEn,
            color: 'bg-primary/5'
        },
        {
            icon: <Eye className="w-8 h-8 text-secondary" />,
            titleBn: 'আমাদের ভিশন',
            titleEn: 'Our Vision',
            contentBn: about.visionBn,
            contentEn: about.visionEn,
            color: 'bg-secondary/10'
        }
    ];

    return (
        <section id="about" className="py-24 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Visual Area */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=800&fit=crop"
                                alt="Alokito Poribesh Foundation Activities"
                                className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
                            />
                            {/* Experience Badge */}
                            <div className="absolute bottom-10 right-10 bg-accent p-6 rounded-3xl shadow-2xl flex flex-col items-center">
                                <span className="text-4xl font-black text-dark leading-none">১০+</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-dark/70 mt-1">
                                    {language === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Years Experience'}
                                </span>
                            </div>
                        </div>
                        {/* Decorative Background */}
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
                    </motion.div>

                    {/* Content Area */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-1.5 bg-primary rounded-full" />
                            <span className="text-primary font-black uppercase tracking-[0.2em] text-sm">
                                {language === 'bn' ? 'আমরা কারা?' : 'Who We Are'}
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-dark mb-8 leading-tight font-bangla">
                            {language === 'bn' ? about.titleBn : about.titleEn}
                        </h2>

                        <p className="text-lg text-dark/70 mb-12 leading-relaxed">
                            {language === 'bn' ? about.descriptionBn : about.descriptionEn}
                        </p>

                        <div className="grid grid-cols-1 gap-6">
                            {pillars.map((pillar, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.2 }}
                                    className={`flex gap-6 p-8 rounded-[2rem] ${pillar.color} border border-white/50 backdrop-blur-sm hover:translate-x-2 transition-transform duration-300`}
                                >
                                    <div className="shrink-0 w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                                        {pillar.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-dark mb-2 font-bangla">
                                            {language === 'bn' ? pillar.titleBn : pillar.titleEn}
                                        </h3>
                                        <p className="text-dark/60 leading-relaxed font-medium">
                                            {language === 'bn' ? pillar.contentBn : pillar.contentEn}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;

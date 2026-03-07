import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import * as LucideIcons from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const CountUp = ({ value, duration = 2 }: { value: string; duration?: number }) => {
    const [count, setCount] = useState(0);
    const target = parseInt(value.replace(/\D/g, '')) || 0;
    const suffix = value.replace(/[0-9]/g, '');
    const countRef = useRef<HTMLSpanElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) observer.observe(countRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const end = target;
        const stepTime = Math.abs(Math.floor(duration * 1000 / end));
        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, stepTime);

        return () => clearInterval(timer);
    }, [isVisible, target, duration]);

    return <span ref={countRef}>{count}{suffix}</span>;
};

const Impact = () => {
    const { language } = useLanguage();
    const { state } = useCMS();

    return (
        <section className="py-24 bg-primary-900 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-secondary text-sm font-bold uppercase tracking-widest mb-4"
                    >
                        {language === 'bn' ? 'আমাদের অর্জন' : 'Our Impact'}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white font-bangla"
                    >
                        {language === 'bn' ? 'আলোকিত আগামীর লক্ষ্যে আমাদের পথচলা' : 'Driving Change for a Brighter Future'}
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {state.impactStats.map((stat, idx) => {
                        const IconComponent = (LucideIcons as any)[stat.icon] || LucideIcons.Zap;
                        return (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className="mb-6 w-16 h-16 rounded-2xl bg-primary-500/20 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-500">
                                    <IconComponent className="w-8 h-8" />
                                </div>
                                <div className="text-4xl font-bold text-white mb-2 font-sans">
                                    <CountUp value={stat.value} />
                                </div>
                                <div className="text-lg text-white/60 font-medium font-bangla">
                                    {language === 'bn' ? stat.labelBn : stat.labelEn}
                                </div>

                                {/* Hover Gradient Effect */}
                                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Impact;

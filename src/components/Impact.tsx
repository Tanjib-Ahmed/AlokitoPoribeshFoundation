import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import * as LucideIcons from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const CountUp = ({ value, duration = 2 }: { value: string; duration?: number }) => {
    const { language } = useLanguage();
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLSpanElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Helpers for digit conversion
    const bnToEn = (str: string) => str.replace(/[০-৯]/g, d => "০১২৩৪৫৬৭৮৯".indexOf(d).toString());
    const enToBn = (num: number | string) => num.toString().replace(/[0-9]/g, d => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);

    const target = parseInt(bnToEn(value).replace(/\D/g, '')) || 0;
    const suffix = value.replace(/[০-৯0-9]/g, '');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );

        if (countRef.current) observer.observe(countRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible || target <= 0) return;

        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const currentCount = Math.floor(progress * target);

            setCount(currentCount);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, target, duration]);

    const displayCount = language === 'bn' ? enToBn(count) : count;

    return <span ref={countRef}>{displayCount}{suffix}</span>;
};

const Impact = () => {
    const { language } = useLanguage();
    const { state } = useCMS();

    return (
        <section id="impact" className="py-24 bg-primary-950 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-16 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-secondary text-xs font-black uppercase tracking-[0.3em] mb-4"
                    >
                        {language === 'bn' ? 'আমাদের অর্জন' : 'Our Impact'}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-white font-bangla leading-tight"
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
                                <div className="mb-6 w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-500">
                                    <IconComponent className="w-8 h-8" />
                                </div>
                                <div className="text-4xl font-black text-white mb-2 font-sans tracking-tight">
                                    <CountUp value={stat.value} />
                                </div>
                                <div className="text-lg text-white/60 font-medium font-bangla">
                                    {language === 'bn' ? stat.labelBn : stat.labelEn}
                                </div>

                                {/* Hover Gradient Effect */}
                                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Impact;

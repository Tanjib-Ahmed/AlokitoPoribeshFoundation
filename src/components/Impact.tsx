import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import * as LucideIcons from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { impactStats } from '../data/impact';

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

    return (
        <section id="impact" className="py-32 bg-[#050A06] relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6 border border-white/10"
                    >
                        {language === 'bn' ? 'আমাদের অর্জন' : 'Our Tangible Impact'}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-white font-bangla leading-tight max-w-4xl mx-auto"
                    >
                        {language === 'bn' ? 'আলোকিত আগামীর লক্ষ্যে আমাদের পথচলা' : 'Measurable Results That Change Lives'}
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {impactStats.map((stat, idx) => {
                        const IconComponent = (LucideIcons as any)[stat.icon] || LucideIcons.Zap;
                        return (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 flex flex-col items-center text-center"
                            >
                                <div className="mb-8 w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                                    <IconComponent className="w-8 h-8" />
                                </div>
                                <div className="text-5xl font-black text-white mb-3 tracking-tighter">
                                    <CountUp value={stat.value} />
                                </div>
                                <div className="text-lg text-white/50 font-bold uppercase tracking-widest text-sm">
                                    {language === 'bn' ? stat.labelBn : stat.labelEn}
                                </div>

                                {/* Hover Gradient Effect */}
                                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Visual Impact Statement (Carex sub-card pattern) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-1 bg-gradient-to-r from-primary/30 via-white/10 to-primary/30 rounded-[3rem]"
                >
                    <div className="bg-[#050A06] rounded-[2.9rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="max-w-xl text-center md:text-left">
                            <h3 className="text-3xl md:text-4xl font-black text-white mb-6 font-bangla">
                                {language === 'bn'
                                    ? 'একটি সবুজ ও বাসযোগ্য পৃথিবী উপহার দেয়াই আমাদের সংকল্প।'
                                    : 'Our commitment is to leave a greener planet for the next generation.'}
                            </h3>
                            <p className="text-white/60 text-lg">
                                {language === 'bn'
                                    ? 'আমরা বিশ্বাস করি প্রতিটি ছোট পদক্ষেপ বড় ইতিবাচক পরিবর্তনের সূচনা করতে পারে।'
                                    : 'We believe that every small step can trigger a massive wave of positive change.'}
                            </p>
                        </div>
                        <a href="#contact" className="px-10 py-5 bg-primary text-white font-black rounded-full hover:bg-primary-600 transition-all shadow-xl shadow-primary/20 whitespace-nowrap">
                            {language === 'bn' ? 'আজই যুক্ত হোন' : 'Get Involved Today'}
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Impact;

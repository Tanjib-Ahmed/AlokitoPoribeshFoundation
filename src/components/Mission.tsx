import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { Target, ShieldCheck, Zap } from 'lucide-react';

const Mission = () => {
    const { language } = useLanguage();
    const { state } = useCMS();

    const pillars = [
        {
            icon: <Target className="w-8 h-8 text-primary-500" />,
            titleBn: 'আমাদের লক্ষ্য',
            titleEn: 'Our Goal',
            descBn: 'একটি পরিচ্ছন্ন ও পরিবেশবান্ধব সমাজ গড়ে তোলা।',
            descEn: 'Building a clean and environmentally friendly society.'
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-primary-500" />,
            titleBn: 'মানবিক মূল্যবোধ',
            titleEn: 'Human Values',
            descBn: 'অসহায়দের সেবা ও মানবিক সহায়তা প্রদান।',
            descEn: 'Providing service and humanitarian aid to the helpless.'
        },
        {
            icon: <Zap className="w-8 h-8 text-primary-500" />,
            titleBn: 'সচেতনতা',
            titleEn: 'Awareness',
            descBn: 'পরিবেশ ও সামাজিক সুরক্ষা নিশ্চিত করতে জনসচেতনা বৃদ্ধি।',
            descEn: 'Enhancing public awareness for environment and social safety.'
        }
    ];

    return (
        <section id="mission" className="py-24 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Content Area */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2"
                    >
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="w-12 h-1 bg-primary-500 rounded-full" />
                            <span className="text-primary-600 font-bold uppercase tracking-widest text-sm">
                                {language === 'bn' ? 'আমাদের বার্তা' : 'Our Message'}
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight font-bangla">
                            {language === 'bn' ? 'একটি পরিচ্ছন্ন ও মানবিক সমাজ আমাদের লক্ষ্য' : 'A Clean and Humane Society is Our Mission'}
                        </h2>

                        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                            {language === 'bn' ? 'আমরা একটি পরিচ্ছন্ন ও মানবিক সমাজ গড়ে তুলতে কাজ করছি।' : 'We are working to build a clean and humane society.'}
                        </p>

                        <div className="grid grid-cols-1 gap-8">
                            {pillars.map((pillar, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="flex gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="shrink-0 w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                                        {pillar.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 font-bangla">
                                            {language === 'bn' ? pillar.titleBn : pillar.titleEn}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {language === 'bn' ? pillar.descBn : pillar.descEn}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Visual Area */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="relative z-10 aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                            <img
                                src={state.about.imageUrl}
                                alt="Mission objective"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay Card */}
                            <div className="absolute bottom-8 left-8 right-8 p-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <span className="text-xl font-bold text-gray-900 font-bangla">তাকদীরে বিশ্বাস</span>
                                </div>
                                <p className="text-sm text-gray-700 italic">"পরিবেশের যত্ন নেওয়া আমাদের ধর্মীয় ও সামাজিক দায়িত্ব।"</p>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-100 rounded-full blur-3xl -z-10 animate-pulse" />
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/20 rounded-full blur-2xl -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Mission;

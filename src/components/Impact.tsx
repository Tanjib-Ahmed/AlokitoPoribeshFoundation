import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { motion } from 'framer-motion';
import { Leaf, Users, Heart, CheckCircle } from 'lucide-react';

const iconMap: Record<string, any> = {
    Leaf,
    Users,
    Heart,
    CheckCircle,
};

const Impact = () => {
    const { language } = useLanguage();
    const { state } = useCMS();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section className="py-20 bg-primary-50">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-bangla text-primary-800 mb-4">
                        {language === 'bn' ? 'এক নজরে আমাদের প্রভাব' : 'Our Impact at a Glance'}
                    </h2>
                    <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
                >
                    {state.impactStats.map((stat) => {
                        const Icon = iconMap[stat.icon] || Leaf;
                        return (
                            <motion.div
                                key={stat.id}
                                variants={itemVariants}
                                className="flex flex-col items-center"
                            >
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary-600 mb-4 transition-transform hover:scale-110 duration-300">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <span className="text-3xl md:text-4xl font-bold text-primary-900 mb-2 font-sans">
                                    {stat.value}
                                </span>
                                <span className="text-sm md:text-base font-medium text-primary-700 font-bangla">
                                    {language === 'bn' ? stat.labelBn : stat.labelEn}
                                </span>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Impact;

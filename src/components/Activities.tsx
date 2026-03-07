import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import * as LucideIcons from 'lucide-react';

const Activities = () => {
    const { t } = useLanguage();
    const { state } = useCMS();

    // Helper array to keep the text localized while fetching icons/colors from CMS
    const activitiesData = [
        { title: t.activities.treePlantation, delay: 0.1 },
        { title: t.activities.cleaning, delay: 0.2 },
        { title: t.activities.winterClothes, delay: 0.3 },
        { title: t.activities.helpingPoor, delay: 0.4 },
        { title: t.activities.education, delay: 0.5 },
    ];

    // Merge localized text with dynamic CMS properties
    const activities = state.activities.map((act, index) => {
        const IconComponent = (LucideIcons as any)[act.icon] || LucideIcons.Leaf;
        return {
            ...act,
            title: activitiesData[index]?.title || act.id,
            delay: activitiesData[index]?.delay || 0,
            icon: <IconComponent className="w-8 h-8" />
        };
    });

    return (
        <section id="activities" className="py-20 md:py-32 bg-slate-50 relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center gap-2 mb-4">
                        <span className="w-8 h-1 bg-brand-500 rounded-full" />
                        <span className="text-brand-600 font-bold uppercase tracking-wider text-sm">
                            What We Do
                        </span>
                        <span className="w-8 h-1 bg-brand-500 rounded-full" />
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-gray-900"
                    >
                        {t.activities.title}
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {activities.map((activity) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: activity.delay, duration: 0.5 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300"
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border ${activity.colorClass}`}>
                                {activity.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{activity.title}</h3>
                            <p className="text-gray-500 leading-relaxed font-light">
                                আমরা আন্তরিকতার সাথে এই কার্যক্রম পরিচালনা করে আসছি, যাতে সমাজের মানুষের উপকার হয়।
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Activities;

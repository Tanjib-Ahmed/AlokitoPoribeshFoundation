import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import * as LucideIcons from 'lucide-react';

const Activities = () => {
    const { t, language } = useLanguage();
    const { state } = useCMS();

    // Helper array for localization
    const activitiesData = [
        { title: t.activities.treePlantation, delay: 0.1 },
        { title: t.activities.cleaning, delay: 0.2 },
        { title: t.activities.winterClothes, delay: 0.3 },
        { title: t.activities.helpingPoor, delay: 0.4 },
        { title: t.activities.education, delay: 0.5 },
    ];

    const activities = state.activities.map((act, index) => {
        const IconComponent = (LucideIcons as any)[act.icon] || LucideIcons.Leaf;
        return {
            ...act,
            title: activitiesData[index]?.title || act.id,
            delay: activitiesData[index]?.delay || 0,
            icon: <IconComponent className="w-10 h-10" />
        };
    });

    return (
        <section id="activities" className="py-24 bg-background relative">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center gap-3 mb-4"
                    >
                        <span className="w-12 h-1 bg-primary-500 rounded-full" />
                        <span className="text-primary-600 font-bold uppercase tracking-widest text-sm">
                            {language === 'bn' ? 'আমরা যা করি' : 'What We Do'}
                        </span>
                        <span className="w-12 h-1 bg-primary-500 rounded-full" />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 font-bangla"
                    >
                        {t.activities.title}
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activities.map((activity) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: activity.delay, duration: 0.6 }}
                            whileHover={{ y: -10 }}
                            className="group bg-white rounded-[2.5rem] p-10 shadow-sm hover:shadow-2xl border border-gray-100 transition-all duration-500"
                        >
                            <div className="w-20 h-20 rounded-2xl bg-primary-50 flex items-center justify-center mb-8 border border-primary-100 text-primary-600 group-hover:bg-primary-500 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                                {activity.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-bangla">{activity.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {language === 'bn'
                                    ? 'আমরা আন্তরিকতার সাথে এই কার্যক্রম পরিচালনা করে আসছি, যাতে সমাজের মানুষের উপকার হয়।'
                                    : 'We are conducting these activities with sincerity to benefit the people of the society.'}
                            </p>

                            <div className="mt-8 flex items-center gap-2 text-primary-600 font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                                {language === 'bn' ? 'বিস্তারিত দেখুন' : 'Learn More'}
                                <LucideIcons.ArrowRight className="w-4 h-4" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Activities;

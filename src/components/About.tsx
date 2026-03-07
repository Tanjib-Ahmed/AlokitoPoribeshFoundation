import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { Users, Target, Heart } from 'lucide-react';

const About = () => {
    const { t } = useLanguage();
    const { state } = useCMS();

    const features = [
        {
            icon: <Users className="w-6 h-6 text-brand-500" />,
            title: 'মানবিক সমাজ',
            desc: 'একত্রে কাজ করে মানবিক ও সমতাভিত্তিক সমাজ গঠন।',
        },
        {
            icon: <Target className="w-6 h-6 text-brand-500" />,
            title: 'পরিবেশ রক্ষা',
            desc: 'সবুজ পৃথিবী গড়তে বৃক্ষরোপণ এবং পরিচ্ছন্নতা অভিযান।',
        },
        {
            icon: <Heart className="w-6 h-6 text-brand-500" />,
            title: 'অসহায়দের পাশে',
            desc: 'বিপদের সময় মানুষের পাশে দাঁড়ানো আমাদের অন্যতম লক্ষ্য।',
        },
    ];

    return (
        <section id="about" className="py-20 md:py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="lg:w-1/2"
                    >
                        <div className="relative">
                            {/* Image Placeholder with nice styling */}
                            <div className="aspect-[4/3] rounded-2xl bg-brand-100 overflow-hidden relative shadow-2xl shadow-brand-200/50">
                                <img
                                    src={state.about.imageUrl}
                                    alt="Volunteer activities"
                                    className="w-full h-full object-cover mix-blend-multiply opacity-90"
                                />
                            </div>
                            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-brand-50 rounded-full blur-3xl -z-10" />
                            <div className="absolute -top-8 -left-8 w-32 h-32 bg-brand-100 rounded-full blur-2xl -z-10" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="lg:w-1/2 flex flex-col justify-center"
                    >
                        <div className="inline-flex items-center gap-2 mb-4">
                            <span className="w-8 h-1 bg-brand-500 rounded-full" />
                            <span className="text-brand-600 font-bold uppercase tracking-wider text-sm">
                                About Us
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight font-bangla">
                            {t.about.title}
                        </h2>

                        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                            {t.about.content}
                        </p>

                        <div className="space-y-6">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex gap-4 items-start">
                                    <div className="p-3 bg-brand-50 rounded-xl">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-gray-900 mb-1 font-bangla">{feature.title}</h3>
                                        <p className="text-gray-600">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Phone, MapPin, Send, Facebook } from 'lucide-react';

const Contact = () => {
    const { t } = useLanguage();

    return (
        <section id="contact" className="py-20 md:py-32 bg-white relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/3"
                    >
                        <div className="inline-flex items-center gap-2 mb-4">
                            <span className="w-8 h-1 bg-brand-500 rounded-full" />
                            <span className="text-brand-600 font-bold uppercase tracking-wider text-sm">
                                Get In Touch
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                            {t.contact.title}
                        </h2>
                        <p className="text-gray-600 mb-10 text-lg">
                            {t.contact.subtitle}
                        </p>

                        <div className="space-y-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-14 h-14 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                                        <p className="text-gray-600">01717-638209</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-14 h-14 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                                        <Facebook className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Facebook Page</h4>
                                        <a href="#" className="text-brand-600 hover:underline">/alokitoporibesh</a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-14 h-14 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Address</h4>
                                        <p className="text-gray-600">Dhaka, Bangladesh</p>
                                    </div>
                                </div>
                            </div>

                            {/* QR Code Placeholder */}
                            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-gray-100 flex flex-col items-center max-w-[250px]">
                                <div className="aspect-square w-full bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center mb-4">
                                    <span className="text-gray-400 font-medium flex items-center justify-center text-center">QR Code<br />Placeholder</span>
                                </div>
                                <p className="text-sm text-gray-500 text-center font-medium">Scan to connect</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form Wrapper */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-2/3"
                    >
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-brand-100/50 border border-gray-100">
                            <div className="mb-10 text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.getInvolved.title}</h3>
                                <p className="text-gray-500">স্বেচ্ছাসেবক হিসেবে কাজ করতে অথবা বিস্তারিত জানতে আমাদের মেসেজ করুন।</p>
                            </div>

                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">{t.contact.formName}</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Abdullah"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">{t.contact.formPhone}</label>
                                        <input
                                            type="tel"
                                            placeholder="e.g. 01700000000"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">{t.contact.formMessage}</label>
                                    <textarea
                                        rows={5}
                                        placeholder="কীভাবে যুক্ত হতে চান বা কী সম্পর্কে জানতে চান..."
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all resize-none"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button className="flex-1 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-brand-500/30">
                                        {t.contact.btnSend} <Send className="w-5 h-5" />
                                    </button>
                                    <button className="sm:flex-none bg-brand-50 hover:bg-brand-100 text-brand-700 px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center border border-brand-200">
                                        {t.getInvolved.btnVolunteer}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

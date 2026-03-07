import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { Phone, Mail, MapPin, Send, Heart } from 'lucide-react';

const Contact = () => {
    const { language } = useLanguage();
    const { state } = useCMS();
    const { contact } = state;

    return (
        <section id="contact" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/3"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-1.5 bg-accent rounded-full" />
                            <span className="text-primary font-black uppercase tracking-[0.2em] text-sm">
                                {language === 'bn' ? 'যোগাযোগ' : 'Contact Us'}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-dark mb-8 leading-tight font-bangla">
                            {language === 'bn' ? 'আমাদের সাথে যুক্ত হোন' : 'Get in Touch with Nature'}
                        </h2>
                        <p className="text-lg text-dark/60 mb-12 font-medium">
                            {language === 'bn'
                                ? 'যেকোনো জিজ্ঞাসা বা সহযোগিতার জন্য আমাদের সাথে যোগাযোগ করুন।'
                                : 'Reach out to us for any inquiries or collaborations.'}
                        </p>

                        <div className="space-y-6">
                            <a href={`tel:${contact.phone}`} className="flex items-center gap-6 p-6 rounded-3xl bg-background border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all group">
                                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-dark/40 mb-1">CALL US</p>
                                    <p className="text-lg font-bold text-dark">{contact.phone}</p>
                                </div>
                            </a>

                            <a href={`mailto:${contact.email}`} className="flex items-center gap-6 p-6 rounded-3xl bg-background border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all group">
                                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-dark/40 mb-1">EMAIL US</p>
                                    <p className="text-lg font-bold text-dark">{contact.email}</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-6 p-6 rounded-3xl bg-background border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all group">
                                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-dark/40 mb-1">VISIT US</p>
                                    <p className="text-lg font-bold text-dark font-bangla">{contact.address}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-2/3"
                    >
                        <div className="bg-background rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-primary/5 border border-white">
                            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-dark/40 ml-2">YOUR NAME</label>
                                        <input
                                            type="text"
                                            className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium"
                                            placeholder="Abdullah Al Mamun"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-dark/40 ml-2">PHONE NUMBER</label>
                                        <input
                                            type="tel"
                                            className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium"
                                            placeholder="017XXXXXXXX"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-[0.2em] text-dark/40 ml-2">YOUR MESSAGE</label>
                                    <textarea
                                        rows={6}
                                        className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium resize-none"
                                        placeholder="Tell us how we can help..."
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6 pt-4">
                                    <button className="flex-1 px-8 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                                        {language === 'bn' ? 'বার্তা পাঠান' : 'Send Message'}
                                        <Send className="w-5 h-5" />
                                    </button>
                                    <button className="px-8 py-5 bg-secondary/10 text-secondary rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-secondary/20 transition-all flex items-center justify-center gap-3">
                                        {language === 'bn' ? 'স্বেচ্ছাসেবক হোন' : 'Join as Volunteer'}
                                        <Heart className="w-5 h-5" />
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

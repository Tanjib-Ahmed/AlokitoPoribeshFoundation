import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart, Leaf, ArrowUp } from 'lucide-react';

const Footer = () => {
    const { language } = useLanguage();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-primary-900 pt-24 pb-12 overflow-hidden shadow-[0_-10px_60px_-15px_rgba(0,0,0,0.3)]">
            {/* Visual Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />

            <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-8 group cursor-pointer" onClick={scrollToTop}>
                            <div className="p-2.5 bg-primary-500 rounded-xl text-white shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
                                <Leaf className="w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold text-white font-bangla tracking-tight">
                                আলোকিত পরিবেশ
                            </span>
                        </div>
                        <p className="text-white/60 leading-relaxed mb-8 font-bangla text-lg">
                            {language === 'bn'
                                ? 'একটি পরিচ্ছন্ন, সবুজ এবং সমৃদ্ধ সমাজ গড়ে তোলার লক্ষ্যে আমাদের নিরন্তর পথচলা।'
                                : 'Our continuous journey towards building a clean, green, and prosperous society.'}
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Mail].map((Icon, idx) => (
                                <motion.a
                                    key={idx}
                                    href="#"
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-secondary hover:bg-white/10 transition-all shadow-sm"
                                >
                                    <Icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-xl mb-10 pb-4 border-b border-white/10 w-fit pr-8">
                            {language === 'bn' ? 'নেভিগেশন' : 'Navigation'}
                        </h4>
                        <ul className="space-y-4">
                            {['হোম', 'আমাদের লক্ষ্য', 'কার্যক্রম', 'গ্যালারি', 'যোগাযোগ'].map((link, idx) => (
                                <li key={idx}>
                                    <a href={`#${link}`} className="text-white/60 hover:text-white transition-colors flex items-center gap-3 group font-bangla text-lg">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 group-hover:w-4 transition-all" />
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-1">
                        <h4 className="text-white font-bold text-xl mb-10 pb-4 border-b border-white/10 w-fit pr-8">
                            {language === 'bn' ? 'যোগাযোগ করুন' : 'Get in Touch'}
                        </h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 text-white/60 group">
                                <MapPin className="w-6 h-6 text-primary-500 shrink-0 mt-1" />
                                <span className="font-bangla text-lg leading-relaxed">মিরপুর ১, ঢাকা ১২১৬, বাংলাদেশ</span>
                            </li>
                            <li className="flex items-center gap-4 text-white/60 group">
                                <Phone className="w-6 h-6 text-primary-500 shrink-0" />
                                <span className="font-sans text-lg tracking-tight">+৮৮০ ১৭১২-৩৪৫৬৭৮</span>
                            </li>
                            <li className="flex items-center gap-4 text-white/60 group">
                                <Mail className="w-6 h-6 text-primary-500 shrink-0" />
                                <span className="font-sans text-lg">info@alokitoporibesh.org</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter / CTA */}
                    <div>
                        <h4 className="text-white font-bold text-xl mb-10 pb-4 border-b border-white/10 w-fit pr-8">
                            {language === 'bn' ? 'সহযোগিতা' : 'Support Us'}
                        </h4>
                        <p className="text-white/60 mb-8 font-bangla text-lg">
                            {language === 'bn' ? 'আপনার ছোট একটু সহযোগিতা সমাজের বিশাল পরিবর্তন আনতে পারে।' : 'Your small support can bring a huge change in the society.'}
                        </p>
                        <button className="w-full py-4 bg-secondary text-primary-900 font-bold rounded-2xl shadow-lg shadow-secondary/10 hover:shadow-secondary/20 hover:scale-[1.02] transition-all duration-300">
                            {language === 'bn' ? 'এখনই দান করুন' : 'Donate Now'}
                        </button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-white/40 text-sm font-medium">
                        © {new Date().getFullYear()} Alokito Poribesh Foundation. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <p className="text-white/40 text-sm flex items-center gap-2">
                            Designed with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> in BD
                        </p>
                        <div className="w-px h-4 bg-white/10" />
                        <button
                            onClick={scrollToTop}
                            className="p-3 bg-white/5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all"
                        >
                            <ArrowUp className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

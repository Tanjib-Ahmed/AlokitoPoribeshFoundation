import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { Facebook, Instagram, Twitter, Youtube, Leaf, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
    const { language } = useLanguage();
    const { state } = useCMS();
    const { branding } = state;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-dark pt-24 pb-12 relative overflow-hidden">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
                    {/* Brand Column */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-3 mb-8 group cursor-pointer">
                            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white rotate-3 group-hover:rotate-12 transition-transform duration-500">
                                <Leaf className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white font-bangla tracking-tight">
                                    {language === 'bn' ? branding.nameBn : branding.nameEn}
                                </h2>
                                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">
                                    {language === 'bn' ? 'পরিবেশের বন্ধু' : 'Friends of Nature'}
                                </p>
                            </div>
                        </div>
                        <p className="text-lg text-white/40 leading-relaxed mb-10 max-w-md font-medium">
                            {language === 'bn'
                                ? branding.taglineBn
                                : branding.taglineEn}
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-primary transition-all duration-300">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-3">
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">
                            {language === 'bn' ? 'লিঙ্কসমূহ' : 'Quick Links'}
                        </h4>
                        <ul className="space-y-4">
                            {['Home', 'About', 'Work', 'Gallery', 'Blog'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item.toLowerCase()}`} className="text-white/40 hover:text-primary font-bold transition-colors flex items-center gap-2 group">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter/CTA */}
                    <div className="lg:col-span-4">
                        <div className="p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20 relative overflow-hidden group">
                            <Heart className="absolute -bottom-4 -right-4 w-24 h-24 text-primary/10 -rotate-12 group-hover:scale-110 transition-transform duration-500" />
                            <h4 className="text-xl font-black text-white mb-4 font-bangla">
                                {language === 'bn' ? 'আমাদের সাথে যুক্ত হতে চান?' : 'Want to support us?'}
                            </h4>
                            <p className="text-white/60 text-sm mb-6 font-medium">
                                {language === 'bn'
                                    ? 'স্বেচ্ছাসেবক হিসেবে যোগ দিন এবং পরিবেশ রক্ষায় সাহায্য করুন।'
                                    : 'Join as a volunteer and help protect our environment.'}
                            </p>
                            <button className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary-dark transition-all">
                                {language === 'bn' ? 'এখনই যোগ দিন' : 'Join Us Now'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-xs font-bold text-white/20 uppercase tracking-[0.2em]">
                        © 2026 ALOKITO PORIBESH FOUNDATION. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-xs font-bold text-white/20 hover:text-white transition-colors uppercase tracking-widest">Privacy Policy</a>
                        <button
                            onClick={scrollToTop}
                            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-primary transition-all duration-300"
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

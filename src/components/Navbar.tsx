import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { Menu, X, Leaf, Globe, ArrowRight } from 'lucide-react';
import { navItems, branding } from '../data/config';

const Navbar = () => {
    const { language, toggleLanguage } = useLanguage();
    const { state } = useCMS();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-500`}
        >
            <div
                className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${isScrolled
                        ? 'bg-white/80 backdrop-blur-2xl shadow-2xl shadow-primary/10 border border-white/20'
                        : 'bg-white/10 backdrop-blur-md border border-white/10'
                    }`}
            >
                {/* Logo Section */}
                <a href="#home" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-12 shadow-lg shadow-primary/20">
                        <Leaf className="w-5 h-5" />
                    </div>
                    <span className={`text-lg font-black tracking-tight transition-colors duration-500 ${isScrolled ? 'text-dark' : 'text-white'}`}>
                        {branding.nameEn.split(' ')[0]} <span className="text-primary">{branding.nameEn.split(' ')[1]}</span>
                    </span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className={`text-[13px] font-bold transition-all duration-300 ${isScrolled
                                    ? 'text-dark/70 hover:text-primary'
                                    : 'text-white/80 hover:text-white'
                                }`}
                        >
                            {language === 'bn' ? item.nameBn : item.nameEn}
                        </a>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden lg:flex items-center gap-3">
                    <button
                        onClick={toggleLanguage}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${isScrolled
                                ? 'text-dark/70 hover:bg-primary/5 hover:text-primary'
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        <Globe className="w-4 h-4" />
                        {language === 'bn' ? 'English' : 'বাংলা'}
                    </button>
                    <a
                        href="#contact"
                        className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary-600 transition-all shadow-lg shadow-primary/20 group"
                    >
                        {language === 'bn' ? 'দান করুন' : 'Donate Now'}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={`lg:hidden p-2 rounded-full transition-all duration-300 ${isScrolled ? 'bg-primary/10 text-primary' : 'bg-white/10 text-white backdrop-blur-md'
                        }`}
                >
                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="lg:hidden absolute top-full left-0 right-0 mt-4 bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/20 p-6 flex flex-col gap-2 overflow-hidden z-40"
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="px-6 py-4 rounded-2xl text-sm font-bold text-dark/70 hover:text-primary hover:bg-primary/5 transition-all"
                            >
                                {language === 'bn' ? item.nameBn : item.nameEn}
                            </a>
                        ))}
                        <div className="h-px bg-dark/5 my-2" />
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => {
                                    toggleLanguage();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold text-dark/70 bg-dark/5"
                            >
                                <Globe className="w-5 h-5" />
                                {language === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
                            </button>
                            <a
                                href="#contact"
                                className="flex items-center justify-center gap-3 px-6 py-5 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20"
                            >
                                {language === 'bn' ? 'দান করুন' : 'Donate Now'}
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

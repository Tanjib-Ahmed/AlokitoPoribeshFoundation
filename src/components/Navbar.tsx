import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { Menu, X, Leaf, Globe } from 'lucide-react';

const Navbar = () => {
    const { language, toggleLanguage } = useLanguage();
    const { state } = useCMS();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { nameBn: 'হোম', nameEn: 'Home', href: '#home' },
        { nameBn: 'আমাদের সম্পর্কে', nameEn: 'About Us', href: '#about' },
        { nameBn: 'কার্যক্রম', nameEn: 'Our Work', href: '#work' },
        { nameBn: 'অর্জিত লক্ষ্য', nameEn: 'Impact', href: '#impact' },
        { nameBn: 'গ্যালারি', nameEn: 'Gallery', href: '#gallery' },
        { nameBn: 'ব্লগ', nameEn: 'Blog', href: '#blog' },
        { nameBn: 'যোগাযোগ', nameEn: 'Contact', href: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? 'py-4 bg-white/80 backdrop-blur-2xl shadow-xl shadow-primary/5 border-b border-primary/5'
                : 'py-6 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
                {/* Logo */}
                <a href="#home" className="flex items-center gap-3 group">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white rotate-3 group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-primary/20">
                        <Leaf className="w-7 h-7" />
                    </div>
                    <div className="hidden sm:block">
                        <h1 className={`text-xl font-black font-bangla tracking-tight transition-colors duration-500 ${isScrolled ? 'text-dark' : 'text-white'}`}>
                            {language === 'bn' ? state.branding.nameBn : state.branding.nameEn}
                        </h1>
                        <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isScrolled ? 'text-primary' : 'text-primary-300'}`}>
                            {language === 'bn' ? 'পরিবেশের বন্ধু' : 'Friends of Nature'}
                        </p>
                    </div>
                </a>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-2">
                    <div className={`flex items-center gap-1 p-1 rounded-2xl ${isScrolled ? 'bg-background' : 'bg-white/10 backdrop-blur-md'}`}>
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${isScrolled
                                    ? 'text-dark/60 hover:text-primary hover:bg-white'
                                    : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {language === 'bn' ? item.nameBn : item.nameEn}
                            </a>
                        ))}
                    </div>

                    <div className="w-px h-8 bg-gray-200/20 mx-4" />

                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all duration-500 ${isScrolled
                            ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark'
                            : 'bg-white text-dark hover:bg-primary hover:text-white'
                            }`}
                    >
                        <Globe className="w-4 h-4" />
                        {language === 'bn' ? 'English' : 'বাংলা'}
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={`lg:hidden p-3 rounded-2xl transition-all duration-500 ${isScrolled ? 'bg-primary/10 text-primary' : 'bg-white/10 text-white backdrop-blur-md'
                        }`}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 p-6 overflow-y-auto max-h-[90vh]"
                    >
                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="px-6 py-4 rounded-2xl text-sm font-black text-dark/70 hover:text-primary hover:bg-primary/5 transition-all uppercase tracking-widest"
                                >
                                    {language === 'bn' ? item.nameBn : item.nameEn}
                                </a>
                            ))}
                            <div className="h-px bg-gray-100 my-4" />
                            <button
                                onClick={() => {
                                    toggleLanguage();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center justify-center gap-3 px-6 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20"
                            >
                                <Globe className="w-5 h-5" />
                                {language === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { Menu, X, Leaf, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { language, toggleLanguage } = useLanguage();
    const { state } = useCMS();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: language === 'bn' ? 'হোম' : 'Home', href: '#home' },
        { name: language === 'bn' ? 'আমাদের লক্ষ্য' : 'About', href: '#mission' },
        { name: language === 'bn' ? 'কার্যক্রম' : 'Activities', href: '#activities' },
        { name: language === 'bn' ? 'গ্যালারি' : 'Gallery', href: '#gallery' },
        { name: language === 'bn' ? 'ব্লগ' : 'Blog', href: '#blog' },
        { name: language === 'bn' ? 'যোগাযোগ' : 'Contact', href: '#contact' },
    ];

    const logoUrl = language === 'bn' ? state.branding.logoUrlBn : state.branding.logoUrlEn;

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    {/* Logo Area */}
                    <a href="#home" className="flex items-center gap-3 group">
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt="Logo"
                                className={`h-10 md:h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${!isScrolled && 'brightness-0 invert'}`}
                            />
                        ) : (
                            <div className="p-2 bg-primary-500 rounded-xl text-white shadow-lg">
                                <Leaf className="w-6 h-6" />
                            </div>
                        )}
                        {!logoUrl && (
                            <span className={`text-xl font-bold font-bangla transition-colors duration-300 ${isScrolled ? 'text-primary-900' : 'text-white'}`}>
                                আলোকিত পরিবেশ
                            </span>
                        )}
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-bold tracking-wide uppercase transition-all duration-300 hover:text-primary-500 hover:-translate-y-0.5 ${isScrolled ? 'text-gray-700' : 'text-white/90'
                                    }`}
                            >
                                {link.name}
                            </a>
                        ))}

                        <button
                            onClick={() => toggleLanguage()}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 font-bold text-xs uppercase shadow-sm ${isScrolled
                                ? 'border-primary-200 text-primary-700 bg-primary-50 hover:bg-primary-100'
                                : 'border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/20'
                                }`}
                        >
                            <Globe className="w-4 h-4" />
                            {language === 'bn' ? 'EN' : 'বাংলা'}
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${isScrolled ? 'text-gray-900 bg-gray-100 hover:bg-gray-200' : 'text-white bg-white/10 hover:bg-white/20'
                            }`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="px-5 py-4 text-gray-800 font-bold hover:bg-primary-50 hover:text-primary-600 rounded-2xl transition-all"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <button
                                onClick={() => {
                                    toggleLanguage();
                                    setIsOpen(false);
                                }}
                                className="mt-4 flex items-center justify-center gap-3 w-full py-4 bg-primary-600 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/30 transition-all hover:bg-primary-700"
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

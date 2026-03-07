import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { Menu, X, Leaf } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { language, toggleLanguage, t } = useLanguage();
    const { state } = useCMS();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: t.navbar.home, href: '#home' },
        { name: t.navbar.about, href: '#about' },
        { name: t.navbar.activities, href: '#activities' },
        { name: t.navbar.blog, href: '#blog' },
        { name: t.navbar.contact, href: '#contact' },
    ];

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-sm py-4 border-b border-gray-100'
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <a href="#home" className="flex items-center gap-2 transition-colors text-brand-700">
                    {(language === 'bn' ? state.branding.logoUrlBn : state.branding.logoUrlEn) ? (
                        <img src={language === 'bn' ? state.branding.logoUrlBn : state.branding.logoUrlEn} alt="Logo" className="h-10 md:h-12 w-auto object-contain" />
                    ) : (
                        <>
                            <Leaf className="w-8 h-8 md:w-10 md:h-10 transition-colors text-brand-600 shrink-0" />
                            <div className="flex flex-col">
                                <span className="font-bold text-lg md:text-xl leading-none whitespace-nowrap">
                                    {language === 'bn' ? 'আলোকিত পরিবেশ' : 'Alokito Poribesh'}
                                </span>
                                <span className="text-xs md:text-sm font-medium transition-colors text-brand-600">
                                    {language === 'bn' ? 'ফাউন্ডেশন' : 'Foundation'}
                                </span>
                            </div>
                        </>
                    )}
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <ul className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className="font-medium transition-colors text-gray-700 hover:text-brand-600"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-1 font-semibold px-3 py-1.5 rounded-full transition-colors bg-brand-50 hover:bg-brand-100 text-brand-700"
                    >
                        <span className={language === 'bn' ? 'text-brand-700' : 'text-gray-400'}>BN</span>
                        <span className="text-gray-300">|</span>
                        <span className={language === 'en' ? 'text-brand-700' : 'text-gray-400'}>EN</span>
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className="flex md:hidden items-center gap-4">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-1 font-semibold text-sm"
                    >
                        <span className={language === 'bn' ? 'text-brand-700' : 'text-gray-400'}>BN</span>
                        <span className="text-gray-300">|</span>
                        <span className={language === 'en' ? 'text-brand-700' : 'text-gray-400'}>EN</span>
                    </button>
                    <button
                        className="p-1 text-gray-700 shadow-sm border border-gray-100 rounded-md"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <ul className=" flex flex-col py-4 px-4 gap-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block text-gray-700 hover:text-brand-600 font-medium text-lg"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

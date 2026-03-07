import { useLanguage } from '../context/LanguageContext';
import { Leaf } from 'lucide-react';

const Footer = () => {
    const { language, t } = useLanguage();

    return (
        <footer className="bg-brand-900 border-t border-brand-800 text-white py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col items-center md:items-start">
                        <a href="#home" className="flex items-center gap-2 mb-4">
                            <Leaf className="w-8 h-8 text-brand-400" />
                            <div className="flex flex-col">
                                <span className="font-bold text-xl leading-none">
                                    {language === 'bn' ? 'আলোকিত পরিবেশ' : 'Alokito Poribesh'}
                                </span>
                                <span className="text-sm text-brand-400 font-medium tracking-wide">
                                    {language === 'bn' ? 'ফাউন্ডেশন' : 'Foundation'}
                                </span>
                            </div>
                        </a>
                        <p className="text-brand-300 font-light max-w-sm text-center md:text-left italic">
                            "{t.footer.message}"
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <a href="#home" className="text-brand-300 hover:text-white transition-colors">Home</a>
                        <span className="text-brand-700">•</span>
                        <a href="#about" className="text-brand-300 hover:text-white transition-colors">About</a>
                        <span className="text-brand-700">•</span>
                        <a href="#activities" className="text-brand-300 hover:text-white transition-colors">Activities</a>
                        <span className="text-brand-700">•</span>
                        <a href="#contact" className="text-brand-300 hover:text-white transition-colors">Contact</a>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-brand-800 flex flex-col md:flex-row items-center justify-between gap-4 text-brand-400 text-sm">
                    <p>© {new Date().getFullYear()} Alokito Poribesh Foundation. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with <span className="text-red-400">♥</span> for humanity.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

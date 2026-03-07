import React, { createContext, useContext, useState } from 'react';
import { translations } from '../i18n/translations';
import type { Language } from '../i18n/translations';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: typeof translations.bn;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('bn');

    const toggleLanguage = () => {
        setLanguage(prev => (prev === 'bn' ? 'en' : 'bn'));
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

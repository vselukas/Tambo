import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('cz');

    useEffect(() => {
        // Detect language on first load
        const storedLang = localStorage.getItem('tambo_lang');
        if (storedLang) {
            setLanguage(storedLang);
        } else {
            const browserLang = navigator.language.toLowerCase();
            if (browserLang.startsWith('cs') || browserLang.startsWith('sk')) {
                setLanguage('cz');
                localStorage.setItem('tambo_lang', 'cz');
            } else {
                setLanguage('en');
                localStorage.setItem('tambo_lang', 'en');
            }
        }
    }, []);

    const toggleLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('tambo_lang', lang);
    };

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };

    // Also return raw dictionary for dynamic arrays where iterating directly over array is easier
    const dict = translations[language];

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t, dict }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);

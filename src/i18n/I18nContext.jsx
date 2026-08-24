import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from './translations';

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
    const [lang, setLangState] = useState(() => {
        try {
            const saved = localStorage.getItem('clevara-lang');
            if (saved === 'es' || saved === 'en') return saved;
        } catch (e) {}
        return 'es';
    });

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    const setLang = (next) => {
        setLangState(next);
        try { localStorage.setItem('clevara-lang', next); } catch (e) {}
    };

    const t = (key) => {
        const dict = translations[lang];
        return dict && dict[key] !== undefined ? dict[key] : key;
    };

    return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error('useI18n debe usarse dentro de I18nProvider');
    return ctx;
}

export function T({ k, as: Tag = 'span', className, style, children, ...rest }) {
    const { t } = useI18n();
    const value = t(k);
    const props = { className, style, ...rest };
    if (typeof value === 'string' && value.includes('<')) {
        return <Tag {...props} dangerouslySetInnerHTML={{ __html: value }} />;
    }
    return <Tag {...props}>{value}</Tag>;
}

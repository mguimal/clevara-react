import { useI18n } from '../i18n/I18nContext';

export default function LangToggle() {
    const { lang, setLang } = useI18n();

    return (
        <div
            className="lang-toggle"
            role="button"
            tabIndex={0}
            aria-label="Cambiar idioma / Switch language"
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setLang(lang === 'es' ? 'en' : 'es');
            }}
        >
            <i className="fas fa-language"></i>
            <span className="lang-label">{lang.toUpperCase()}</span>
        </div>
    );
}

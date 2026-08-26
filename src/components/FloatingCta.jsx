import { useEffect, useState } from 'react';
import { T } from '../i18n/I18nContext';
import { scrollToSection } from '../lib/smoothScroll';

export default function FloatingCta() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let ticking = false;
        const update = () => {
            ticking = false;
            const pastHero = window.pageYOffset > window.innerHeight * 0.85;
            const contact = document.getElementById('contacto');
            const nearContact = contact && contact.getBoundingClientRect().top < window.innerHeight * 0.75;
            setVisible(pastHero && !nearContact);
        };
        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        update();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <button
        type="button"
            className={`floating-cta${visible ? ' visible' : ''}`}
            onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contacto');
            }}
        >
            <i className="fas fa-bolt"></i>
            <T k="floating.cta" />
        </button>
    );
}

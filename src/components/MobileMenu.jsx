import { useEffect, useRef } from 'react';
import { useI18n, T } from '../i18n/I18nContext';
import { MOBILE_LINKS, LOGO_URL } from '../data/content';
import { scrollToSection } from '../lib/smoothScroll';

export default function MobileMenu({ open, onClose }) {
    const menuRef = useRef(null);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    useEffect(() => {
        function onDocClick(e) {
            if (!open) return;
            if (menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('.hamburger-menu')) {
                onClose();
            }
        }
        function onKey(e) {
            if (e.key === 'Escape' && open) onClose();
        }
        document.addEventListener('click', onDocClick);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('click', onDocClick);
            document.removeEventListener('keydown', onKey);
        };
    }, [open, onClose]);

    const go = (e, id) => {
        e.preventDefault();
        onClose();
        setTimeout(() => scrollToSection(`#${id}`), 300);
    };

    return (
        <div className={`mobile-menu${open ? ' active' : ''}`} id="mobileMenu" ref={menuRef}>
            <div className="liquid-drops">
                <span></span><span></span><span></span><span></span><span></span>
            </div>
            <div className="mobile-menu-header">
                <img src={LOGO_URL} alt="Clevara Studios™" className="mobile-logo" />
                <div className="close-menu" id="closeMenu" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </div>
            </div>
            <ul className="mobile-nav-links">
                {MOBILE_LINKS.map((link) => (
                    <li key={link.id}>
                        <a
                            href={`#${link.id}`}
                            className="mobile-nav-link"
                            onClick={(e) => go(e, link.id)}
                        >
                            <i className={`fas ${link.icon}`}></i> <T k={link.key} />
                        </a>
                    </li>
                ))}
                <li>
                    <a href="#contacto" className="mobile-nav-link contact" onClick={(e) => go(e, 'contacto')}>
                        <i className="fas fa-envelope"></i> <T k="nav.contact" />
                    </a>
                </li>
            </ul>
            <div className="mobile-menu-footer">
                <p>© 2025 Clevara Studios™</p>
            </div>
        </div>
    );
}

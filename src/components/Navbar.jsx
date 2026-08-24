import { useEffect, useState } from 'react';
import { T } from '../i18n/I18nContext';
import { NAV_LINKS, LOGO_URL } from '../data/content';
import GlassSurface from './GlassSurface';
import { handleAnchorClick } from '../lib/smoothScroll';

export default function Navbar({ onToggleMenu }) {
    const [mode, setMode] = useState('top');

    useEffect(() => {
        let ticking = false;
        function hs() {
            const st = window.pageYOffset;
            setMode(st <= 100 ? 'top' : 'scrolled');
            ticking = false;
        }
        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(hs);
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        const timer = setTimeout(hs, 100);
        return () => {
            window.removeEventListener('scroll', onScroll);
            clearTimeout(timer);
        };
    }, []);

    return (
        <nav className={`navbar ${mode}`} id="mainNavbar">
            <GlassSurface
                width="100%"
                height="100%"
                borderRadius={50}
                className={`navbar-glass${mode === 'scrolled' ? ' navbar-glass--visible' : ''}`}
                style={{ position: 'absolute', inset: 0 }}
                backgroundOpacity={0.35}
                saturation={1.8}
                blur={11}
                displace={0.7}
                distortionScale={-140}
                redOffset={5}
                greenOffset={15}
                blueOffset={25}
            />
            <div className="navbar-glow-container">
                <div className="glow-1"></div>
                <div className="glow-2"></div>
                <div className="glow-3"></div>
            </div>
            <div className="logo-container">
                <img src={LOGO_URL} alt="Clevara Studios™" className="logo" id="mainLogo" />
            </div>
            <button
                type="button"
                className="hamburger-menu"
                id="hamburgerMenu"
                aria-label="Abrir menú"
                onClick={onToggleMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul className="nav-links" id="navLinks">
                {NAV_LINKS.map((link) => (
                    <li key={link.id}>
                        <a href={`#${link.id}`} onClick={(e) => handleAnchorClick(e, `#${link.id}`)}>
                            <T k={link.key} />
                        </a>
                    </li>
                ))}
            </ul>
            <div className="contact-btn-container">
                <a href="#contacto" className="contact-btn" onClick={(e) => handleAnchorClick(e, '#contacto')}>
                    <T k="nav.contact" />
                </a>
            </div>
        </nav>
    );
}

import { useRef } from 'react';
import { useI18n, T } from '../i18n/I18nContext';
import IridescenceCanvas from './IridescenceCanvas';
import { handleAnchorClick } from '../lib/smoothScroll';

export default function Hero() {
    const sectionRef = useRef(null);

    return (
        <section id="inicio" className="hero" ref={sectionRef}>
            <IridescenceCanvas targetRef={sectionRef} />
            <div className="hero-content">
                <h1><T k="hero.title" /></h1>
                <p className="hero-subtitle"><T k="hero.subtitle" /></p>
                <div className="hero-buttons">
                    <a href="#clebots" className="cta-button-solid" onClick={(e) => handleAnchorClick(e, '#clebots')}>
                        <T k="hero.cta1" />
                    </a>
                    <a href="#contacto" className="cta-button-outline" onClick={(e) => handleAnchorClick(e, '#contacto')}>
                        <T k="hero.cta2" />
                    </a>
                </div>
            </div>
        </section>
    );
}

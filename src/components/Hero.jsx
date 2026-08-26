import { useRef } from 'react';
import { useI18n, T } from '../i18n/I18nContext';
import IridescenceCanvas from './IridescenceCanvas';
import SpecularButton from './SpecularButton';
import { handleAnchorClick, scrollToSection } from '../lib/smoothScroll';

export default function Hero() {
    const sectionRef = useRef(null);

    return (
        <section id="inicio" className="hero" ref={sectionRef}>
            <IridescenceCanvas targetRef={sectionRef} />
            <div className="hero-content">
                <h1><T k="hero.title" /></h1>
                <p className="hero-subtitle"><T k="hero.subtitle" /></p>
                <div className="hero-buttons">
                    <SpecularButton
                        size="md"
                        radius={30}
                        tint="#ffffff"
                        tintOpacity={0}
                        blur={0}
                        textColor="#f5f5f5"
                        lineColor="#ffffff"
                        baseColor="#94a3b8"
                        intensity={1}
                        shineSize={10}
                        shineFade={40}
                        thickness={1}
                        speed={0.35}
                        followMouse
                        proximity={250}
                        autoAnimate={false}
                        onClick={() => scrollToSection('#clebots')}
                    >
                        <T k="hero.cta1" />
                    </SpecularButton>
                    <a href="#contacto" className="cta-button-outline" onClick={(e) => handleAnchorClick(e, '#contacto')}>
                        <T k="hero.cta2" />
                    </a>
                </div>
            </div>
        </section>
    );
}

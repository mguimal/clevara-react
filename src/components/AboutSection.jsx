import { T } from '../i18n/I18nContext';
import Reveal from './Reveal';
import { VALUES } from '../data/content';
import { handleAnchorClick } from '../lib/smoothScroll';

const FACTS = [
    { icon: 'fa-robot', t: 'about2.f1.t', d: 'about2.f1.d' },
    { icon: 'fa-plug', t: 'about2.f2.t', d: 'about2.f2.d' },
    { icon: 'fa-shield-halved', t: 'about2.f3.t', d: 'about2.f3.d' },
    { icon: 'fa-headset', t: 'about2.f4.t', d: 'about2.f4.d' },
];

export default function AboutSection() {
    return (
        <section id="nosotros" className="about">
            <div className="section-title">
                <Reveal as="h2" variant="fade-in"><T k="about.title" /></Reveal>
                <Reveal as="p" variant="fade-in" delay={0.1}><T k="about.subtitle" /></Reveal>
            </div>

            <Reveal variant="fade-in" delay={0.15} className="about-statement">
                <div className="as-main">
                    <span className="about-eyebrow"><T k="about2.eyebrow" /></span>
                    <T as="h3" k="about2.statement" />
                    <T as="p" className="as-text" k="about2.text" />
                </div>
                <div className="about-facts">
                    {FACTS.map((f) => (
                        <div className="about-fact" key={f.t}>
                            <span className="af-icon"><i className={`fas ${f.icon}`}></i></span>
                            <strong><T k={f.t} /></strong>
                            <span><T k={f.d} /></span>
                        </div>
                    ))}
                </div>
            </Reveal>

            <div className="values-grid">
                {VALUES.map((value, i) => (
                    <Reveal key={value.titleKey} variant="fade-in" delay={0.15 + i * 0.08} className="value-card">
                        <span className="value-index">{String(i + 1).padStart(2, '0')}</span>
                        <div className="value-icon">
                            <i className={`fas ${value.icon}`}></i>
                        </div>
                        <h3><T k={value.titleKey} /></h3>
                        <p><T k={value.descKey} /></p>
                    </Reveal>
                ))}
            </div>

            <Reveal variant="fade-in" delay={0.25} className="about-quote">
                <h3><T k="about.philosophy.title" /></h3>
                <p><T k="about.philosophy.text" /></p>
                <div className="highlight-quote"><T k="about.philosophy.quote" /></div>
            </Reveal>

            <Reveal className="section-cta" delay={0.35}>
                <a href="#contacto" className="cta-button orange" onClick={(e) => handleAnchorClick(e, '#contacto')}>
                    <T k="about.cta" />
                </a>
            </Reveal>
        </section>
    );
}

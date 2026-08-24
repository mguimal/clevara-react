import { T } from '../i18n/I18nContext';
import Reveal from './Reveal';
import { VALUES } from '../data/content';
import { handleAnchorClick } from '../lib/smoothScroll';

export default function AboutSection() {
    return (
        <section id="nosotros" className="about">
            <div className="section-title">
                <Reveal as="h2" variant="fade-in"><T k="about.title" /></Reveal>
                <Reveal as="p" variant="fade-in" delay={0.1}><T k="about.subtitle" /></Reveal>
            </div>
            <div className="about-container">
                <Reveal className="about-intro-card">
                    <T as="h2" k="about.intro.title" />
                    <T as="p" className="about-intro-text" k="about.intro.text" />
                    <div className="stats-row">
                        <div className="stat-bubble">
                            <span className="stat-number">+120</span>
                            <span className="stat-label"><T k="about.intro.stat1" /></span>
                        </div>
                        <div className="stat-bubble">
                            <span className="stat-number">65%</span>
                            <span className="stat-label"><T k="about.intro.stat2" /></span>
                        </div>
                    </div>
                </Reveal>

                <div className="values-grid">
                    {VALUES.map((value) => (
                        <Reveal key={value.titleKey} variant="fade-in" delay={value.delay} className="value-card">
                            <div className="value-icon">
                                <i className={`fas ${value.icon}`}></i>
                            </div>
                            <h3><T k={value.titleKey} /></h3>
                            <p><T k={value.descKey} /></p>
                        </Reveal>
                    ))}
                </div>

                <Reveal className="philosophy-card" delay={0.35}>
                    <div className="philosophy-icon">
                        <i className="fas fa-quote-right"></i>
                    </div>
                    <div className="philosophy-text">
                        <h3><T k="about.philosophy.title" /></h3>
                        <p><T k="about.philosophy.text" /></p>
                        <div className="highlight-quote"><T k="about.philosophy.quote" /></div>
                    </div>
                </Reveal>
            </div>
            <Reveal className="section-cta" delay={0.4}>
                <a href="#contacto" className="cta-button orange" onClick={(e) => handleAnchorClick(e, '#contacto')}>
                    <T k="about.cta" />
                </a>
            </Reveal>
        </section>
    );
}

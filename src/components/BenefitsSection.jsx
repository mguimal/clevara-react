import { T } from '../i18n/I18nContext';
import Reveal from './Reveal';
import RoiCalculator from './RoiCalculator';
import { BENEFIT_ROWS } from '../data/content';
import { handleAnchorClick } from '../lib/smoothScroll';

export default function BenefitsSection() {
    return (
        <section id="beneficios" className="benefits">
            <div className="section-title">
                <Reveal as="h2" variant="fade-in"><T k="benefits.title" /></Reveal>
                <Reveal as="p" variant="fade-in" delay={0.1}><T k="benefits.subtitle" /></Reveal>
            </div>

            <Reveal variant="fade-in" delay={0.15} className="loss-card">
                <h3>
                    <i className="fas fa-chart-line"></i> <span><T k="benefits.loss.title" /></span>
                </h3>
                <T as="p" k="benefits.loss.p1" />
                <p><span className="highlight"><T k="benefits.loss.p2" /></span></p>
                <p className="loss-subtitle"><T k="benefits.loss.p3" /></p>
            </Reveal>

            <RoiCalculator />

            <div className="benefits-container">
                {BENEFIT_ROWS.map((row) => (
                    <Reveal key={row.titleKey} variant="fade-in" delay={row.delay} className="benefit-row">
                        <div className="benefit-image-left">
                            <i className={`fas ${row.icon}`}></i>
                        </div>
                        <div className="benefit-header-left">
                            <h3><T k={row.titleKey} /></h3>
                        </div>
                        <T as="div" className="benefit-text" k={row.descKey} />
                    </Reveal>
                ))}
            </div>

            <Reveal className="section-cta" delay={0.5}>
                <a href="#contacto" className="cta-button" onClick={(e) => handleAnchorClick(e, '#contacto')}>
                    <T k="benefits.cta" />
                </a>
            </Reveal>
        </section>
    );
}

import { T } from '../i18n/I18nContext';
import Reveal from './Reveal';
import RoiCalculator from './RoiCalculator';
import { BENEFIT_ROWS } from '../data/content';
import { handleAnchorClick } from '../lib/smoothScroll';

function PremiumStatsBanner() {
    return (
        <Reveal variant="fade-in" delay={0.15} className="premium-stats-banner">
            <div className="psb-icon">
                <i className="fas fa-arrow-trend-up"></i>
            </div>
            <div className="psb-main">
                <span className="psb-eyebrow"><T k="benefits.loss.eyebrow" /></span>
                <h3 className="psb-title"><T k="benefits.loss.title" /></h3>
                <p className="psb-caption"><T k="benefits.loss.caption" /></p>
                <p className="psb-sub"><T k="benefits.loss.p3" /></p>
            </div>
            <div className="psb-divider"></div>
            <div className="psb-stat">
                <span className="psb-stat-number"><T k="benefits.loss.stat" /></span>
                <span className="psb-stat-unit"><T k="benefits.loss.statUnit" /></span>
                <span className="psb-stat-note"><T k="benefits.loss.statNote" /></span>
            </div>
        </Reveal>
    );
}

export default function BenefitsSection() {
    return (
        <section id="beneficios" className="benefits">
            <div className="section-title">
                <Reveal as="h2" variant="fade-in"><T k="benefits.title" /></Reveal>
                <Reveal as="p" variant="fade-in" delay={0.1}><T k="benefits.subtitle" /></Reveal>
            </div>

            <PremiumStatsBanner />

            <RoiCalculator />

            <div className="benefits-premium-grid">
                {BENEFIT_ROWS.map((row) => (
                    <Reveal key={row.titleKey} variant="fade-in" delay={row.delay} className="benefit-premium-card">
                        <div className="bpc-icon">
                            <i className={`fas ${row.icon}`}></i>
                        </div>
                        <h3><T k={row.titleKey} /></h3>
                        <T as="p" className="bpc-text" k={row.descKey} />
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

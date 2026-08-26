import { T } from '../i18n/I18nContext';
import Reveal from './Reveal';
import RoiCalculator from './RoiCalculator';
import DemoVideo from './DemoVideo';
import { BENEFIT_ROWS } from '../data/content';
import { handleAnchorClick } from '../lib/smoothScroll';
import { ParticleCard, GlobalSpotlight, useMobileDetection } from './MagicBento';
import { useRef } from 'react';

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
    const gridRef = useRef(null);
    const isMobile = useMobileDetection();

    return (
        <section id="beneficios" className="benefits">
            <div className="section-title">
                <Reveal as="h2" variant="fade-in"><T k="benefits.title" /></Reveal>
                <Reveal as="p" variant="fade-in" delay={0.1}><T k="benefits.subtitle" /></Reveal>
            </div>

            <PremiumStatsBanner />

            <div className="demo-block">
                <Reveal variant="slide-in-left" className="demo-copy">
                    <span className="demo-eyebrow"><T k="demo.eyebrow" /></span>
                    <h3><T k="demo.title" /></h3>
                    <p className="demo-sub"><T k="demo.subtitle" /></p>
                    <ul className="demo-bullets">
                        <li><i className="fas fa-check"></i> <T k="demo.bullet1" /></li>
                        <li><i className="fas fa-check"></i> <T k="demo.bullet2" /></li>
                    </ul>
                </Reveal>
                <Reveal variant="fade-in" delay={0.15}>
                    <DemoVideo />
                </Reveal>
            </div>

            <RoiCalculator />

            <div className="benefits-premium-grid bento-section" ref={gridRef}>
                <GlobalSpotlight gridRef={gridRef} disableAnimations={isMobile} spotlightRadius={300} glowColor="37, 99, 235" />
                {BENEFIT_ROWS.map((row) => (
                    <Reveal key={row.titleKey} variant="fade-in" delay={row.delay}>
                        <ParticleCard
                            className="benefit-premium-card magic-bento-card--border-glow magic-bento-card"
                            disableAnimations={isMobile}
                            particleCount={9}
                            glowColor="37, 99, 235"
                            clickEffect
                        >
                            <div className="bpc-icon">
                                <i className={`fas ${row.icon}`}></i>
                            </div>
                            <h3><T k={row.titleKey} /></h3>
                            <T as="p" className="bpc-text" k={row.descKey} />
                        </ParticleCard>
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

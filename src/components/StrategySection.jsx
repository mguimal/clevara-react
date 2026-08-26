import { T } from '../i18n/I18nContext';
import Reveal from './Reveal';
import { handleAnchorClick } from '../lib/smoothScroll';
import useTilt from '../hooks/useTilt';

const ANALYSIS_KEYS = [1, 2, 3, 4, 5, 6].map((n) => `strategy.card.details.analysis${n}`);
const INTEG_KEYS = [1, 2, 3, 4, 5, 6].map((n) => `strategy.card.details.integ${n}`);

export default function StrategySection({ expandedCard, onToggleCard }) {
    const tilt = useTilt(expandedCard === 'strategy', 2);
    return (
        <section id="strategy" className="strategy-section">
            <div className="strategy-content-wrapper">
                <div className="section-title">
                    <Reveal as="h2" variant="fade-in">
                        CleBot™ <span style={{ color: '#7c3aed' }}><T k="strategy.title" /></span>
                    </Reveal>
                    <Reveal as="p" variant="fade-in" delay={0.1}><T k="strategy.subtitle" /></Reveal>
                </div>
                <Reveal className="strategy-wrapper" delay={0.2}>
                    <div
                        className={`service-card strategy${expandedCard === 'strategy' ? ' expanded' : ''}`}
                        {...tilt}
                        onClick={() => onToggleCard('strategy')}
                    >
                        <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
                            CleBot™ <span className="clebot-name"><T k="strategy.card.name" /></span>
                        </h3>
                        <p className="service-tagline"><T k="strategy.card.tagline" /></p>
                        <div className="plan-card-header">
                            <div className="plan-price" style={{ color: 'var(--text-color)' }}>
                                <T k="strategy.card.price" />
                            </div>
                            <div className="plan-price-sub"><T k="strategy.card.priceSub" /></div>
                        </div>
                        <div className="card-features-mini horizontal" style={{ justifyContent: 'center' }}>
                            <T as="span" className="feature-gradient-text" k="strategy.card.feature" />
                        </div>
                        <p className="service-summary"><T k="strategy.card.summary" /></p>
                        <div className="service-details">
                            <div className="service-details-content">
                                <div className="service-details-column">
                                    <div>
                                        <h4><T k="strategy.card.details.analysisTitle" /></h4>
                                        <ul>
                                            {ANALYSIS_KEYS.map((key) => (
                                                <li key={key}><T k={key} /></li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4><T k="strategy.card.details.integrationsTitle" /></h4>
                                        <ul>
                                            {INTEG_KEYS.map((key) => (
                                                <li key={key}><T k={key} /></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="service-details-column">
                                    <div className="benefits-grid">
                                        {[1, 2, 3, 4].map((n) => (
                                            <Reveal
                                                as="div"
                                                variant="stagger-item"
                                                delay={(n - 1) * 0.05}
                                                className="benefit-item"
                                                key={n}
                                            >
                                                <h5><T k={`strategy.card.benefits.b${n}.title`} /></h5>
                                                <p><T k={`strategy.card.benefits.b${n}.desc`} /></p>
                                            </Reveal>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="expand-indicator">
                            <i className="fas fa-chevron-down"></i>
                        </div>
                    </div>
                </Reveal>
                <Reveal className="section-cta" delay={0.25}>
                    <a href="#contacto" className="cta-button" onClick={(e) => handleAnchorClick(e, '#contacto')}>
                        <T k="strategy.cta" />
                    </a>
                </Reveal>
            </div>
        </section>
    );
}

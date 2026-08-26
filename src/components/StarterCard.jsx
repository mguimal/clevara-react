import { T } from '../i18n/I18nContext';
import Reveal from './Reveal';
import { STARTER_BLOCKS } from '../data/content';
import { handleAnchorClick } from '../lib/smoothScroll';
import useTilt from '../hooks/useTilt';

export default function StarterCard({ expanded, onToggle }) {
    const tilt = useTilt(expanded, 2);
    return (
        <Reveal className="starter-wrapper" delay={0.15}>
            <div className="starter-badge"><T k="clebots.starter.badge" /></div>
            <div
                className={`service-card starter${expanded ? ' expanded' : ''}`}
                    {...tilt}
                onClick={(e) => {
                    if (e.target.closest('.starter-block') || e.target.closest('.starter-trust')) return;
                    onToggle('starter');
                }}
            >
                <h3>CleBot™ <span className="clebot-name"><T k="clebots.starter.name" /></span></h3>
                <p className="service-tagline"><T k="clebots.starter.tagline" /></p>
                <div className="card-features-mini horizontal">
                    <T as="span" className="feature-gradient-text" k="clebots.starter.feature" />
                </div>
                <div className="card-divider">
                    <span><T k="clebots.starter.idealLabel" /></span>
                </div>
                <p className="card-ideal-for" style={{ color: '#10b981' }}>
                    <T k="clebots.starter.idealValue" />
                </p>
                <div className="starter-blocks">
                    {STARTER_BLOCKS.map((block) => (
                        <div className="starter-block" key={block.titleKey}>
                            <div className="block-title"><T k={block.titleKey} /></div>
                            <div className="block-sub"><T k={block.subKey} /></div>
                        </div>
                    ))}
                </div>
                <p className="starter-trust"><T k="clebots.starter.trust" /></p>
                <p className="service-summary"><T k="clebots.starter.summary" /></p>
                <div className="service-details">
                    <div className="service-details-content">
                        <div className="service-details-column">
                            <div>
                                <h4><T k="clebots.starter.details.featuresTitle" /></h4>
                                <ul>
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <li key={n}><T k={`clebots.starter.details.feature${n}`} /></li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4><T k="clebots.starter.details.techTitle" /></h4>
                                <ul>
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <li key={n}><T k={`clebots.starter.details.tech${n}`} /></li>
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
                                        <h5><T k={`clebots.starter.benefits.b${n}.title`} /></h5>
                                        <p><T k={`clebots.starter.benefits.b${n}.desc`} /></p>
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
            <div className="starter-floating-btn">
                <a href="#contacto" className="cta-button small" onClick={(e) => handleAnchorClick(e, '#contacto')}>
                    <T k="clebots.starter.cta" />
                </a>
            </div>
        </Reveal>
    );
}

import { T } from '../i18n/I18nContext';
import Reveal from './Reveal';
import { INTEGRATIONS } from '../data/content';
import { handleAnchorClick } from '../lib/smoothScroll';

export default function IntegrationsSection() {
    return (
        <section id="integraciones" className="integraciones">
            <div className="section-title">
                <Reveal as="h2" variant="fade-in"><T k="int.title" /></Reveal>
                <Reveal as="p" variant="fade-in" delay={0.1}><T k="int.subtitle" /></Reveal>
            </div>
            <div className="int-grid">
                {INTEGRATIONS.map((intg) => (
                    <Reveal
                        key={intg.name}
                        variant="scale-in"
                        className="int-tile"
                    >
                        <span className="int-icon" style={{ background: `${'#'}${intg.color}14`, borderColor: `${'#'}${intg.color}30` }}>
                            <img
                                src={intg.logo || `https://www.google.com/s2/favicons?domain=${intg.domain}&sz=128`}
                                alt={intg.name}
                                loading="lazy"
                            />
                        </span>
                        <strong>{intg.name}</strong>
                        <small><T k={intg.subKey} /></small>
                    </Reveal>
                ))}
            </div>
            <p className="int-more-text">
                <i className="fas fa-plus"></i> <T k="int.more" />…
            </p>
            <Reveal className="int-note">
                <p>
                    <i className="fas fa-plug-circle-check"></i>{' '}
                    <T k="int.note" />{' '}
                    <a href="#contacto" onClick={(e) => handleAnchorClick(e, '#contacto')}>
                        <T k="int.noteCta" />
                    </a>
                </p>
            </Reveal>
        </section>
    );
}

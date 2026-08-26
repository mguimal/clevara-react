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
                {INTEGRATIONS.map((intg, i) => (
                    <Reveal
                        key={intg.name}
                        variant="scale-in"
                        delay={0.1 + i * 0.08}
                        className="int-tile"
                    >
                        <span className="int-icon" style={{ color: intg.color, background: `${intg.color}16`, borderColor: `${intg.color}33` }}>
                            <i className={intg.icon}></i>
                        </span>
                        <strong>{intg.name}</strong>
                        <small><T k={intg.subKey} /></small>
                    </Reveal>
                ))}
                <Reveal variant="scale-in" delay={0.55} className="int-tile int-more">
                    <span className="int-icon">
                        <i className="fas fa-plus"></i>
                    </span>
                    <strong><T k="int.more" /></strong>
                </Reveal>
            </div>
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

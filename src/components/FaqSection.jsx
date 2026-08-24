import { useState } from 'react';
import { T } from '../i18n/I18nContext';
import Reveal from './Reveal';
import { FAQS } from '../data/content';
import { handleAnchorClick } from '../lib/smoothScroll';

export default function FaqSection() {
    const [activeIdx, setActiveIdx] = useState(null);

    const toggle = (idx) => setActiveIdx((cur) => (cur === idx ? null : idx));

    return (
        <section id="faq" className="faq">
            <div className="section-title">
                <Reveal as="h2" variant="fade-in"><T k="faq.title" /></Reveal>
                <Reveal as="p" variant="fade-in" delay={0.1}><T k="faq.subtitle" /></Reveal>
            </div>
            <div className="faq-container">
                {FAQS.map((item, idx) => (
                    <Reveal key={item.q} variant="fade-in" delay={item.delay} className={`faq-item${activeIdx === idx ? ' active' : ''}`}>
                        <div className="faq-question" onClick={() => toggle(idx)}>
                            <h3><T k={item.q} /></h3>
                            <div className="faq-icon">
                                <i className="fas fa-chevron-down"></i>
                            </div>
                        </div>
                        <div className="faq-answer">
                            <div className="faq-answer-content">
                                <T as="p" k={item.a1} />
                                <ul>
                                    {item.lis.map((liKey) => (
                                        <li key={liKey}><T k={liKey} /></li>
                                    ))}
                                </ul>
                                <T as="p" k={item.a2} />
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
            <Reveal className="section-cta" delay={0.3}>
                <a href="#contacto" className="cta-button" onClick={(e) => handleAnchorClick(e, '#contacto')}>
                    <T k="faq.cta" />
                </a>
            </Reveal>
        </section>
    );
}

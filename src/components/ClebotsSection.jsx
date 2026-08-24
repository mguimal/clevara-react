import { useEffect, useRef, useState } from 'react';
import { T } from '../i18n/I18nContext';
import Reveal from './Reveal';
import PlanCard from './PlanCard';
import ComparisonTable from './ComparisonTable';
import StarterCard from './StarterCard';
import Prism from './Prism';
import { PLANS } from '../data/content';
import { handleAnchorClick } from '../lib/smoothScroll';

function PrismHero() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        if (!('IntersectionObserver' in window)) {
            setVisible(true);
            return undefined;
        }
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        io.disconnect();
                    }
                });
            },
            { threshold: 0.3 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div className={`clebots-prism-hero${visible ? ' prism-hero-visible' : ''}`} ref={ref}>
            <div className="clebots-prism-canvas" aria-hidden="true">
                <Prism
                    animationType="rotate"
                    timeScale={0.5}
                    height={3.5}
                    baseWidth={5.5}
                    scale={3.6}
                    hueShift={0}
                    colorFrequency={1}
                    noise={0.5}
                    glow={1.2}
                    bloom={1}
                    suspendWhenOffscreen
                />
                <div className="clebots-prism-tint"></div>
            </div>
            <div className="clebots-prism-content">
                <h2 className={`prism-title${visible ? ' animate-in' : ''}`}>
                    <T k="clebots.title" />
                </h2>
                <p className="prism-subtitle"><T k="clebots.subtitle" /></p>
            </div>
        </div>
    );
}

export default function ClebotsSection({ expandedCard, onToggleCard }) {
    return (
        <section id="clebots" className="clebots">
            <PrismHero />
            <div className="clebots-container">
                <StarterCard expanded={expandedCard === 'starter'} onToggle={onToggleCard} />
                <Reveal className="plans-wrapper" delay={0.2}>
                    <div className="services-horizontal">
                        {PLANS.map((plan) => (
                            <PlanCard
                                key={plan.id}
                                plan={plan}
                                expanded={expandedCard === plan.id}
                                onToggle={onToggleCard}
                            />
                        ))}
                    </div>
                </Reveal>
                <ComparisonTable />
                <Reveal className="section-cta" delay={0.4}>
                    <a href="#contacto" className="cta-button" onClick={(e) => handleAnchorClick(e, '#contacto')}>
                        <T k="clebots.cta" />
                    </a>
                </Reveal>
            </div>
        </section>
    );
}

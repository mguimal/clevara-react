import { T } from '../i18n/I18nContext';
import Reveal from './Reveal';
import PlanCard from './PlanCard';
import ComparisonTable from './ComparisonTable';
import StarterCard from './StarterCard';
import { PLANS } from '../data/content';
import { handleAnchorClick } from '../lib/smoothScroll';

export default function ClebotsSection({ expandedCard, onToggleCard }) {
    return (
        <section id="clebots" className="clebots">
            <div className="section-title">
                <Reveal as="h2" variant="fade-in"><T k="clebots.title" /></Reveal>
                <Reveal as="p" variant="fade-in" delay={0.1}><T k="clebots.subtitle" /></Reveal>
            </div>
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

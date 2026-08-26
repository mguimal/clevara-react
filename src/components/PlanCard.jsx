import { T } from '../i18n/I18nContext';
import Reveal from './Reveal';
import useTilt from '../hooks/useTilt';

function DetailsColumn({ blocks }) {
    return (
        <div className="service-details-column">
            {blocks.map((block, i) =>
                block.benefits ? (
                    <div className="benefits-grid" key={i}>
                        {block.benefits.map((b, j) => (
                            <Reveal as="div" variant="stagger-item" delay={j * 0.05} className="benefit-item" key={j}>
                                <h5><T k={b.titleKey} /></h5>
                                <p><T k={b.descKey} /></p>
                            </Reveal>
                        ))}
                    </div>
                ) : (
                    <div key={i}>
                        <h4><T k={block.headingKey} /></h4>
                        <ul>
                            {block.items.map((itemKey) => (
                                <li key={itemKey}><T k={itemKey} /></li>
                            ))}
                        </ul>
                    </div>
                )
            )}
        </div>
    );
}

export default function PlanCard({ plan, expanded, onToggle }) {
    const tilt = useTilt(expanded);
    return (
        <div
            className={`service-card ${plan.id}${expanded ? ' expanded' : ''}`}
            onClick={() => onToggle(plan.id)}
            {...tilt}
        >
            <h3>CleBot™ <span className="clebot-name"><T k={`clebots.${plan.id}.name`} /></span></h3>
            <p className="service-tagline"><T k={`clebots.${plan.id}.tagline`} /></p>
            <div className="card-features-mini vertical">
                <T as="span" className="feature-gradient-text" k={`clebots.${plan.id}.feature`} />
            </div>
            <div className="card-divider">
                <span><T k={`clebots.${plan.id}.idealLabel`} /></span>
            </div>
            <p className="card-ideal-for" style={{ color: `var(${plan.colorVar})` }}>
                <T k={`clebots.${plan.id}.idealValue`} />
            </p>
            <p className="service-summary"><T k={`clebots.${plan.id}.summary`} /></p>
            <div className="service-details">
                <div className="service-details-content">
                    {plan.columns.map((blocks, i) => (
                        <DetailsColumn key={i} blocks={blocks} />
                    ))}
                </div>
            </div>
            <div className="expand-indicator">
                <i className="fas fa-chevron-down"></i>
            </div>
        </div>
    );
}

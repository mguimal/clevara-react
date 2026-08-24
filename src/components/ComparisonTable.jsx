import { useEffect, useRef } from 'react';
import { useI18n, T } from '../i18n/I18nContext';
import Reveal from './Reveal';
import { COMPARE_FEATURES, COMPARE_PLANS } from '../data/content';

export default function ComparisonTable() {
    const featuresRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        function alignFeatures() {
            if (featuresRef.current && headerRef.current) {
                featuresRef.current.style.paddingTop =
                    headerRef.current.getBoundingClientRect().height + 'px';
            }
        }
        alignFeatures();
        window.addEventListener('resize', alignFeatures);
        return () => window.removeEventListener('resize', alignFeatures);
    }, []);

    return (
        <Reveal className="comparison-wrapper" delay={0.3}>
            <div className="comparison-header">
                <h2 className="comparison-title"><T k="compare.title" /></h2>
                <p className="comparison-subtitle"><T k="compare.subtitle" /></p>
            </div>
            <div className="comparison-container">
                <div className="features-col" id="featuresCol" ref={featuresRef}>
                    {COMPARE_FEATURES.map((key) => (
                        <div className="feature-text" key={key}><T k={key} /></div>
                    ))}
                </div>
                {COMPARE_PLANS.map((plan) => (
                    <div className="plan-column" key={plan.cls}>
                        <div className={`plan-card ${plan.cls}`}>
                            <div className="plan-badge"><T k={`${plan.prefix}.badge`} /></div>
                            <div
                                className="plan-card-header"
                                ref={plan.cls === 'lite' ? headerRef : undefined}
                            >
                                <div className="plan-name"><T k={`${plan.prefix}.name`} /></div>
                                <div className="plan-price"><T k={`${plan.prefix}.price`} /></div>
                                <div className="plan-price-sub"><T k={`${plan.prefix}.priceSub`} /></div>
                                <div className="plan-monthly-fee">
                                    <i className="fas fa-sync-alt"></i> <span><T k={`${plan.prefix}.monthly`} /></span>
                                </div>
                            </div>
                            <div className="feature-icons">
                                {plan.checks.map((ok, i) => (
                                    <div className="icon-row" key={i}>
                                        <span className="icon-cell">
                                            <i className={`fas ${ok ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <p className="pricing-note" style={{ marginTop: '40px' }}>
                <i className="fas fa-circle-info"></i> <span><T k="compare.note" /></span>
            </p>
        </Reveal>
    );
}

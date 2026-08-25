import { T } from '../i18n/I18nContext';
import CountUp from './CountUp';

export default function StatsBand() {
    return (
        <div className="stats-band">
            <div className="sb-item">
                <CountUp end={120} prefix="+" />
                <span className="sb-label"><T k="about.intro.stat1" /></span>
            </div>
            <div className="sb-item">
                <CountUp end={65} suffix="%" />
                <span className="sb-label"><T k="about.intro.stat2" /></span>
            </div>
            <div className="sb-item">
                <span className="sb-static">24/7</span>
                <span className="sb-label"><T k="stats.availability" /></span>
            </div>
            <div className="sb-item">
                <span className="sb-static">100%</span>
                <span className="sb-label"><T k="stats.precision" /></span>
            </div>
        </div>
    );
}

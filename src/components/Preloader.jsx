import { useEffect, useState } from 'react';
import { LOGO_URL } from '../data/content';

export default function Preloader() {
    const [done, setDone] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const t1 = setTimeout(() => setDone(true), 850);
        const t2 = setTimeout(() => setHidden(true), 1450);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    if (hidden) return null;

    return (
        <div className={`preloader${done ? ' done' : ''}`} aria-hidden="true">
            <div className="preloader-inner">
                <img src={LOGO_URL} alt="Clevara Studios™" />
                <span className="preloader-bar"><span></span></span>
            </div>
        </div>
    );
}

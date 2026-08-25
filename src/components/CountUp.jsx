import { useEffect, useRef, useState } from 'react';

export default function CountUp({ end = 0, prefix = '', suffix = '', duration = 1800 }) {
    const ref = useRef(null);
    const [value, setValue] = useState(0);
    const startedRef = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        if (!('IntersectionObserver' in window)) {
            setValue(end);
            return undefined;
        }
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !startedRef.current) {
                        startedRef.current = true;
                        io.disconnect();
                        const t0 = performance.now();
                        const tick = (now) => {
                            const p = Math.min(1, (now - t0) / duration);
                            const eased = 1 - Math.pow(1 - p, 4);
                            setValue(Math.round(eased * end));
                            if (p < 1) requestAnimationFrame(tick);
                        };
                        requestAnimationFrame(tick);
                    }
                });
            },
            { threshold: 0.5 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [end, duration]);

    return (
        <span ref={ref} className="stat-number">
            {prefix}
            {value}
            {suffix}
        </span>
    );
}

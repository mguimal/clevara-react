import { useCallback } from 'react';

export default function useTilt(disabled = false, intensity = 1) {
    const onMouseEnter = useCallback((e) => {
        e.currentTarget.style.transition = 'transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
    }, []);

    const onMouseMove = useCallback(
        (e) => {
            if (disabled) return;
            const el = e.currentTarget;
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            const rx = (-py * 9 * intensity).toFixed(2);
            const ry = (px * 12 * intensity).toFixed(2);
            const lift = Math.min(4 + intensity * 2, 10).toFixed(1);
            el.style.transition = 'transform 0.06s linear, box-shadow 0.3s ease, border-color 0.3s ease';
            el.style.transform = `translateY(-${lift}px) perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        },
        [disabled, intensity]
    );

    const onMouseLeave = useCallback((e) => {
        const el = e.currentTarget;
        el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease, border-color 0.3s ease';
        el.style.transform = '';
    }, []);

    return { onMouseEnter, onMouseMove, onMouseLeave };
}

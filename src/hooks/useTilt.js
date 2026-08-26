import { useCallback } from 'react';

export default function useTilt(disabled = false) {
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
            el.style.transition = 'transform 0.06s linear, box-shadow 0.3s ease, border-color 0.3s ease';
            el.style.transform = `translateY(-4px) perspective(1100px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg)`;
        },
        [disabled]
    );

    const onMouseLeave = useCallback((e) => {
        const el = e.currentTarget;
        el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease, border-color 0.3s ease';
        el.style.transform = '';
    }, []);

    return { onMouseEnter, onMouseMove, onMouseLeave };
}

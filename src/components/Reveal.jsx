import { useEffect, useRef, useState } from 'react';

export default function Reveal({
    as: Tag = 'div',
    variant = 'fade-in',
    delay = 0,
    className = '',
    style,
    children,
    ...rest
}) {
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
            { rootMargin: '-50px 0px -50px 0px', threshold: 0 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const cls = `${variant}${visible ? ' visible' : ''}${className ? ` ${className}` : ''}`;

    return (
        <Tag
            ref={ref}
            className={cls}
            style={delay ? { ...style, transitionDelay: `${delay}s` } : style}
            {...rest}
        >
            {children}
        </Tag>
    );
}

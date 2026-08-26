import './MagicBento.css';
import { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';

const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '37, 99, 235'; // azul de marca Clevara
const MOBILE_BREAKPOINT = 768;

export const useMobileDetection = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);
    return isMobile;
};

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
    const el = document.createElement('div');
    el.className = 'mb-particle';
    el.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgba(${color}, 1);
        box-shadow: 0 0 6px rgba(${color}, 0.6);
        pointer-events: none;
        z-index: 100;
        left: ${x}px;
        top: ${y}px;
    `;
    return el;
};

const calculateSpotlightValues = (radius) => ({
    proximity: radius * 0.5,
    fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
    const rect = card.getBoundingClientRect();
    const relativeX = ((mouseX - rect.left) / rect.width) * 100;
    const relativeY = ((mouseY - rect.top) / rect.height) * 100;
    card.style.setProperty('--glow-x', `${relativeX}%`);
    card.style.setProperty('--glow-y', `${relativeY}%`);
    card.style.setProperty('--glow-intensity', glow.toString());
    card.style.setProperty('--glow-radius', `${radius}px`);
};

export const ParticleCard = ({
    children,
    className = '',
    disableAnimations = false,
    style,
    particleCount = 10,
    glowColor = DEFAULT_GLOW_COLOR,
    clickEffect = true,
}) => {
    const cardRef = useRef(null);
    const particlesRef = useRef([]);
    const timeoutsRef = useRef([]);
    const isHoveredRef = useRef(false);
    const memoizedParticles = useRef([]);
    const particlesInitialized = useRef(false);

    const initializeParticles = useCallback(() => {
        if (particlesInitialized.current || !cardRef.current) return;
        const { width, height } = cardRef.current.getBoundingClientRect();
        memoizedParticles.current = Array.from({ length: particleCount }, () =>
            createParticleElement(Math.random() * width, Math.random() * height, glowColor)
        );
        particlesInitialized.current = true;
    }, [particleCount, glowColor]);

    const clearAllParticles = useCallback(() => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
        particlesRef.current.forEach((particle) => {
            gsap.to(particle, {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'back.in(1.7)',
                onComplete: () => particle.parentNode?.removeChild(particle),
            });
        });
        particlesRef.current = [];
    }, []);

    const animateParticles = useCallback(() => {
        if (!cardRef.current || !isHoveredRef.current) return;
        if (!particlesInitialized.current) initializeParticles();

        memoizedParticles.current.forEach((particle, index) => {
            const timeoutId = setTimeout(() => {
                if (!isHoveredRef.current || !cardRef.current) return;
                const clone = particle.cloneNode(true);
                cardRef.current.appendChild(clone);
                particlesRef.current.push(clone);

                gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
                gsap.to(clone, {
                    x: (Math.random() - 0.5) * 90,
                    y: (Math.random() - 0.5) * 70,
                    rotation: Math.random() * 360,
                    duration: 2 + Math.random() * 2,
                    ease: 'none',
                    repeat: -1,
                    yoyo: true,
                });
                gsap.to(clone, { opacity: 0.35, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
            }, index * 110);
            timeoutsRef.current.push(timeoutId);
        });
    }, [initializeParticles]);

    useEffect(() => {
        if (disableAnimations || !cardRef.current) return;
        const element = cardRef.current;

        const handleMouseEnter = () => {
            isHoveredRef.current = true;
            animateParticles();
        };
        const handleMouseLeave = () => {
            isHoveredRef.current = false;
            clearAllParticles();
        };
        const handleClick = (e) => {
            if (!clickEffect) return;
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const maxDistance = Math.max(
                Math.hypot(x, y),
                Math.hypot(x - rect.width, y),
                Math.hypot(x, y - rect.height),
                Math.hypot(x - rect.width, y - rect.height)
            );
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position:absolute;width:${maxDistance * 2}px;height:${maxDistance * 2}px;border-radius:50%;
                background:radial-gradient(circle,rgba(${glowColor},0.35) 0%,rgba(${glowColor},0.15) 35%,transparent 70%);
                left:${x - maxDistance}px;top:${y - maxDistance}px;pointer-events:none;z-index:50;
            `;
            element.appendChild(ripple);
            gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() });
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('click', handleClick);
        return () => {
            isHoveredRef.current = false;
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.removeEventListener('click', handleClick);
            clearAllParticles();
        };
    }, [animateParticles, clearAllParticles, disableAnimations, clickEffect, glowColor]);

    return (
        <div
            ref={cardRef}
            className={`${className} mb-particle-container`}
            style={{ ...style, position: 'relative', overflow: 'hidden' }}
        >
            {children}
        </div>
    );
};

export const GlobalSpotlight = ({ gridRef, disableAnimations = false, enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR }) => {
    const spotlightRef = useRef(null);

    useEffect(() => {
        if (disableAnimations || !gridRef?.current || !enabled) return;

        const spotlight = document.createElement('div');
        spotlight.className = 'global-spotlight';
        spotlight.style.cssText = `
            position: fixed;
            width: 800px;
            height: 800px;
            border-radius: 50%;
            pointer-events: none;
            background: radial-gradient(circle,
                rgba(${glowColor}, 0.10) 0%,
                rgba(${glowColor}, 0.05) 20%,
                rgba(${glowColor}, 0.02) 40%,
                transparent 70%);
            z-index: 5;
            opacity: 0;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(spotlight);
        spotlightRef.current = spotlight;

        const handleMouseMove = (e) => {
            if (!spotlightRef.current || !gridRef.current) return;
            const section = gridRef.current.closest('.bento-section');
            const rect = section?.getBoundingClientRect();
            const mouseInside =
                rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
            const cards = gridRef.current.querySelectorAll('.magic-bento-card');

            if (!mouseInside) {
                gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
                cards.forEach((card) => card.style.setProperty('--glow-intensity', '0'));
                return;
            }

            const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
            let minDistance = Infinity;

            cards.forEach((card) => {
                const cardRect = card.getBoundingClientRect();
                const centerX = cardRect.left + cardRect.width / 2;
                const centerY = cardRect.top + cardRect.height / 2;
                const distance =
                    Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
                const effectiveDistance = Math.max(0, distance);
                minDistance = Math.min(minDistance, effectiveDistance);

                let glowIntensity = 0;
                if (effectiveDistance <= proximity) glowIntensity = 1;
                else if (effectiveDistance <= fadeDistance)
                    glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);

                updateCardGlowProperties(card, e.clientX, e.clientY, glowIntensity, spotlightRadius);
            });

            gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.12, ease: 'power2.out' });

            const targetOpacity =
                minDistance <= proximity ? 0.55 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.55 : 0;
            gsap.to(spotlightRef.current, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.45, ease: 'power2.out' });
        };

        const handleMouseLeave = () => {
            gridRef.current?.querySelectorAll('.magic-bento-card').forEach((card) => card.style.setProperty('--glow-intensity', '0'));
            if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
        };
    }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

    return null;
};

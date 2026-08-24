export function initSmoothScroll() {
    const E = 0.08;
    let cy = window.pageYOffset, ty = cy, ay = cy, sh = 0, vh = 0, ms = 0, rid = null, pu = 0, ia = false;

    function rb() { sh = document.documentElement.scrollHeight; vh = window.innerHeight; ms = Math.max(0, sh - vh); }
    function cl(y) { return y < 0 ? 0 : y > ms ? ms : y; }

    function tick() {
        if (Date.now() < pu) {
            if (Math.abs(ay - ty) < 0.3) { ay = ty; cy = ty; window.scrollTo(0, ay); ia = false; return; }
            ay += (ty - ay) * 0.25; cy = ay; window.scrollTo(0, ay);
            rid = requestAnimationFrame(tick); return;
        }
        const d = ty - ay;
        if (Math.abs(d) < 0.3) { ay = ty; cy = ty; window.scrollTo(0, ay); ia = false; return; }
        ay += d * E; cy = ay; window.scrollTo(0, ay);
        rid = requestAnimationFrame(tick);
    }

    function el() { if (!ia) { ia = true; rid = requestAnimationFrame(tick); } }

    window.smoothScrollToY = function (y) { rb(); ty = cl(y); pu = Date.now() + 600; el(); };

    function ow(e) { e.preventDefault(); rb(); ty = cl(ty + e.deltaY); pu = 0; el(); }

    let lty = null, ltx = null, ldir = 0;

    function getHorizontalScroller(el) {
        while (el && el !== document.documentElement) {
            if (el.scrollWidth > el.clientWidth + 1) {
                const s = getComputedStyle(el);
                if ((s.overflowX === 'auto' || s.overflowX === 'scroll') && s.overflowY !== 'auto' && s.overflowY !== 'scroll') return el;
            }
            el = el.parentElement;
        }
        return null;
    }

    function ots(e) { lty = e.touches[0].clientY; ltx = e.touches[0].clientX; ldir = 0; }

    function otm(e) {
        if (lty === null) return;
        const y = e.touches[0].clientY, x = e.touches[0].clientX;
        const dy = lty - y, dx = x - ltx;
        if (ldir === 0) {
            const ady = Math.abs(dy), adx = Math.abs(dx);
            if (ady + adx < 6) return;
            const hs = getHorizontalScroller(e.target);
            if (hs) { ldir = adx > ady ? 1 : 2; } else { ldir = 2; }
        }
        if (ldir === 1) return;
        e.preventDefault();
        rb();
        ty = cl(ty + dy * 1.2);
        lty = y; ltx = x;
        pu = 0;
        el();
    }

    function ote() { lty = null; ltx = null; ldir = 0; }

    const onResize = () => { rb(); ty = cl(ty); };
    const onLoad = () => rb();

    window.addEventListener('resize', onResize);
    window.addEventListener('load', onLoad);
    rb();
    window.addEventListener('wheel', ow, { passive: false });
    window.addEventListener('touchstart', ots, { passive: true });
    window.addEventListener('touchmove', otm, { passive: false });
    window.addEventListener('touchend', ote);
    window.addEventListener('touchcancel', ote);

    return function cleanup() {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('load', onLoad);
        window.removeEventListener('wheel', ow);
        window.removeEventListener('touchstart', ots);
        window.removeEventListener('touchmove', otm);
        window.removeEventListener('touchend', ote);
        window.removeEventListener('touchcancel', ote);
        delete window.smoothScrollToY;
        if (rid) cancelAnimationFrame(rid);
    };
}

export function scrollToSection(href) {
    if (!href || href.length < 2) return;
    const target = document.querySelector(href);
    if (target && typeof window.smoothScrollToY === 'function') {
        window.smoothScrollToY(target.offsetTop - 70);
    } else if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

export function handleAnchorClick(e, href) {
    e.preventDefault();
    scrollToSection(href);
}

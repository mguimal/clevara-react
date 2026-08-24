export function initLowPowerDetection() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const lowMem = navigator.deviceMemory && navigator.deviceMemory <= 4;
    const lowCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

    const apply = (on) => document.documentElement.classList.toggle('low-power', on);

    if (navigator.getBattery) {
        navigator.getBattery().then((b) => {
            if (!b.charging && b.level <= 0.2) apply(true);
        }).catch(() => {});
    }
    if (reduce.matches || lowMem || lowCpu) apply(true);

    const onChange = (e) => apply(e.matches);
    if (reduce.addEventListener) reduce.addEventListener('change', onChange);

    return function cleanup() {
        if (reduce.removeEventListener) reduce.removeEventListener('change', onChange);
    };
}

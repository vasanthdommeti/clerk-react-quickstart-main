import { useEffect, useState } from 'react';

interface Options {
    threshold?: number;
    downDelay?: number;
}

export function useScrollHide(options: Options = {}) {
    const { threshold = 10, downDelay = 0 } = options;
    const [hidden, setHidden] = useState(false);
    const [atTop, setAtTop] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const update = () => {
            const current = window.scrollY;
            const diff = current - lastScrollY;
            setAtTop(current < 5);

            if (Math.abs(diff) > threshold) {
                if (diff > 0 && current > downDelay) {
                    setHidden(true);
                } else {
                    setHidden(false);
                }
                lastScrollY = current;
            }
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold, downDelay]);

    return { hidden, atTop };
}
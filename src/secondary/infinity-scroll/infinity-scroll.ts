import { useState, useRef, useCallback, useEffect } from 'react';

const DEFAULT_OPTIONS: IntersectionObserverInit = {
    root: null,
    rootMargin: '20px',
    threshold: 1.0
};

function useInfiniteScroll(
    options?: IntersectionObserverInit
): [number, React.Dispatch<React.SetStateAction<HTMLDivElement | null>>, () => void] {
    const [page, setPage] = useState(1);
    const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);

    const observer = useRef<IntersectionObserver>();

    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const [target] = entries;

        if (target.isIntersecting) {
            setPage((prev) => prev + 1);
        }
    }, []);

    const resetState = useCallback(() => {
        setPage(1);
    }, []);

    useEffect(() => {
        if (!lastElement) {
            return;
        }

        if (observer.current) {
            observer.current.disconnect();
        }

        const mergedOptions = { ...DEFAULT_OPTIONS, options };
        observer.current = new IntersectionObserver(handleObserver, mergedOptions);

        observer.current.observe(lastElement);

        return (): void => {
            observer.current?.disconnect();
        };
    }, [lastElement, options, handleObserver]);

    return [page, setLastElement, resetState];
}

export default useInfiniteScroll;

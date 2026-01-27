type MemoizedFunction<T extends (...args: any[]) => any> = T & {
    cache: Map<string, ReturnType<T>>;
    clear: () => void;
};

export const createMemoizer = <T extends (...args: any[]) => any>(
    fn: T,
    maxSize: number = 1000,
): MemoizedFunction<T> => {
    const cache = new Map<string, ReturnType<T>>();
    
    const memoized = ((...args: Parameters<T>): ReturnType<T> => {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key)!;
        }
        
        const result = fn(...args);
        cache.set(key, result);
        
        if (cache.size > maxSize) {
            const firstKey = cache.keys().next().value;
            if (firstKey !== undefined) {
                cache.delete(firstKey);
            }
        }
        
        return result;
    }) as MemoizedFunction<T>;

    memoized.cache = cache;
    memoized.clear = () => cache.clear();
    
    return memoized;
};

export const clearMemoCache = <T extends (...args: any[]) => any>(
    fn: MemoizedFunction<T>,
): void => {
    if (fn.clear) {
        fn.clear();
    }
};

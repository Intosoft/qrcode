export const createMemoizer = <T extends (...args: any[]) => any>(fn: T) => {
    const cache = new Map<string, ReturnType<T>>();
    
    return (...args: Parameters<T>): ReturnType<T> => {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key)!;
        }
        
        const result = fn(...args);
        cache.set(key, result);
        
        if (cache.size > 1000) {
            const firstKey = cache.keys().next().value;
            if (firstKey) {
                cache.delete(firstKey);
            }
        }
        
        return result;
    };
};

export const clearMemoCache = (fn: any) => {
    if (fn.cache) {
        fn.cache.clear();
    }
};

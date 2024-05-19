/**
 * Limits rate that a function can fire
 * @param func the function to be debounced
 * @param wait the time to wait
 * @param immediate optional, if true the function fires immediately
 * @returns 
 */
export function debounce(func: any, wait: number, immediate: boolean= false) {
    var timeout: any;
    return function(...args: any[]) {
        // Capture context and arguments of
        var context = this;
        clearTimeout(timeout);
        if (immediate && !timeout) func.apply(context, args);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
    };
    }
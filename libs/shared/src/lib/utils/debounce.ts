export function debounce(
    fn: Function,
    delay: number,
    immediate = false
): (...args: any[]) => void {
    let timeout: NodeJS.Timeout | null

    return function (this: any) {
        const context = this, args = arguments
        const later = function () {
            timeout = null
            if (!immediate) fn.apply(context, args)
        }

        const callNow = immediate && !timeout
        timeout && clearTimeout(timeout)
        timeout = setTimeout(later, delay)
        if (callNow) fn.apply(context, args)
    }
}

export function throttle(fn: Function, delay: number) {
    var time = Date.now();
    return function () {
        if ((time + delay - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}
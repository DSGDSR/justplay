export default function debounce(
        func: Function,
        delay: number,
        immediate = false
): (...args: any[]) => void {
        let timeout: Timer | null
        
        return function(this: any) {
            const context = this, args = arguments
            const later = function() {
                timeout = null
                if (!immediate) func.apply(context, args)
            }
    
            const callNow = immediate && !timeout
            timeout && clearTimeout(timeout)
            timeout = setTimeout(later, delay)
            if (callNow) func.apply(context, args)
        }
    }

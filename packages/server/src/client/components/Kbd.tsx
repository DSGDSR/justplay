const Kbd = ({children, className, ...props}: any) => {
    return <kbd className={`pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex ${className}`} {...props}>
        {children}
    </kbd>
}

export default Kbd
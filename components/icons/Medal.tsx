const Medal = ({ active, strokeWidth = 1.5, ...props }: {
    active: boolean
    strokeWidth?: number
}) => <svg width="24" height="24" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M12 4v3m-4 -3v6m8 -6v6"></path>
    <path d="M12 18.5l-3 1.5l.5 -3.5l-2 -2l3 -.5l1.5 -3l1.5 3l3 .5l-2 2l.5 3.5z" style={{
        fill: active ? 'hsl(var(--primary))' : 'none',
        stroke: active ? 'hsl(var(--primary))' : 'currentColor',
    }}></path>
</svg>

export default Medal
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<SVGElement> {
    active: boolean
    strokeWidth?: number
}

const Heart = ({ active, strokeWidth = 1.5, ...props }: Props) => <svg width="24" height="24" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" style={{
        fill: active ? 'hsl(var(--primary))' : 'none',
    }}></path>
</svg>

export default Heart
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<SVGElement> {
    active: boolean
    strokeWidth?: number
}

const Gamepad = ({ active, strokeWidth = 1.5, ...props }: Props) => <svg width="24" height="24" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M12 5h3.5a5 5 0 0 1 0 10h-5.5l-4.015 4.227a2.3 2.3 0 0 1 -3.923 -2.035l1.634 -8.173a5 5 0 0 1 4.904 -4.019h3.4z" style={{
        fill: active ? 'hsl(var(--primary))' : 'none',
    }}></path>
    <path d="M14 15l4.07 4.284a2.3 2.3 0 0 0 3.925 -2.023l-1.6 -8.232" style={{
        fill: active ? 'hsl(var(--primary))' : 'none',
    }}></path>
    <path d="M8 9v2"></path>
    <path d="M7 10h2"></path>
    <path d="M14 10h2"></path>
</svg>

export default Gamepad
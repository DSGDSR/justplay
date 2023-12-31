import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<SVGElement> {
    direction: 'up' | 'down' | 'left' | 'right'
    strokeWidth?: number
}

const Chevron = ({ direction = 'up', strokeWidth = 1.5, ...props }: Props) => <svg width="24" height="24" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    { direction === 'up' ? <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M6 15l6 -6l6 6"></path>
    </> : <></> }
    { direction === 'right' ? <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M9 6l6 6l-6 6"></path>
    </> : <></> }
    { direction === 'down' ? <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M6 9l6 6l6 -6"></path>
    </> : <></> }
    { direction === 'left' ? <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M15 6l-6 6l6 6"></path>
    </> : <></> }
</svg>

export default Chevron
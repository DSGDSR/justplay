import { SVGProps } from 'react'

interface Props extends SVGProps<SVGSVGElement> {
    noIcon?: boolean
}

const DefaultThumb = ({ noIcon, ...props }: Props) => <svg viewBox="0 0 176 176" {...props}>
    <g>
        <g>
            <rect width="176" height="176" fill="hsl(var(--secondary))"/>
        </g>
        { !noIcon ? <g>
            <path d="M87.85,47.24h19a27.18,27.18,0,1,1,0,54.35H77l-21.82,23A12.5,12.5,0,0,1,33.84,113.5l8.88-44.42A27.18,27.18,0,0,1,69.37,47.24Z" fill="none" stroke="#f6f6f6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7.5"/>
            <path d="M98.72,101.59l22.12,23.28a12.5,12.5,0,0,0,21.33-11l-8.69-44.74" fill="none" stroke="#f6f6f6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7.5"/>
            <path d="M66.11,69V79.85" fill="none" stroke="#f6f6f6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7.5"/>
            <path d="M60.68,74.41H71.55" fill="none" stroke="#f6f6f6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7.5"/>
            <path d="M98.72,74.41h10.87" fill="none" stroke="#f6f6f6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7.5"/>
        </g> : <></> }
    </g>
</svg>

export default DefaultThumb
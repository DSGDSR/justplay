const ArrowDown = (props: {
    size?: number;
    color?: string;
}) => {
    const { size = 14, color = '#a1a1aa' } = props;
    return <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 5l0 14" />
        <path d="M18 13l-6 6" />
        <path d="M6 13l6 6" />
    </svg>
}

export default ArrowDown
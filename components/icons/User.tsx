const User = (props: {
    size?: number;
    color?: string;
    strokeWidth?: number;
}) => {
    const { size = 30, color = '#afafaf', strokeWidth = 1.5 } = props;
    return <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    </svg>
}

export default User
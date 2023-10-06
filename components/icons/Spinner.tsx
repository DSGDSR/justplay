
export default (props: {
    size?: number;
    color?: string;
}) => {
    const { size = 20, color = 'white' } = props;
    return <svg className="animate-spin" width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
}
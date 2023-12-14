import { cn } from '@/lib/utils';

const Search = (props: {
    size?: number;
    strokeWidth?: number;
    className?: string;
    [key: string]: any;
}) => {
    const { size = 20, strokeWidth = 1.5, className, ...rest } = props;
    return <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" className={cn('stroke-white', className)} {...rest}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
    </svg>
}

export default Search
import { cn } from '@/lib/utils';

const Spinner = (props: {
    size?: number;
    color?: string;
    className?: string;
    strokeWidth?: number;
    [key: string]: any;
}) => {
    const { size = 20, color = 'white', className, strokeWidth = 1.5, ...rest } = props;
    return <svg className={cn('animate-spin', className)} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...rest}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
}

export default Spinner
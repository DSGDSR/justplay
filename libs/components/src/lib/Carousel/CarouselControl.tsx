import { cn } from "@wheretoplay/shared/utils";

interface CarouselControlProps {
    selected: boolean;
    onClick: () => void;
}

const CarouselControl = ({ selected, onClick }: CarouselControlProps) => <button
    className={'border-4 border-transparent'}
    onClick={onClick}
>
    <span className={cn('w-1.5 h-1.5 text-gray-700 rounded-full bg-gray-400 flex justify-center items-center transition-all',
        selected && 'bg-black w-4'
    )}></span>
</button>

export default CarouselControl
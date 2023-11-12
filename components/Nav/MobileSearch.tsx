'use client'

import MobileSearchBox from '../Search/mobile';
import { cn } from '@/lib/utils';
import { useScrollDirection } from '@/hooks/use-scroll-direction';

const MobileSearch = () => {
    const scrollDirection = useScrollDirection();

    return <div className={cn('block sm:hidden h-[52px] transition', scrollDirection === 'down' && 'h-0')}>
        <div className={cn('px-2.5 pb-3 absolute w-full translate-y-0 opacity-100 transition', scrollDirection === 'down' && '-translate-y-10 opacity-0 pointer-events-none')}>
            <MobileSearchBox />
        </div>
    </div>
}

export default MobileSearch
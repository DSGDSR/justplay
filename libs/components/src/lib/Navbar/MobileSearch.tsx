'use client';

import { cn } from '@wheretoplay/shared/utils';
import { useScrollDirection } from '@wheretoplay/shared/hooks';
import { SearchMobile, TSearchMethod } from '../Search';

interface MobileSearchProps {
  onSearch: TSearchMethod;
}

const MobileSearch = ({ onSearch }: MobileSearchProps) => {
  const scrollDirection = useScrollDirection();

  return (
    <div className={cn('block sm:hidden h-[52px] transition', scrollDirection === 'down' && 'h-0')}>
      <div
        className={cn(
          'px-2.5 pb-3 absolute w-full translate-y-0 opacity-100 transition',
          scrollDirection === 'down' && '-translate-y-10 opacity-0 pointer-events-none'
        )}
      >
        <SearchMobile onSearch={onSearch} />
      </div>
    </div>
  );
};

export default MobileSearch;

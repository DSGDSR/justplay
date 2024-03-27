'use client';

import { cn } from '@wheretoplay/shared/utils';
import { useState } from 'react';

const Ham = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((o) => !o);

  return (
    <menu onClick={toggleOpen} className="cursor-pointer sm:hidden">
      <svg
        className="opacity-100 sm:opacity-100 w-7"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M4 6l16 0" className={cn('transition', isOpen && 'opacity-0 [transform:translateY(12px)]')}></path>
        <path d="M4 12l16 0" className={cn('transition [transform-origin:center]', isOpen && '-rotate-45')}></path>
        <path d="M4 12l16 0" className={cn('transition [transform-origin:center]', isOpen && 'rotate-45')}></path>
        <path d="M4 18l16 0" className={cn('transition', isOpen && 'opacity-0 [transform:translateY(-12px)]')}></path>
      </svg>
    </menu>
  );
};

export default Ham;

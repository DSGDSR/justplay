'use client';

import { useState } from 'react';

interface Props {
  children: string;
  length?: number;
  ending?: string;
  className?: string;
}

export const ReadMore = ({ children, length = 100, className, ending = '...' }: Props) => {
  const [isReadMore, setIsReadMore] = useState(true);

  const truncateStringAtWhitespace = (text: string, length: number): string => {
    if (text.length <= length) return text;
    const lastSpace = text.slice(0, length).lastIndexOf(' ');
    return text.slice(0, lastSpace > 0 ? lastSpace : length) + ending;
  };

  return children.length > length ? (
    <p className={className}>
      {isReadMore ? (
        <>
          {truncateStringAtWhitespace(children, length)}
          <span onClick={() => setIsReadMore(false)} className="text-primary cursor-pointer">
            {' '}
            read more
          </span>
        </>
      ) : (
        children
      )}
    </p>
  ) : (
    children
  );
};

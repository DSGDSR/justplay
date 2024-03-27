'use client';

import { Dialog, DialogTrigger, DialogContent } from '../Dialog';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import SearchFooter from './SearchFooter';
import SearchList from './SearchList';
import { debounce, cleanQuery, cn } from '@wheretoplay/shared/utils';
import { IGameSearch, IHttpResponse } from '@wheretoplay/shared/models';
import { IconCommand, IconSearch, IconX } from '@tabler/icons-react';
import { Kbd } from '../Kbd';
import { Spinner } from '../icons';
import { NextResponse } from 'next/server';

export type TSearchMethod = (
  query: string,
  fastSearch?: boolean,
  limit?: number
) => NextResponse<IHttpResponse<IGameSearch[]>>;
export interface SearchProps {
  onSearch: TSearchMethod;
}

export const Search = ({ onSearch }: SearchProps) => {
  const [games, setGames] = useState<IGameSearch[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const [isSearching, setIsSearching] = useState(false);

  const keyHandler = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.code === 'KeyK') {
      // TODO key helper
      setIsOpen(true);
      event.stopPropagation();
    } else if (event.code === 'Escape') {
      setIsOpen(false);
      setTimeout(() => setGames(null), 500);
      event.stopPropagation();
    }
  };

  const loadGames = (response: IHttpResponse<IGameSearch[]>) => {
    if (response.success) {
      setGames(response.data);
    } else {
      setGames([]);
      // Error sonner toast
    }
  };

  /*const searchGames = (query: string) => {
        const response = await fetch(`${apiUrl}${Endpoint.SearchGames}`, {
            method: 'POST',
            body: JSON.stringify({ query, fastSearch: true }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return await response.json()
    }
    // MOBILE
    const searchGames = async (query: string, fastSearch = false) => {
        const response = await fetch(`${apiUrl}${Endpoint.SearchGames}`, {
            method: 'POST',
            body: JSON.stringify({ query, limit: 15, fastSearch }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return await response.json()
    }*/

  const debouncedSearch = debounce(async (query: string) => {
    if (!!query) {
      setIsSearching(true);
      const games: IHttpResponse<IGameSearch[]> = await onSearch(cleanQuery(query), true, 5).json();
      loadGames(games);
    } else {
      setGames(null);
    }

    setIsSearching(false);
  }, 650);

  useEffect(() => {
    window.addEventListener('keydown', keyHandler);

    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, []);

  const clearInput = (focus = true) => {
    if (input.current) {
      input.current.value = '';
      if (focus) input.current.focus();
    }
    setGames(null);
  };

  const close = () => {
    setTimeout(() => setIsOpen(false));
    clearInput();
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger onClick={() => setIsOpen(true)}>
        <div
          className={cn(
            'group inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-muted sm:bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-10 sm:h-9 px-4 py-2 relative w-full justify-between sm:justify-start text-sm text-muted-foreground sm:pr-12 sm:w-64'
          )}
        >
          <span className="inline-flex">Search games...</span>
          <span className="hidden sm:flex absolute right-1 top-1 gap-1 text-xs">
            <Kbd className="pt-[0.09em] px-[0.31em]" keys={[<IconCommand size={14} className="-mx-0.5" />, 'K']} />
          </span>
          <IconSearch
            size={18}
            strokeWidth={2}
            className="block sm:hidden transition-colors group-hover:stroke-accent-foreground stroke-muted-foreground"
          />
        </div>
      </DialogTrigger>
      <DialogContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={() => setIsOpen(false)}
        className="p-0 gap-0 flex flex-col max-w-xl"
        size={'small'}
        hideClose={true}
      >
        <header>
          <div className={clsx('flex items-center px-4 py-2', games !== null && 'border-b')}>
            <IconSearch className="stroke-[#a1a1aa]" size={22} />
            <input
              className="flex h-11 w-full rounded-md bg-transparent py-3 ml-3.5 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 pr-2"
              placeholder="Type a game name..."
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              ria-autocomplete="list"
              role="combobox"
              aria-controls="search-results"
              aria-expanded={games?.length ? 'true' : 'false'}
              type="text"
              autoFocus={true}
              ref={input}
              onChange={(event) => debouncedSearch(event.target.value)}
            />
            {isSearching ? (
              <Spinner color="#a1a1aa" size={20} />
            ) : input.current?.value && input.current?.value.length > 0 ? (
              <IconX className="stroke-[#a1a1aa] cursor-pointer" onClick={() => clearInput()} />
            ) : (
              <></>
            )}
          </div>
        </header>

        <SearchList games={games} onNavigate={close} />

        <SearchFooter />
      </DialogContent>
    </Dialog>
  );
};

export * from './SearchMobile';

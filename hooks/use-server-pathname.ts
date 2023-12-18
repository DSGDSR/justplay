import { headers } from 'next/headers';

export const useServerPathname = (): string  => {
    const headersList = headers()
    const domain = headersList.get('host') || '';
    const fullUrl = headersList.get('referer') || '';
    const [,pathname] = fullUrl.match( new RegExp(`https?:\/\/${domain}(.*)`))||[];
  
    return pathname;
  };
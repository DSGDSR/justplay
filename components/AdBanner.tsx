"use client"

import { cn } from '@/lib/utils';
import { useEffect } from 'react';

interface Props {
    className?: string;
    [key: string]: any;
}

const AdBanner = ({ className, ...props }: Props) => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ins
      className={cn("adsbygoogle adbanner-customize", className)}
      style={{
        display: 'block',
        overflow: 'hidden',
      }}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
      {...props}
    />
  );
};
export default AdBanner;
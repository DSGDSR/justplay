'use client'

import { cn } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';
import { ReactNode, useState } from 'react';

interface Props extends ImageProps {
    skeleton: ReactNode
}

const PreloadedImage = ({ alt, width, height, src, skeleton, className, ...props }: Props) => {
    const [loaded, setLoaded] = useState(false)

    return <>
        <Image
            className={cn(className, !loaded ? 'opacity-0 absolute' : 'opacity-100')}
            src={src}
            alt={alt}
            width={width}
            height={height}
            onLoadingComplete={() => setLoaded(true)}
            {...props}
        />
        { !loaded ? skeleton : <></>}
    </>
}

export default PreloadedImage

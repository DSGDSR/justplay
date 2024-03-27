'use client';

import { Dialog, DialogContent, DialogTrigger } from '../Dialog';
import { Button, ButtonProps } from '../Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../Tooltip';
import { IconPlayerPlay } from '@tabler/icons-react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

interface TrailerProps {
  name: string;
  id: string;
}

export const Trailer = ({ name, id }: TrailerProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <TrailerButton />
      </DialogTrigger>
      <DialogContent
        size={'embed'}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="aspect-video w-[720px]"
        id="trailer-video"
      >
        <LiteYouTubeEmbed
          id={id}
          title={`${name} - Trailer`}
          playlist={false}
          noCookie={true}
          playerClass="lty-playbtn"
        />
      </DialogContent>
    </Dialog>
  );
};

const TrailerButton = (props: ButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <>
          <Button className="hidden md:flex group" size="bubble" variant="secondary" {...props}>
            <IconPlayerPlay />
          </Button>
          <Button className="md:hidden group" variant="secondary" {...props}>
            <IconPlayerPlay className="w-4 sm:mr-2 sm:-ml-1" /> <span className="hidden sm:block">Trailer</span>
          </Button>
        </>
      </TooltipTrigger>
      <TooltipContent sideOffset={7.5}>Watch trailer</TooltipContent>
    </Tooltip>
  );
};

'use client';

import { Tooltip, TooltipTrigger, TooltipContent } from '../Tooltip';
import { Service, ServiceType, ServiceTypeNames } from '@wheretoplay/shared/enums';
import { IExternalGame } from '@wheretoplay/shared/models';
import { cn } from '@wheretoplay/shared/utils';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Xbox, Mac } from '../icons/platforms';
import {
  Steam,
  GOG,
  PlayStore,
  Amazon,
  AmazonLuna,
  EpicGames,
  Oculus,
  Utomik,
  ItchIo,
  PSStore,
  FocusEnt,
  EShop,
} from '../icons/services';

interface Props {
  services: Record<ServiceType, IExternalGame[]>;
}

export const Services = ({ services }: Props) => {
  return (
    <div className="flex flex-col">
      {services &&
        Object.keys(services)
          .filter((s) => services[s as ServiceType]?.length)
          .map((serviceType, idx) => {
            const servicesByType = services[serviceType as ServiceType];

            return (
              <div className="relative pl-6" key={serviceType}>
                <h4
                  className={cn(
                    'absolute left-0 h-full flex justify-center items-center uppercase w-6 font-semibold text-xs rotate-180 [writing-mode:vertical-lr]',
                    serviceType === ServiceType.Buy && 'bg-slate-700',
                    serviceType === ServiceType.Subscription && 'bg-slate-500',
                    serviceType === ServiceType.Streaming && 'bg-slate-300 text-slate-500'
                  )}
                >
                  {serviceType}
                </h4>
                <ul
                  className={cn(
                    'flex flex-wrap flex-grow border-slate-900 items-center gap-2 md:gap-3.5 pl-2.5 md:pl-3.5 py-2 md:py-3 border-t',
                    idx === Object.keys(servicesByType).length - 1 && 'border-b'
                  )}
                >
                  {servicesByType.map((service, idx) => (
                    <li key={idx}>{ServiceIcons[service.category]?.(service)}</li>
                  ))}
                </ul>
              </div>
            );
          })}
    </div>
  );
};

const ServiceIcon = ({
  children,
  className,
  service,
  url,
}: {
  children: ReactNode;
  className?: string;
  service: IExternalGame;
  url?: string;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Link
        href={url ?? '#'}
        target="_blank"
        className={cn(
          'flex items-center justify-center cursor-pointer scale-90 md:scale-100 w-14 h-14 rounded-lg bg-white',
          className
        )}
      >
        {children}
      </Link>
    </TooltipTrigger>
    <TooltipContent sideOffset={7.5}>{ServiceTypeNames[service.category]}</TooltipContent>
  </Tooltip>
);

export const ServiceIcons: Partial<Record<Service, (service: IExternalGame) => ReactNode>> = {
  [Service.Steam]: (s) => (
    <ServiceIcon
      className="pt-1 overflow-hidden bg-gradient-to-b from-[#152437] to-[#1f76a8]"
      url={`https://store.steampowered.com/app/${s.uid}`}
      service={s}
    >
      <Steam className="w-12 h-12 -ml-2" />
    </ServiceIcon>
  ),
  [Service.GOG]: (s) => (
    <ServiceIcon url={s.url} service={s}>
      <GOG />
    </ServiceIcon>
  ),
  [Service.Microsoft]: (s) => (
    <ServiceIcon url={s.url} service={s} className="bg-[#107b11]">
      <Xbox className="w-8 h-8 fill-white" />
    </ServiceIcon>
  ),
  [Service.Apple]: (s) => (
    <ServiceIcon url={s.url} service={s}>
      <Mac className="w-9 h-9" />
    </ServiceIcon>
  ),
  [Service.Android]: (s) => (
    <ServiceIcon url={s.url} service={s} className="bg-[#f7f8fa]">
      <PlayStore />
    </ServiceIcon>
  ),
  [Service.AmazonAsin]: (s) => (
    <ServiceIcon url={s.url} service={s} className="bg-[#f7f8fa]">
      <Amazon />
    </ServiceIcon>
  ),
  [Service.AmazonLuna]: (s) => (
    <ServiceIcon url={s.url} service={s} className="bg-[#9146ff]">
      <AmazonLuna />
    </ServiceIcon>
  ),
  [Service.EpicGame]: (s) => (
    <ServiceIcon url={s.url} service={s}>
      <EpicGames className="fill-white" />
    </ServiceIcon>
  ),
  [Service.Oculus]: (s) => (
    <ServiceIcon url={s.url} service={s}>
      <Oculus />
    </ServiceIcon>
  ),
  [Service.Utomik]: (s) => (
    <ServiceIcon url={s.url} service={s}>
      <Utomik />
    </ServiceIcon>
  ), // TODO - Utomik link not working as expected (http://localhost:3000/game/flame-keeper)
  [Service.ItchIo]: (s) => (
    <ServiceIcon url={s.url} service={s} className="bg-[#ff6260]">
      <ItchIo />
    </ServiceIcon>
  ),
  [Service.PSStore]: (s) => (
    <ServiceIcon url={s.url} service={s}>
      <PSStore />
    </ServiceIcon>
  ),
  [Service.FocusEntertainment]: (s) => (
    <ServiceIcon url={s.url} service={s}>
      <FocusEnt />
    </ServiceIcon>
  ),
  [Service.XboxGamePass]: (s) => (
    <ServiceIcon url={s.url} service={s} className="bg-[#107b11] flex flex-col gap-1.5">
      <Xbox className="w-6 h-6 fill-white" />
      <span className="text-[.45rem] text-white font-medium">GAME PASS</span>
    </ServiceIcon>
  ),
  [Service.EShop]: (s) => (
    <ServiceIcon url={s.url} className="bg-[#FF7D00]" service={s}>
      <EShop />
    </ServiceIcon>
  ),
};

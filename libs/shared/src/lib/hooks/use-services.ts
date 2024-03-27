import { useEffect, useState } from 'react';
import { ServiceType, ServiceByType, Service } from '../enums';
import { IExternalGame, IHttpResponse, eShopItem } from '../models';
import { uniqByKey } from '../utils';

export const useServices = (services: IExternalGame[], name?: string) => {
  const [refinedServices, setRefinedServices] = useState<Record<ServiceType, IExternalGame[]> | null>(null);
  const [eShop, setEShop] = useState<eShopItem | null>(null);

  useEffect(() => {
    if (name) {
      fetch(`/api/eshop/${name}`).then((res) =>
        res.json().then((data: IHttpResponse<eShopItem[]>) => {
          if (data.data?.length) setEShop(data.data[0]);
        })
      );
    }
  }, []);

  useEffect(() => {
    if (services) {
      const refinedServices = uniqByKey(services, (s) => s.category).reduce((acc, service) => {
        const serviceType = ServiceByType[service.category];

        if (serviceType !== undefined) {
          acc[serviceType] = serviceType in acc ? [...acc[serviceType], service] : [service];
        }

        return acc;
      }, {} as Record<ServiceType, IExternalGame[]>);

      if (eShop) {
        refinedServices[ServiceType.Buy] = [
          ...(refinedServices[ServiceType.Buy] ?? []),
          {
            category: Service.EShop,
            uid: eShop?.id,
            url: `https://www.nintendo.com/us/search/#q=${eShop?.title}`,
          } as IExternalGame,
        ];
      }

      // Order them as expected in the UI
      setRefinedServices({
        [ServiceType.Buy]: refinedServices[ServiceType.Buy],
        [ServiceType.Subscription]: refinedServices[ServiceType.Subscription],
        [ServiceType.Streaming]: refinedServices[ServiceType.Streaming],
      });
    }
  }, [services, eShop]);

  return refinedServices;
};

import { ServiceByType, ServiceType, Services } from "@/lib/enums"
import { eShopItem } from "@/lib/models/eshop"
import { IExternalGame } from "@/lib/models/game"
import { IHttpResponse } from "@/lib/models/response"
import { uniqByKey } from "@/lib/utils"
import { useEffect, useState } from "react"

const useServices = (services: IExternalGame[] | undefined, name: string) => {
    const [refinedServices, setRefinedServices] = useState<Record<ServiceType, IExternalGame[]> | null>(null)
    const [eShop, setEShop] = useState<eShopItem | null>(null)

    useEffect(() => {
        fetch(`/api/eshop/${name}`)
            .then(res => res.json().then((data: IHttpResponse<eShopItem[]>) => {
                if (data.data?.length) setEShop(data.data[0])
            }))
    }, [])

    useEffect(() => {
        if (services) {
            const refinedServices = uniqByKey(services, s => s.category).reduce((acc, service) => {
                const serviceType = ServiceByType[service.category]

                if (serviceType !== undefined) {
                    acc[serviceType] = serviceType in acc ? [...acc[serviceType], service] : [service]
                }

                return acc
            }, {} as Record<ServiceType, IExternalGame[]>)

            refinedServices[ServiceType.Buy] = [
                ...refinedServices[ServiceType.Buy] ?? [],
                ...eShop ? [{
                    category: Services.EShop,
                    uid: eShop?.id,
                    url: `https://nintendo.es${eShop?.url}`
                } as IExternalGame] : []
            ]
            setRefinedServices(refinedServices)
        }
    }, [services, eShop])

    return refinedServices
}

export default useServices
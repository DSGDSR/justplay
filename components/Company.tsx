'use client'

import { ICompany } from '@/lib/models/company'
import { IHttpResponse } from '@/lib/models/response'
import { useEffect, useState } from 'react'

interface Props {
    promise: Promise<IHttpResponse<ICompany>> | null
}

const Company = ({ promise }: Props) => {
    const [company, setCompany] = useState<ICompany | null>(null)

    useEffect(() => {
        promise?.then(({ data }) => setCompany(data))
               ?.catch(() => setCompany(null))
    }, [])

    return company ? <> by <strong>{company.name}</strong></> : <></>
}

export default Company
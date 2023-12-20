'use client'

import { ICompany } from '@/lib/models/company'
import { IHttpResponse } from '@/lib/models/response'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Props {
    promise: Promise<IHttpResponse<ICompany>> | null
    className?: string
}

const Company = ({ promise, className }: Props) => {
    const [company, setCompany] = useState<ICompany | null>(null)

    useEffect(() => {
        promise?.then(({ data }) => setCompany(data))
               ?.catch(() => setCompany(null))
    }, [])

    return company ? <span className={className}>
        <span className="hidden md:inline-block">&nbsp;by&nbsp;</span>
        <Link className="font-normal md:font-bold" href={company.url} target="_blank">
            {company.name}
        </Link>
    </span> : <></>
}

export default Company
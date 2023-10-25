import { Endpoints } from "@/lib/enums"
import { ICompany } from "@/lib/models/company"
import { IHttpResponse } from "@/lib/models/response"
import { apiUrl } from "@/lib/utils"
import { redirect } from "next/navigation"

export async function getCompany(id: number): Promise<IHttpResponse<ICompany>> {
    const url = `${apiUrl}${Endpoints.CompanyById}`
    const res = await fetch(url.replace(':id', id.toString()))

    if (!res.ok) redirect('/')// custtom 404 TODO ?
    return res.json()
}
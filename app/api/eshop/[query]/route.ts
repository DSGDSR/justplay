import { promises as fs } from 'fs';
import {
    InvalidParams,
    MissingParamsError,
    IGDBError,
    HttpResponse,
    similarity
} from "@/lib/utils"
import { NextRequest } from "next/server"
import { eShopItem } from '@/lib/models/eshop';

interface GETeShopGamesQuery {
    params: {
        query: string
    }
}

export async function GET(_request: NextRequest, query: GETeShopGamesQuery) {
    if (!query?.params?.query) return HttpResponse(null, false, MissingParamsError)
    if (typeof query.params.query !== 'string') return HttpResponse(null, false, InvalidParams)
    
    const { query: search } = query.params

    try {
        const file = await fs.readFile(process.cwd() + '/data/eshop.json', 'utf8');
        const json: eShopItem[] = JSON.parse(file)

        const results = json.filter(g => similarity(g.title, search) > 0.95)

        return HttpResponse(results)
    } catch (error) {
        return HttpResponse(null, false, IGDBError(String(error)))
    }
}
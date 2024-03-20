import { NextResponse } from "next/server";
import { IGameSearch, IHttpResponse } from "../models";
import { HttpResponse } from "../utils";
import searchMock from "./mocks/search.mock";

export const getSearchMock = (_query: string, _fastSearch?: boolean, limit = 5): NextResponse<IHttpResponse<IGameSearch[]>> => {
    return HttpResponse(searchMock.slice(0, limit));
}
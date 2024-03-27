import { NextResponse } from 'next/server';
import { IExternalGame, IGameSearch, IHttpResponse, IPlatform } from '../models';
import { HttpResponse } from '../utils';
import searchMock from './mocks/search.mock';
import platformsMock from './mocks/platforms.mock';
import servicesMock from './mocks/services.mock';

export const getSearchMock = (
  _query: string,
  _fastSearch?: boolean,
  limit = 5
): NextResponse<IHttpResponse<IGameSearch[]>> => {
  return HttpResponse(searchMock.slice(0, limit));
};

export const getPlatformsMock: IPlatform[] = platformsMock;

export const getServicesMock: IExternalGame[] = servicesMock;

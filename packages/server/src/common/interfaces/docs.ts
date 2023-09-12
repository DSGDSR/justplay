import type { OpenAPIV3 } from 'openapi-types'
import { Endpoints } from '../enums/endpoints'

export type ApiDocs = Partial<Record<Endpoints, Partial<OpenAPIV3.OperationObject>>>
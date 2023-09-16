import type { OpenAPIV3 } from 'openapi-types'
import { Endpoints } from '../../../../common/enums/endpoints'

export type ApiDocs = Partial<Record<Endpoints, Partial<OpenAPIV3.OperationObject>>>

export interface DocSchemas {
    [key: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
}
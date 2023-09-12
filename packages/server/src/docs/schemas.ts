import type { OpenAPIV3 } from 'openapi-types'

export const schemas: {
    [key: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
} = {
    Search: {
        type: 'object',
        required: ['query'],
        properties: {
            query: {
                type: 'string',
                default: 'Sea of stars'
            }
        }
    }
}
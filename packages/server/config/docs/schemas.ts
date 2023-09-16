import { DocSchemas } from '../../src/common/interfaces/docs'

export const schemas: DocSchemas = {
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
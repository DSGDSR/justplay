import {
    string,
    minLength,
    maxLength
} from 'valibot'

export const ListNameSchemma = string([
    minLength(4, 'List name must be at least 4 characters long'),
    maxLength(30, 'List name must be at most 30 characters long'),
    // TODO avoid special chars
])
import {
    string,
    minLength,
    maxLength
} from 'valibot'

export const ListNameSchemma = string([
    minLength(3, 'List name must be at least 3 characters long'),
    maxLength(30, 'List name must be at most 30 characters long'),
    // TODO avoid special chars
])
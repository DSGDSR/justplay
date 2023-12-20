import {
    string,
    minLength,
    maxLength,
    custom
} from 'valibot'

const specialChars = /[`´¨^*_+\-={};"\\|<>\/~]/

export const ListNameSchemma = string([
    minLength(4, 'List name must be at least 4 characters long'),
    maxLength(128, 'List name must be at most 30 characters long'),
    custom(
        (value: string) => !specialChars.test(value),
        'There are some invalid special characters in the list name'
    )
])
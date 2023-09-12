import { t } from "elysia";

export const SearchModel = t.Object({
    query: t.String({
        default: 'Sea of stars'
    }),
})
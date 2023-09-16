import Elysia, { TypedSchema } from "elysia"
import { AuthToken } from "./auth"
import { Cron } from 'croner'

export interface CustomStore {
    auth: AuthToken;
    cron: Record<"refreshToken", Cron>;
}

export type APIClass <T extends string = ""> = Elysia<T, {
    error: {};
    request: {};
    store: CustomStore;
    schema: TypedSchema<any>;
    meta: {
        schema: {};
        defs: {};
        exposed: {};
    };
}>
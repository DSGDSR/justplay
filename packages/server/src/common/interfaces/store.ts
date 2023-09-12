import Elysia, { TypedSchema } from "elysia";
import { AuthToken } from "./auth";

export interface CustomStore {
    auth: AuthToken;
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
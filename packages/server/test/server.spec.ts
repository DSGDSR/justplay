import { expect, test, describe, beforeAll } from "bun:test";
import { runServer } from "../src";

describe("Server", () => {
    let server;
    
    beforeAll(async () => {
        server = await runServer(false).catch(err => expect(err).toBeNull())
    })

    test("it should create an instance", () => {
        expect(server).toBeDefined()
    })

    test("it should contain an auth object", async () => {
        expect(server.store.auth).toBeDefined()
    })

    test("it should contain a cron instance for token refreshing", async () => {
        expect(server.store.cron).toBeDefined()
    })
})
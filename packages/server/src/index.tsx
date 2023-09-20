import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import v1 from "./server/controllers"
import { swaggerConfig } from "../config/swagger"
import { getTwitchToken, refreshToken } from "./server/services/auth"
import { APIClass } from "./common/interfaces/store"
import { log } from "./server/utils/logger"
import cors from "@elysiajs/cors";
import serveClient from "./client/serve";
import { bundleClient } from "./client/build";

const development = Bun.env.SERVER_DEV_MODE === "true"
const port = Bun.env.SERVER_PORT ?? 3000
const app: APIClass = new Elysia()

// bundle client side react-code each time the server starts
await bundleClient()

export const runServer = async(logging = true) => {
  return app
    // CORS
    .use(cors({ origin: '*' }))
    // Auth token on start
    .state('auth', await getTwitchToken())
    // Cron job to refresh token
    .use(refreshToken(app))
    // Swagger documentation
    .use(swagger(swaggerConfig))
    // API
    .use(v1)
    // Serve client
    .use(serveClient)
    // Launch
    .listen({ development, port }, (server) => {
      if (logging) log(`🚀 Server running at ${development ? 'http' : 'https'}://${server?.hostname}:${port}`)
    })
}

runServer()

export type APP = typeof app;
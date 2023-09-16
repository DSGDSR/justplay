import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import v1 from "./controllers"
import { swaggerConfig } from "../config/swagger"
import { getTwitchToken, refreshToken } from "./services/auth"
import { APIClass } from "./common/interfaces/store"
import { log } from "./utils/logger"
import cors from "@elysiajs/cors";

const development = Bun.env.SERVER_DEV_MODE === "true"
const port = Bun.env.SERVER_PORT ?? 3000
const app: APIClass = new Elysia()

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
    // Launch
    .listen({ development, port }, (server) => {
      if (logging) log(`🚀 Server running at ${development ? 'http' : 'https'}://${server?.hostname}:${port}`)
    })
}

runServer()


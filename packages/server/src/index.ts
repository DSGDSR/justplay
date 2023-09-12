import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import v1 from "./controllers";
import { swaggerConfig } from "../config/swagger";
import { getTwitchToken, refreshToken } from "./services/auth";

let auth = await getTwitchToken()

const port = Bun.env.SERVER_PORT ?? 3000
const app = new Elysia()

app
  // Auth token on start
  .state('auth', auth)
  // Cron job to refresh token
  .use(refreshToken(app))
  // Swagger documentation
  .use(swagger(swaggerConfig))
  // API
  .use(v1)
  .listen(port)

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

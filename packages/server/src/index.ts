import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import v1 from "./controllers";
import { swaggerConfig } from "../config/swagger";

const port = Bun.env.SERVER_PORT ?? 3000
const app = new Elysia()
  .use(swagger(swaggerConfig))
  .use(v1)
  .listen(port)

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

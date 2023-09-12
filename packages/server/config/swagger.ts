import { ElysiaSwaggerConfig } from "@elysiajs/swagger/src/types";
import { schemas } from "../src/docs/schemas";

export const swaggerConfig: ElysiaSwaggerConfig = {
    documentation: {
        info: {
            title: 'WTP API Docs',
            version: '0.0.1'
        },
        components: {
            schemas
        }
    }
}
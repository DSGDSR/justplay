import { ElysiaSwaggerConfig } from "@elysiajs/swagger/src/types"
import { schemas } from "./docs/schemas"
const pkg = require('../package.json')

export const swaggerConfig: ElysiaSwaggerConfig = {
    documentation: {
        info: {
            title: 'WTP API Docs',
            version: pkg.version
        },
        components: {
            schemas
        }
    }
}
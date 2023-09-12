import Elysia from "elysia"
import gameController from "./games"

const v1 = new Elysia({
    name: 'v1',
    prefix: '/v1'
})
.use(gameController)

export default v1
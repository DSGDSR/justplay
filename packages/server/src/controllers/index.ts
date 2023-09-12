import Elysia from "elysia"

const v1 = new Elysia({
    name: 'v1',
    prefix: '/v1/'
})
.use(import('./games'))

export default v1
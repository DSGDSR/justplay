import staticPlugin from '@elysiajs/static'
import Elysia from 'elysia'
import { renderToReadableStream, renderToString } from 'react-dom/server'
import App from './App'
import { edenFetch, edenTreaty } from '@elysiajs/eden'
import { APP } from '../index'
import { StaticRouter } from 'react-router-dom/server'

const port = Bun.env.SERVER_PORT ?? 3000
export const fetchApi = edenFetch<APP>(`http://localhost:${port}/v1`)
export const appp = edenTreaty(`http://localhost:${port}/v1/`)

const renderApp = async (path: string) => {
    // render the app component to a readable stream
    const stream = await renderToReadableStream(
        <StaticRouter location={path}>
            <App />
        </StaticRouter>, {
            bootstrapScripts: ['/public/client.js']
        }
    )

    // output the stream as the response
    return new Response(stream, {
        headers: { 'Content-Type': 'text/html' }
    })
}

const serveClient = new Elysia({ name: 'client' })
    .use(staticPlugin())
    .get('/styles', async() => {
        const styles = await Bun.file('./src/client/styles/output.css').text();
        return new Response(styles, {
            headers: {
                'Content-Type': 'text/css'
            }
        })
    })
    .get('/clerk', async() => {
        return new Response(Bun.env.REACT_APP_CLERK_PUBLISHABLE_KEY)
    })
    .get('*', async (req) => renderApp(req.path))

export default serveClient
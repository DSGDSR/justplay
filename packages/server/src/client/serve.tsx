import staticPlugin from '@elysiajs/static'
import Elysia from 'elysia'
import { renderToString } from 'react-dom/server'
import App from './App'
import React from 'react'
import { edenFetch, edenTreaty } from '@elysiajs/eden'
import { APP } from '../index'
import { StaticRouter } from 'react-router-dom/server'
import { bundle } from './build'

const port = Bun.env.SERVER_PORT ?? 3000
export const fetchApi = edenFetch<APP>(`http://localhost:${port}/v1`)
export const appp = edenTreaty(`localhost:${port}/v1`)

const renderApp = async (path: string) => {
    // render the app component to a readable stream
    const stream = await renderToString(
        <StaticRouter location={path}>
          <App />
        </StaticRouter>
    )

    // output the stream as the response
    return new Response(stream, {
        headers: { 'Content-Type': 'text/html' }
    })
}

const serveClient = new Elysia({ name: 'client' })
    .use(staticPlugin())
    .get('/bundle.js', async() => {
        const clientBundle = await bundle();
        console.log(clientBundle)
        return new Response(clientBundle, {
            headers: {
                'Content-Type': 'application/javascript'
            }
        })
    })
    .get('*', async (req) => renderApp(req.path))

export default serveClient
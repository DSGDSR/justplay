// src/react/App.tsx
import React, { Suspense, useState } from "react"
import Counter from "./components/counter"
import Counter2 from "./components/counter copy"
import { Route, Routes } from "react-router"

export interface AppProps {
  title?: string
}
//const cat = await (await fetch('https://catfact.ninja/fact')).json()

const routes = [
  { path: "/", Component: Counter },
  { path: "/2", Component: Counter2 },
];
export default function App() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Title</title>
        <meta name="description" content="Bun, Elysia & React" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>  
            { routes.map((page) => (
              <Route key={page.path} path={page.path} element={(
                <page.Component/>
              )}/>
            ))}
          </Routes>
        </Suspense>
        <script src="/bundle.js" />
      </body>
    </html>
  )
}
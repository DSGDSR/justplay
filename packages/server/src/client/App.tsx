// src/react/App.tsx
import { Suspense } from "react"
import { Route, Routes } from "react-router"
import Nav from "./components/Nav"
import { ClerkProvider } from "@clerk/clerk-react"
import {dark} from "@clerk/themes"
import HomePage from "./pages/Home"
import GamePage from "./pages/Game"
import '@shoelace-style/shoelace/dist/themes/dark.css'

const clerkKey = Bun.env.REACT_APP_CLERK_PUBLISHABLE_KEY ?? ''

export default () => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Title</title>
        <meta name="description" content="Bun, Elysia & React" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/styles" />
      </head>
      <body>
        <ClerkProvider publishableKey={clerkKey} appearance={{baseTheme: dark}}>
          <Nav/>
          <Suspense fallback={<div>Loading...</div> /* LOADING TODO */}>
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/game/:slug" element={<GamePage/>} />
            </Routes>
          </Suspense>
        </ClerkProvider>
      </body>
    </html>
  )
}
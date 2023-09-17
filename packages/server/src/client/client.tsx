/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

hydrateRoot(
  document,
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
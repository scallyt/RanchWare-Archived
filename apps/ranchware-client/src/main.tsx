import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/global.scss'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/baseRoute'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

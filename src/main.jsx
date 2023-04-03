import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'
import Home from './pages/Home'

const Routes = [
  {
    path: '/profil',
    element: <Home />,
  },
  {
    path: '/tiket',
    element: <Home />,
  },
  {
    path: '/transaksi',
    element: <Home />,
  },
]

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: Routes.map(route => ({
      index: route.path === '/',
      path: route.path,
      element: route.element,
    }))
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>,
)

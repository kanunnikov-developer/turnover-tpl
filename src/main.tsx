import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Main } from './page/Main/Main'
import { Products } from './page/Products/Products'
import { Auth } from './page/Auth/Auth'
import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register'
import { ProtectedComponent } from './helpers/ProtectedComponent'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedComponent><Main /></ProtectedComponent>,
    children: [
      {
        path: '/',
        element: <Products />
      }
    ]
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: '/auth',
        element: <Login />
      },
      {
        path: '/auth/register',
        element: <Register />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)

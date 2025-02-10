import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from './components/Layout/Layout.jsx'
import { Login, MyOrders, Signup } from './components/index.js'
import {Provider} from 'react-redux';
import { store } from './App/store.js'
import { getOrderData } from './components/MyOrders/MyOrders.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <App /> ,
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'my-orders',
        element: <MyOrders />,
        loader: getOrderData
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  // </StrictMode>,
)

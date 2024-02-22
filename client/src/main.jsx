import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import LandingPage from './pages/Landingpage'
import Error from './pages/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/profiles/:profileId',
        element: <Profile />,
      },
      // {
      //   path: '/index',
      //   element: <LandingPage/>,
      // },
      // {
      //   path: '/login',
      //   element: <Login />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

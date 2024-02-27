import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import ThemeProvider from './utils/ThemeContext.jsx'
import ThemeComponent from './components/Navbar/ThemeComponent.jsx'

import Profile from './pages/Profile'

import LandingPage from './pages/Landingpage'
import Error from './pages/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ThemeProvider>
        <App />
      </ThemeProvider>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/me',
        element: <Profile />
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

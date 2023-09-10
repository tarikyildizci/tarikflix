import './reset.css'
import './common.scss'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { Error, MovieDetail, MovieList, Root } from '@/routes'
import { store } from '@/store/store'

const container = document.getElementById('root')
const root = createRoot(container as HTMLDivElement)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to={'/movies'} />,
      },
      {
        path: '/movies',
        element: <MovieList />,
      },

      {
        path: '/detail/:id',
        element: <MovieDetail />,
      },
    ],
  },
])

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

import HomePage from '../pages/Home';
import { NotFound } from '../pages/404/404';
import { Route } from '../types/router.type';
import { createBrowserRouter } from 'react-router-dom';

const indexRouter: Route[] = [
    {
        children: [
          {
            path: '/',
            element: <HomePage />,
          },
        ],
      },
]

const notFoundRoute: Route = {
    path: '*',
    element: <NotFound />,
};

const routes = [...indexRouter, notFoundRoute];

export const router = createBrowserRouter(routes);
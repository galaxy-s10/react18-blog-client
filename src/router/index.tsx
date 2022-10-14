import React from 'react';
import { useRoutes } from 'react-router-dom';

const Home = React.lazy(() => import('@/pages/home'));
const Login = React.lazy(() => import('@/pages/login'));
const About = React.lazy(() => import('@/pages/about'));

const routes = useRoutes([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/about',
    element: <About />,
  },
]);
export default routes;

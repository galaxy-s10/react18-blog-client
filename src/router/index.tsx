import React from 'react';

const Layout = React.lazy(() => import('@/layout'));
const Article = React.lazy(() => import('@/pages/article'));
const Chat = React.lazy(() => import('@/pages/chat'));
const History = React.lazy(() => import('@/pages/history'));
const Link = React.lazy(() => import('@/pages/link'));
const Msg = React.lazy(() => import('@/pages/msg'));
const NotFound = React.lazy(() => import('@/pages/notFound'));
const Works = React.lazy(() => import('@/pages/works'));
const Tag = React.lazy(() => import('@/pages/tag'));
const Home = React.lazy(() => import('@/pages/home'));
const About = React.lazy(() => import('@/pages/about'));

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/article',
        element: <Article />,
      },
      {
        path: '/works',
        element: <Works />,
      },
      {
        path: '/link',
        element: <Link />,
      },
      {
        path: '/history',
        element: <History />,
      },
      {
        path: '/msg',
        element: <Msg />,
      },
      {
        path: '/tag/:id',
        element: <Tag />,
      },
    ],
  },
  {
    path: '/*',
    element: <NotFound />,
  },
  // {
  //   path: '/about',
  //   element: <About />,
  // },
];
export default routes;

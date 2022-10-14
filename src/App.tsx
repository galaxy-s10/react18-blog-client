import React, { memo, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import { outputStaticUrl, NODE_ENV } from '../script/utils/outputStaticUrl';

import authorJpg from '@/assets/img/author.jpg';
import Loading from '@/components/Loading';
import Home from '@/pages/home';
import NotFound from '@/pages/notFound';
import { store } from '@/stores';

const Login = React.lazy(() => import('@/pages/login'));
const About = React.lazy(() => import('@/pages/about'));

const App = () => {
  useEffect(() => {
    console.log('App页面生命周期mounted');
  }, []);

  const customStyle: React.CSSProperties = {
    width: '100px',
    height: '100px',
  };
  return (
    <Provider store={store}>
      <div style={customStyle}>
        <img
          src={authorJpg}
          width="100"
        />
      </div>
      <BrowserRouter basename={outputStaticUrl(NODE_ENV === 'production')}>
        <div>
          <Link to="/">点击跳转首页</Link>
        </div>
        <div>
          <Link to="/login">点击跳转login</Link>
        </div>
        <div>
          <Link to="/about">点击跳转about</Link>
        </div>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/login"
            element={
              <React.Suspense fallback={<Loading />}>
                <Login />
              </React.Suspense>
            }
          />
          <Route
            path="/home"
            element={
              <React.Suspense fallback={<Loading />}>
                <Home />
              </React.Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <React.Suspense fallback={<Loading />}>
                <About />
              </React.Suspense>
            }
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default memo(App);

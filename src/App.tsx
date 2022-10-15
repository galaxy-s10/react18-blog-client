import { memo, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import routes from '@/router';

const App = () => {
  useEffect(() => {
    console.log('App页面生命周期mounted', routes);
  }, []);

  return <div>{useRoutes(routes)}</div>;
};

export default memo(App);

import { memo, useEffect } from 'react';

import style from './index.module.scss';

const Home = () => {
  useEffect(() => {
    console.log('Login页面生命周期mounted');
  }, []);

  return (
    <div className={style.login}>
      <h1>login页面</h1>
      <p>欢迎登录！</p>
    </div>
  );
};

export default memo(Home);

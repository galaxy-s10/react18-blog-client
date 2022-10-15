import { memo, useEffect } from 'react';

import style from './style.module.scss';

const About = () => {
  useEffect(() => {
    console.log('About页面生命周期mounted');
  }, []);

  return (
    <div className={style.about}>
      <h1>about页面</h1>
      <p className={style.myfont}>MIUI 13 采用全新系统字体 MiSans</p>
    </div>
  );
};

export default memo(About);

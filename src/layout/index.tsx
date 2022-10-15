import { memo, useEffect } from 'react';

import LyAside from './aside';
import LyFooter from './footer';
import LyHeader from './header';
import style from './layout.module.scss';
import LyMain from './main';
import LyTypeList from './typelist';

const Layout = (props) => {
  // 生命周期
  useEffect(() => {
    console.log('layout生命周期', props);
  }, []);

  return (
    <div>
      <LyHeader />
      <LyTypeList />
      <div className={style['main-wrapper']}>
        <div className={style['left']}>
          <LyMain />
        </div>
        <div className={style['right']}>
          <LyAside />
        </div>
      </div>
      <LyFooter />
    </div>
  );
};

export default memo(Layout);

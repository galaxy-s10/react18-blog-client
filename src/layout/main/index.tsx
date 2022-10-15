import { memo, Suspense } from 'react';
import { useLocation, Outlet } from 'react-router';

import style from './style.module.scss';

import Loading from '@/components/Loading';

const LayoutMain = () => {
  const router = useLocation();

  return (
    <div className={router.pathname !== '/' ? style.index : ''}>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default memo(LayoutMain);

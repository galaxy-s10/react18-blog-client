import { memo, useEffect } from 'react';

import style from './style.module.scss';

import BabyCpt from '@/components/Baby';
import { useAppSelector } from '@/stores/hooks';

const Card = () => {
  const counter = useAppSelector((state) => state.counter);

  // 生命周期
  useEffect(() => {
    console.log('Card组件生命周期mounted');
  }, []);

  return (
    <div className={style.card}>
      Card组件
      <div>redux的counter：{JSON.stringify(counter)}</div>
      <BabyCpt></BabyCpt>
    </div>
  );
};

export default memo(Card);

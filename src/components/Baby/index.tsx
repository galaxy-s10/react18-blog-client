import { memo, useEffect } from 'react';

import style from './index.module.scss';

import { addNum, delNum } from '@/stores/counter';
import { useAppSelector, useAppDispatch } from '@/stores/hooks';

const Baby = () => {
  const counter = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  // 生命周期
  useEffect(() => {
    console.log('Baby组件生命周期mounted');
  }, []);

  return (
    <div className={style.baby}>
      Baby组件
      <div>
        <button onClick={() => dispatch(addNum(10))}>加十</button>
        <button onClick={() => dispatch(delNum(3))}>减三</button>
      </div>
      <div>redux的counter：{JSON.stringify(counter)}</div>
    </div>
  );
};

export default memo(Baby);

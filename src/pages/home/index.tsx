import { memo, useEffect, useState } from 'react';

import style from './index.module.scss';

import CardCpt from '@/components/Card';
import { addNum, delNum } from '@/stores/counter';
import { useAppSelector, useAppDispatch } from '@/stores/hooks';
import { ajaxGetUserLogin } from '@/stores/user';

const Home = () => {
  const counter = useAppSelector((state) => state.counter);
  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const [title] = useState('home页面');

  useEffect(() => {
    console.log('Home页面生命周期mounted');
  }, []);

  const ajaxHandle = async (id: number) => {
    try {
      // 注意，只要dispatch有结果，都会走resolve，除非里面抛出了异常。
      const res = await dispatch(ajaxGetUserLogin({ id }));
      // @ts-ignore
      if (res.error) {
        console.log('ajaxHandle失败', res.payload);
      } else {
        console.log('ajaxHandle成功', res.payload);
      }
    } catch (error) {
      console.log('捕获到异常', error);
    }
  };

  return (
    <div className={style.home}>
      <h1>{title}</h1>
      <div>redux的counter：{JSON.stringify(counter)}</div>
      <div>redux的user：{JSON.stringify(user)}</div>
      <button onClick={() => dispatch(addNum(1))}>加一</button>
      <button onClick={() => dispatch(delNum(2))}>减二</button>
      <button
        onClick={() => {
          // eslint-disable-next-line
          ajaxHandle(1);
        }}
      >
        模拟异步请求成功
      </button>
      <button
        onClick={() => {
          // eslint-disable-next-line
          ajaxHandle(2);
        }}
      >
        模拟异步请求失败
      </button>
      <CardCpt></CardCpt>
    </div>
  );
};

export default memo(Home);

import { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { redirect, useNavigate } from 'react-router-dom';

import style from './style.module.scss';

import { getArticleList, setTypes } from '@/stores/article';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { ajaxGetTypelist } from '@/stores/type';

const TypeList = () => {
  const typelist = useAppSelector((state) => {
    return state.type.list;
  });

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // 生命周期
  useEffect(() => {
    // eslint-disable-next-line
    dispatch(ajaxGetTypelist({}));
  }, []);

  const handleType = (type) => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    dispatch(setTypes(type));
  };

  return (
    <div className={style['fix-type-wrapper']}>
      <ul className={style['type-wrapper']}>
        <li onClick={() => handleType('-1')}>全部</li>
        {typelist.map((item, index) => {
          return (
            <li
              key={index}
              className={style['item']}
              onClick={() => handleType(`${item.id!}`)}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(TypeList);

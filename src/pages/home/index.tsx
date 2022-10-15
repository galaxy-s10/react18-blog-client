import { memo, useState, useEffect } from 'react';

import style from './style.module.scss';

import Tag from '@/components/Tag';
import { getArticleList, setNowPage } from '@/stores/article';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';

const Home = () => {
  const dispatch = useAppDispatch();

  const article = useAppSelector((state) => state.article);

  const { types, list, nowPage, pageSize, hasMore, total } = article;

  console.log('重新渲染', list, nowPage, pageSize, hasMore, total);

  // 生命周期
  useEffect(() => {
    console.log('home生命周期');
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    dispatch(
      getArticleList({
        nowPage,
        pageSize,
        types: types === '-1' ? undefined : types,
      })
    );
  }, [types, nowPage, pageSize]);

  return (
    <div className={style.home}>
      总数：{total}
      是否可加载：{hasMore}
      <button
        onClick={() => {
          dispatch(setNowPage(nowPage + 1));
        }}
      >
        setNowPage
      </button>
      {list.map((item) => {
        return (
          <div
            key={item.id}
            className={style.list}
          >
            <div className={style.item}>
              <div className={style.left}>
                <div
                  className={style['head-img']}
                  style={{
                    backgroundImage: `url(${item.head_img!})`,
                  }}
                ></div>
              </div>
              <div className={style.right}>
                <div>{item.title}</div>
                <p>{item.desc}</p>
                <div className={style['tag-wrap']}>
                  {item.tags?.map((tag) => {
                    return (
                      <Tag
                        key={tag.id}
                        {...tag}
                      ></Tag>
                    );
                  })}
                </div>
                <div className={style['other-wrap']}>
                  <img
                    className={style['author']}
                    // @ts-ignore
                    src={item.users![0].avatar}
                  ></img>
                </div>
                <div className={style.relation}>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Home);

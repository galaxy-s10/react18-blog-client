import { memo, useEffect } from 'react';

import style from './style.module.scss';

import CollapseCpt from '@/components/Collapse';
import Tag from '@/components/Tag';
import {
  getSidebarArticleList,
  getIpPosition,
  getVisitorDayData,
  getVisitorHistoryData,
  setSideBarArticleOrderName,
  getSidebarTagList,
} from '@/stores/app';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { dateStartAndEnd, parseIpInfo } from '@/utils';

const LayoutAside = () => {
  const dispatch = useAppDispatch();
  const app = useAppSelector((state) => state.app);
  // 生命周期
  useEffect(() => {
    console.log('aside生命周期');
    // eslint-disable-next-line
    dispatch(getVisitorDayData(dateStartAndEnd(new Date())));
    // eslint-disable-next-line
    dispatch(getVisitorHistoryData());
    // eslint-disable-next-line
    dispatch(getSidebarTagList());
    // eslint-disable-next-line
    dispatch(getIpPosition());
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    dispatch(getSidebarArticleList());
  }, [app.sideBarArticleOrderName]);

  const tagIco = <span>tagIco</span>;
  const visitorIco = <span>visitorIco</span>;
  const logIco = <span>logIco</span>;
  const settingIco = <span>settingIco</span>;

  return (
    <div>
      <div className={style['user-info']}>
        <div className={style['bgc']}></div>
        <div className={style['user-avatar']}>
          <img
            // eslint-disable-next-line global-require
            src={require('@/assets/img/default_avatar.webp')}
          ></img>
        </div>
        <div className={style['info']}>
          <div className={style['name']}>222</div>
          <p className={style['title']}>333</p>
        </div>
      </div>
      <CollapseCpt
        title="设置"
        isOpen={false}
        ico={settingIco}
      >
        <div>设置设置</div>
      </CollapseCpt>
      <div className={style['article-info']}>
        <div className={style['title']}>
          <div>
            <i className={style['el-icon-medal']}></i>
            <b>xxxx</b>
          </div>
          <span
            className={style['switch-btn']}
            onClick={() => {
              console.log(1, app.sideBarArticleOrderName);
              dispatch(
                setSideBarArticleOrderName(
                  app.sideBarArticleOrderName === 'updated_at'
                    ? 'click'
                    : 'updated_at'
                )
              );
            }}
          >
            切换
          </span>
        </div>
        <div>
          <div>
            {app.sideBarArticleList.map((item, index) => {
              return (
                <div
                  key={index}
                  className={style['item']}
                >
                  <div className={style['head-img']}>
                    <img
                      // eslint-disable-next-line
                      src={item.head_img}
                      alt=""
                    ></img>
                  </div>
                  <div className={style['title']}>
                    <b>#{item.title}</b>
                    <div className={style['info']}>
                      <span className={style['view']}>
                        <i className={style['el-icon-view']}></i>
                        {item.click}
                      </span>
                      <div>ddd</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <CollapseCpt
        title="访客信息"
        isOpen={true}
        ico={visitorIco}
      >
        <div>
          <div>
            ip： {/* @ts-ignore */}
            {app.ipInfo?.ip}
          </div>
          <div>
            location：
            {/* @ts-ignore */}
            {app.ipInfo && parseIpInfo(app.ipInfo.gaode)}
          </div>
          <div className="item">
            今天总访问数: {app.visitorDayData.visit_total}
          </div>
          <div className="item">
            今天总访客数: {app.visitorDayData.visitor_total}
          </div>
          <div className="item">
            历史总访问数: {app.visitorHistoryData.visit_total}
          </div>
          <div className="item">
            历史总访客数: {app.visitorHistoryData.visitor_total}
          </div>
        </div>
      </CollapseCpt>
      <CollapseCpt
        title="标签云"
        isOpen={true}
        ico={tagIco}
      >
        <div>
          {app.sideBarTagList.map((tag) => {
            return (
              <Tag
                {...tag}
                key={tag.id}
              ></Tag>
            );
          })}
        </div>
      </CollapseCpt>
    </div>
  );
};

export default memo(LayoutAside);

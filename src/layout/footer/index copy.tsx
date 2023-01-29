import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { memo, useEffect, useMemo, useState } from 'react';

import style from './style.module.scss';

import { useInterval } from '@/hooks/useInterval';

dayjs.extend(duration);

const RunTime = () => {
  const [runTime, setRunTime] = useState('');
  const startDate = dayjs('2019-09-01 00:00:00');

  console.log('RunTime重新渲染了');

  useInterval(
    () => {
      const res = dayjs
        // @ts-ignore
        .duration(dayjs() - startDate)
        .format('Y年M个月D天HH小时mm分ss秒');
      setRunTime(res);
    },
    2000,
    { immediate: true }
  );
  return <span>{runTime}</span>;
};

const LayoutFooter = () => {
  // 生命周期
  useEffect(() => {
    console.log('footer生命周期');
  }, []);

  const [count, setCount] = useState(1);

  console.log('footer重新渲染了');

  return (
    <div>
      <div className={style['footer']}>
        <button onClick={() => setCount(count + 1)}>22</button>
        <p>
          博客已运行
          {useMemo(
            () => (
              <RunTime></RunTime>
            ),
            []
          )}
          <span className={style['ani']}>(=◡=)☆</span>
        </p>

        <a
          href="http://beian.miit.gov.cn"
          target="__blank"
          className={style['beianhao']}
        >
          粤ICP备19114467号-2
        </a>
      </div>
    </div>
  );
};

export default memo(LayoutFooter);

import { memo } from 'react';

import style from './style.module.scss';

const NoHeadImg = (props) => {
  return (
    <div className={`${style['no-head-img']} ${props.className}`}>
      此处无图胜有图
    </div>
  );
};

export default memo(NoHeadImg);

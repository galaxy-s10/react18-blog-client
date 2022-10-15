import { memo } from 'react';

import style from './style.module.scss';

import { ITag } from '@/interface';

const Tag = (props: ITag) => {
  return (
    <div
      className={style['tag']}
      style={{ backgroundColor: props.color }}
    >
      {props.name}
    </div>
  );
};

export default memo(Tag);

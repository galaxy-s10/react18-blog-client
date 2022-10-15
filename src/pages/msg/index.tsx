import { memo, useState, useEffect } from 'react';

const Msg = () => {
  // 生命周期
  useEffect(() => {}, []);

  return <div>Msg</div>;
};

export default memo(Msg);

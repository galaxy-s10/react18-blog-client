import { memo, useState, useEffect } from 'react';

const Link = () => {
  // 生命周期
  useEffect(() => {}, []);

  return <div>Link</div>;
};

export default memo(Link);

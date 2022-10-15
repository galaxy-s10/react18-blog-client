import { memo, useState, useEffect } from 'react';

const Article = () => {
  // 生命周期
  useEffect(() => {}, []);

  return <div>Article</div>;
};

export default memo(Article);

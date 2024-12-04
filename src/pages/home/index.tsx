import { memo, useEffect } from 'react';

const Home = () => {
  // 生命周期
  useEffect(() => {
    console.log('11');
  }, []);

  return <div>Home</div>;
};

export default memo(Home);

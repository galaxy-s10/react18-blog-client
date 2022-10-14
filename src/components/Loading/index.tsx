import { memo, useEffect } from 'react';

const Loading = () => {
  useEffect(() => {
    console.log('Loading组件生命周期mounted');
  }, []);
  return <div>Loading...</div>;
};
export default memo(Loading);

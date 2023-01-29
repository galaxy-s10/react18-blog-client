import { memo, useMemo, useState } from 'react';

const ChildCpt = (props: { cb?: () => void } = {}) => {
  console.log('ChildCpt重新渲染了', props.cb?.());

  return <div>ChildCpt</div>;
};

const FatherCpt = () => {
  const [count, setCount] = useState(1);

  console.log('FatherCpt重新渲染了');

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>setCount</button>
      <ChildCpt></ChildCpt>

      {/* {useMemo(
        () => (
          <ChildCpt></ChildCpt>
        ),
        []
      )} */}
    </div>
  );
};

export default memo(FatherCpt);

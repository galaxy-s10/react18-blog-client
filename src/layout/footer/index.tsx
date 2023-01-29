import { memo, useState } from 'react';

const FatherCpt = () => {
  const [count, setCount] = useState(1);

  console.log('FatherCpt重新渲染了');

  return (
    <div>
      <div>count:{count}</div>
      <button onClick={() => setCount(count + 1)}>setCount</button>
    </div>
  );
};

export default memo(FatherCpt);

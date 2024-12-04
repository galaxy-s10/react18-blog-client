import { memo, useEffect, useState } from 'react';

const Counter = () => {
  console.log('Counter组件渲染了');
  const [count, setCount] = useState(1);
  const [timer, setTimer] = useState<any>(null);
  const [started, setStarted] = useState(false);

  const handleTimer = () => {
    const newTimer = setInterval(() => {
      console.log('此时的count', count); // 这个count引的是外层的count（闭包）他的值往往不是最新的。
      // setCount(count + 1);
      // setCount((preVal) => {
      //   console.log('preVal', preVal); // 这个preVal是上一次更新的值
      //   return preVal + 1; // 返回值是更新后的值
      // });
    }, 500);
    setTimer(newTimer);
  };

  useEffect(() => {
    console.log('started变了', started);
    // if (!started) {
    //   clearInterval(timer);
    //   return;
    // }
    // handleTimer();
  }, [started]);

  useEffect(() => {
    console.log('timer变了', started);
  }, [timer]);

  const clearTimer = () => {
    clearInterval(timer);
    setStarted(false);
    setTimer(null);
  };

  return (
    <div>
      <div>count：{count}</div>
      <button onClick={() => setCount(count + 100)}>加100</button>
      <button onClick={() => clearTimer()}>清楚定时器</button>
      <button onClick={() => setStarted(!started)}>
        {!started ? '开始' : '停止'}定时器
      </button>
    </div>
  );
};

export default memo(Counter);

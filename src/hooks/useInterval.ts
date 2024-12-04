import { useCallback, useEffect, useRef } from 'react';

export const useInterval = (
  callback: () => void,
  delay: number,
  options: { immediate?: boolean } = {}
) => {
  const savedCallback = useRef<any>();
  const timerRef = useRef<any>();
  savedCallback.current = callback;

  const { immediate } = options;

  useEffect(() => {
    if (typeof delay !== 'number' || delay < 0) return;

    if (immediate) {
      callback();
    }

    timerRef.current = setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => clearInterval(timerRef.current);
  }, [delay]);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  return clear;
};

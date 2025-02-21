import { useRef, useCallback } from "react";

export type UnaryVoidFunction<T> = (arg: T) => void;

const useDebouncedCallback = <T>(func: UnaryVoidFunction<T>, wait: number) => {
  const timeout = useRef<NodeJS.Timeout>(null);

  const debouncedFunc = (arg: T) => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => func(arg), wait);
  };

  return useCallback(debouncedFunc, [func, wait]);
};

export default useDebouncedCallback;

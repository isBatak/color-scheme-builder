import { useEffect, useState } from "react";

type DebounceCallback = (...args: any[]) => void;

interface UseDebounce {
  (callback: DebounceCallback, delay: number): DebounceCallback;
}

export const useDebounce: UseDebounce = (callback, delay) => {
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const debouncedFunction: DebounceCallback = (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = window.setTimeout(() => {
      callback(...args);
    }, delay);
    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return debouncedFunction;
};

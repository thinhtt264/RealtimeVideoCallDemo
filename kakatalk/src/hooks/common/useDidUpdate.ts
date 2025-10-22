import { useEffect, useRef } from 'react';

/**
 * Hook to run effect only after first mount
 * @param callback - Function to be called after first mount
 * @param deps - Dependencies array for useEffect
 */
export function useDidUpdate(callback: () => void, deps: unknown[]): void {
  const hasMount = useRef(false);

  useEffect(() => {
    if (hasMount.current) {
      callback();
    } else {
      hasMount.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

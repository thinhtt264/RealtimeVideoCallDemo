import { useState, useRef, useEffect } from 'react';

/**
 * A hook that extends useState with callback functionality
 * @param initialState - Initial state value
 * @returns Tuple containing state value and setState function with callback support
 */
export function useStateWithCallback<T>(
  initialState: T,
): [
  state: T,
  setState: (
    updatedState: React.SetStateAction<T>,
    callback?: (updatedState: T) => void,
  ) => void,
] {
  const [state, setState] = useState<T>(initialState);
  const callbackRef = useRef<((updated: T) => void) | undefined>(undefined);

  const handleSetState = (
    updatedState: React.SetStateAction<T>,
    callback?: (updatedState: T) => void,
  ) => {
    callbackRef.current = callback;
    setState(updatedState);
  };

  useEffect(() => {
    if (typeof callbackRef.current === 'function') {
      callbackRef.current(state);
      callbackRef.current = undefined;
    }
  }, [state]);

  return [state, handleSetState];
}

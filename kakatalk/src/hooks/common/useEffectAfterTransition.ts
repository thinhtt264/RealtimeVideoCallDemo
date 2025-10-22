import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { EventMapCore } from '@react-navigation/native';

/**
 * Hook to run a task after navigation animation ends
 * @param expensiveTask - The task to run after navigation animation completes
 * @param deps - Dependencies array for useEffect
 */
export function useEffectAfterTransition(
  expensiveTask: () => void,
  deps: unknown[],
): void {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'transitionEnd' as keyof EventMapCore<never>,
      () => {
        setTimeout(() => {
          //-> Mark this in macro task to avoid blocking the main thread
          expensiveTask();
        }, 0);
      },
    );

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

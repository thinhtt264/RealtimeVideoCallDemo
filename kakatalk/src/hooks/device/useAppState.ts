import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

/**
 * Hook to listen to app state changes
 * @returns Current app state
 */
export function useAppState(): AppStateStatus {
  const [appState, setAppState] = useState<AppStateStatus>('active');

  useEffect(() => {
    const subscription = AppState.addEventListener('change', setAppState);

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return appState;
}

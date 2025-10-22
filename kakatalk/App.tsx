import { AppNavigation } from '@/navigation';
import store, { persistor } from '@/store/store';
import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { LAYOUTS } from '@/utils';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppThemeProvider } from '@/themes';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <GestureHandlerRootView style={LAYOUTS.fill}>
              <AppNavigation />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </PersistGate>
      </AppThemeProvider>
    </Provider>
  );
}

export default App;

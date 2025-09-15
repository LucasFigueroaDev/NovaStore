import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store';
import { Provider } from 'react-redux';
import MainNavigator from './src/navigation/MainNavigator';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <MainNavigator />
        <Toast />
        <StatusBar style="auto" />
      </Provider>
    </SafeAreaProvider>
  );
}



import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store';
import { Provider } from 'react-redux';
import BottomTabs from './src/navigation/BottomTabs';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <BottomTabs />
          <Toast />
          <StatusBar style="auto" />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}



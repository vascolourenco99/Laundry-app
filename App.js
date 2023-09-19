import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { Provider } from 'react-redux';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen/>
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  
});

import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';

import { useEffect } from 'react';
import { Keyboard, ImageBackground, StyleSheet, View } from 'react-native';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store/redux/store';
import { setIsKeyboardVisible } from './store/redux/keyboardSlice';
import { setWeatherData } from './store/redux/weatherSlice';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainNavigator from './routes/MainNavigator';
import ErrorScreen from './screens/ErrorScreen';

import getWeather from './network/getWeatherAPI';

const Stack = createNativeStackNavigator();

const backGroundImage = require('./assets/images/starry-mountain.jpg');

function AppRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        dispatch(setIsKeyboardVisible({ value: true }));
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        dispatch(setIsKeyboardVisible({ value: false }));
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const currentLocation = useSelector(
    (state) => state.location.currentLocation
  );

  useEffect(() => {
    if (currentLocation.city) {
      const { lat, long } = currentLocation;

      getWeather(lat, long)
        .then((weatherData) => {
          //console.log(weatherData);
          dispatch(setWeatherData({ weatherData: weatherData }));
        })
        .catch((err) => console.error(err));
    }

    return () => {
      // implement local storage
    };
  }, []);

  return (
    <ImageBackground source={backGroundImage} style={styles.image}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainNavigator"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="MainNavigator"
            children={() => <MainNavigator />}
          />
          <Stack.Screen name="ErrorScreen" children={() => <ErrorScreen />} />
        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <StatusBar />
          <AppRouter />
        </Provider>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

// icon color - #e6e6e6

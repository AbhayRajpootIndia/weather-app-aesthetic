import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';

import * as Location from 'expo-location';

import { useEffect, useState } from 'react';
import {
  Keyboard,
  ImageBackground,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store/redux/store';
import { setIsKeyboardVisible } from './store/redux/keyboardSlice';
import {
  setWeatherData,
  setAiqData,
  setAstroData,
  setHourlyData,
  setRainData,
  setUvData,
  setWindData,
  setTemperatureData,
} from './store/redux/weatherSlice';

import { Link, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainNavigator from './routes/MainNavigator';
import ErrorScreen from './screens/ErrorScreen';

import getWeather from './network/getWeatherAPI';
import { setLatlong, setCity } from './store/redux/locationSlice';

import { useForegroundPermissions } from 'expo-location';

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

  useEffect(() => {
    const getLocationHandler = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === Location.PermissionStatus.GRANTED) {
        Location.getCurrentPositionAsync({}).then((location) => {
          console.log(location);

          dispatch(
            setLatlong({
              latlong: {
                lat: location.coords.latitude,
                long: location.coords.longitude,
              },
            })
          );
        });
      } else {
        Alert.alert(
          'Insufficient Permissions',
          'You must grant location permission to use this app.'
        );

        setTimeout(() => {
          Linking.openSettings()
            .then((data) => {
              console.log('Settings data:');
              console.log(data);
            })
            .catch((err) => console.error(err));
        }, 2000);

        setTimeout(() => {
          Location.getForegroundPermissionsAsync()
            .then((permissionResponse) => {
              console.log(permissionResponse);
              if (
                permissionResponse.status === Location.PermissionStatus.GRANTED
              ) {
                console.log('needed');

                Location.getCurrentPositionAsync({}).then((location) => {
                  console.log(location);

                  dispatch(
                    setLatlong({
                      latlong: {
                        lat: location.coords.latitude,
                        long: location.coords.longitude,
                      },
                    })
                  );
                });
              } else {
                console.log('close app');
              }
            })
            .catch((error) => console.error(error));
        }, 6000);
      }
    };

    getLocationHandler();
  }, []);

  const latlong = useSelector((state) => state.location.latlong);
  const weatherData = useSelector((state) => state.weather.weatherData);

  useEffect(() => {
    if (latlong.lat) {
      const { lat, long } = latlong;

      getWeather(lat, long)
        .then((weatherData) => {
          dispatch(setWeatherData({ weatherData: weatherData }));
          dispatch(setCity({ city: weatherData.location.name }));
        })
        .catch((err) => console.error(err));
    }

    return () => {
      // implement local storage
    };
  }, [latlong]);

  useEffect(() => {
    if (weatherData.forecast) {
      dispatch(
        setHourlyData({
          hourlyData: weatherData.forecast.forecastday[0].hour,
        })
      );
      dispatch(setAiqData({ aiqData: weatherData.current.air_quality }));
      dispatch(setUvData({ uvData: weatherData.current.uv }));
      dispatch(
        setAstroData({
          astroData: weatherData.forecast.forecastday[0].astro,
        })
      );
      dispatch(
        setRainData({
          rainData: {
            currentPrecip: weatherData.current.precip_mm,
            totalPrecip: weatherData.forecast.forecastday[0].day.totalprecip_mm,
          },
        })
      );
      dispatch(
        setWindData({
          windData: {
            wind_mph: weatherData.current.wind_mph,
            wind_kph: weatherData.current.wind_kph,
            wind_degree: weatherData.current.wind_degree,
          },
        })
      );

      dispatch(
        setTemperatureData({
          temperatureData: {
            current_temp_c: weatherData.current.temp_c,
            maxtemp_c: weatherData.forecast.forecastday[0].day.maxtemp_c,
            mintemp_c: weatherData.forecast.forecastday[0].day.mintemp_c,
            condition: weatherData.current.condition.text,
          },
        })
      );
    }
  }, [weatherData]);

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

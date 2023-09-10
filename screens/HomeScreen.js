import { View, StyleSheet, ImageBackground } from 'react-native';
import { useState } from 'react';

import WeatherDrawer from '../components/WeatherDrawer';
import {
  WeatherSummaryLarge,
  WeatherSummaryCompact,
} from '../components/WeatherSummary';
import { useSelector } from 'react-redux';

const backGroundImage = require('../assets/images/starry-mountain.jpg');
const houseImage = require('../assets/images/house.png');

export default function HomeScreen() {
  const [isDrawerOpen, setIsOpenDrawer] = useState(false);

  const cityName = useSelector((state) => state.location.city);
  const temperatureData = useSelector((state) => state.weather.temperatureData);

  return (
    <View style={styles.container}>
      <ImageBackground source={backGroundImage} style={styles.image}>
        <View
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
          }}
        >
          <ImageBackground
            source={houseImage}
            style={styles.houseImage}
          ></ImageBackground>
        </View>
        {!isDrawerOpen && (
          <View
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              alignItems: 'center',
              paddingTop: '25%',
            }}
          >
            <WeatherSummaryLarge
              cityName={cityName}
              temperatureData={temperatureData}
            />
          </View>
        )}
        {isDrawerOpen && (
          <View
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              alignItems: 'center',
              paddingTop: '15%',
            }}
          >
            <WeatherSummaryCompact
              cityName={cityName}
              temperatureData={temperatureData}
            />
          </View>
        )}
        <WeatherDrawer setIsOpenDrawer={setIsOpenDrawer} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  houseImage: {
    marginTop: '40%',
    aspectRatio: 1 / 1,
    width: 350,
  },
});

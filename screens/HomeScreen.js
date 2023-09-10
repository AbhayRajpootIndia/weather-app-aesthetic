import { View, StyleSheet, ImageBackground } from 'react-native';

import WeatherDrawer from '../components/WeatherDrawer';
import WeatherSummary from '../components/WeatherSummary';

const backGroundImage = require('../assets/images/starry-mountain.jpg');
const houseImage = require('../assets/images/house.png');

export default function HomeScreen() {
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
          <ImageBackground source={houseImage} style={styles.houseImage}>
            {/* <WeatherSummary /> */}
          </ImageBackground>
        </View>
        <WeatherDrawer />
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

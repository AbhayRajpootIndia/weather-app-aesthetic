import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';

import WeatherDrawer from '../components/WeatherDrawer';

const backGroundImage = require('../assets/images/starry-mountain.jpg');

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground source={backGroundImage} style={styles.image}>
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
});

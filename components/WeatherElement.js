import { Text, View, Image, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

function WeatherElement({ time }) {
  const image = require('../assets/images/weatherElementIcons/moon-cloud-mid-rain.png');
  return (
    <View style={styles.container}>
      <BlurView
        tint="dark"
        intensity={10}
        blurReductionFactor={0.1}
        overlayColor="transparent"
        reducedTransparencyFallbackColor="rgba(72, 49, 157, 0.20)"
        style={{
          flex: 1,
          paddingVertical: 15,
          paddingHorizontal: 5,
        }}
      >
        <View style={{ backgroundColor: 'transparent' }}>
          <Text style={styles.timeText}>{time} AM</Text>
          <Image
            source={require('../assets/images/weatherElementIcons/moon-cloud-mid-rain.png')}
            style={{ width: 50, height: 50 }}
          />
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    overflow: 'hidden',
    alignItems: 'center',
    height: 150,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: 100,
    marginHorizontal: 10,
  },
  timeText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
});

export default WeatherElement;

import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { useMemo, useState } from 'react';

function getFormattedTime(time) {
  if (time === 0) {
    return '12 AM';
  } else if (time < 12) {
    return `${time} AM`;
  } else if (time === 12) {
    return '12 PM';
  } else {
    return `${time % 12} PM`;
  }
}

function WeatherElement({ item }) {
  const image = require('../assets/images/weatherElementIcons/moon-cloud-mid-rain.png');
  const [isFocused, setIsFocused] = useState(false);
  const date = new Date(0);
  date.setUTCSeconds(parseInt(item.time_epoch));
  const time = useMemo(() => date.getHours(), [item]);

  return (
    <Pressable
      onPress={() => {
        console.log('temp press');
      }}
      onPressIn={() => setIsFocused(true)}
      onPressOut={() => setIsFocused(false)}
      onHoverIn={() => setIsFocused(true)}
      onHoverOut={() => setIsFocused(false)}
    >
      <View
        style={[
          styles.container,
          isFocused ? { backgroundColor: '#48319D' } : {},
        ]}
      >
        <BlurView
          tint="dark"
          intensity={25}
          blurReductionFactor={0.3}
          overlayColor="transparent"
          reducedTransparencyFallbackColor="rgba(72, 49, 157, 0.20)"
          style={{
            flex: 1,
            paddingVertical: 15,
            paddingHorizontal: 5,
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              justifyContent: 'space-around',
              rowGap: 10,
              alignItems: 'center',
            }}
          >
            <Text style={[styles.text, { fontSize: 14, fontWeight: '500' }]}>
              {getFormattedTime(time)}
            </Text>
            <Image
              source={require('../assets/images/weatherElementIcons/moon-cloud-mid-rain.png')}
              style={{ width: 50, height: 50 }}
            />
            <Text style={[styles.text, { fontSize: 18, fontWeight: '400' }]}>
              {parseInt(item.temp_c)}º
            </Text>
          </View>
        </BlurView>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: 100,
    marginHorizontal: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});

export default WeatherElement;

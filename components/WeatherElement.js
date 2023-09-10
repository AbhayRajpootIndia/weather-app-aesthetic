import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { useMemo, useState } from 'react';
import { getFormattedTime } from '../helper-functions/getFormattedTime';
import { weatherCodes } from '../assets/constants/weatherCodes';

function WeatherElement({ hourData, currentHour }) {
  const [isFocused, setIsFocused] = useState(false);

  const hour = useMemo(() => {
    if (hourData.time_epoch) {
      const date = new Date(0);
      date.setUTCSeconds(parseInt(hourData.time_epoch));
      return date.getHours();
    } else {
      return 12;
    }
  }, [hourData]);

  const imageUrl = useMemo(() => {
    if (hourData.condition) {
      const weatherCode = weatherCodes.find(
        (code) => code.code === hourData.condition.code
      );
      const dayState = hour > 5 && hour < 18 ? 'day' : 'night';

      const imageUrl = `https://cdn.weatherapi.com/weather/128x128/${dayState}/${weatherCode.icon}.png`;

      return imageUrl;
    } else {
      return 'https://cdn.weatherapi.com/weather/128x128/day/116.png';
    }
  }, [hourData]);

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
          isFocused || currentHour === hour
            ? { backgroundColor: '#48319D' }
            : {},
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
            width: '100%',
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
              {getFormattedTime(hour)}
            </Text>
            <Image
              source={{
                uri: imageUrl,
              }}
              style={{ width: 40, height: 40 }}
            />
            <Text style={{ color: 'cyan', fontSize: 12, marginTop: -10 }}>
              20%
            </Text>
            <Text style={[styles.text, { fontSize: 18, fontWeight: '400' }]}>
              {parseInt(hourData.temp_c)}º
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

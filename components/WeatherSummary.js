import { View, Text, StyleSheet } from 'react-native';

export function WeatherSummaryLarge({ cityName, temperatureData }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: 35, fontWeight: '300' }]}>
        {cityName || 'No Location Data'}
      </Text>
      <Text
        style={[
          styles.text,
          { fontSize: 85, fontWeight: '200', lineHeight: 95, paddingLeft: 5 },
        ]}
      >
        {temperatureData.current_temp_c || '--'}°
      </Text>
      <Text
        style={[
          styles.text,
          { fontSize: 20, lineHeight: 22, color: '#EBEBF599' },
        ]}
      >
        {temperatureData.condition || '--'}
      </Text>
      <Text style={[styles.text, { fontSize: 20, lineHeight: 26 }]}>
        H: {Math.floor(temperatureData.maxtemp_c) || '--'}° L:{' '}
        {Math.floor(temperatureData.mintemp_c) || '--'}°
      </Text>
    </View>
  );
}

export function WeatherSummaryCompact({ cityName, temperatureData }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: 40, fontWeight: '400' }]}>
        {cityName || 'No Location Data'}
      </Text>
      <Text style={[styles.text, { fontSize: 22, color: '#EBEBF599' }]}>
        {temperatureData.current_temp_c || '--'}° |{' '}
        {temperatureData.condition || '--'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: '30%',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

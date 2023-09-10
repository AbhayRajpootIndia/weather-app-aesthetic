import { View, Text } from 'react-native';

export default function WeatherSummary() {
  return (
    <View style={{ width: 200, height: 200, backgroundColor: 'rosybrown' }}>
      <Text>Bengaluru</Text>
      <Text>19</Text>
      <Text>Mostly Clear</Text>
      <Text>H: 24 L: 18</Text>
    </View>
  );
}

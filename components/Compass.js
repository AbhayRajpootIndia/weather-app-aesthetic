import { View, Text, Image, StyleSheet } from 'react-native';

const compassBody = require('../assets/images/weatherWidgets/compass-body.png');
const compassNeedle = require('../assets/images/weatherWidgets/compass-arrow.png');

export default function Compass({ width }) {
  const compassSize = width * 0.7;
  const needleSize = compassSize * 0.15;
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: compassSize,
        alignSelf: 'center',
        marginBottom: 10,
      }}
    >
      <View
        style={{
          position: 'absolute',
          width: compassSize,
          height: compassSize,
          padding: compassSize * 0.15,
          zIndex: 999,
          alignItems: 'center',
          transform: [{ rotate: 180 + 'deg' }],
        }}
      >
        <Image
          source={compassNeedle}
          style={{
            width: needleSize,
            height: needleSize,
          }}
        />
      </View>

      <Image
        source={compassBody}
        style={{
          width: compassSize,
          height: compassSize,
        }}
      />

      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: compassSize * 0.1,
        }}
      >
        <Text style={[styles.compasssText, { fontSize: 20 }]}>9.7</Text>
        <Text style={[styles.compasssText, { fontSize: 14 }]}>km/h</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  compasssText: {
    color: 'white',
    fontWeight: '600',
  },
});

// transform: [{ rotate: 250 + 'deg' }],

import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';

export default function RainFallWidget({ rainData, handlePress }) {
  return (
    <View style={styles.widgetWrapper}>
      <Pressable
        onPress={() =>
          handlePress ? handlePress() : console.log('Air qulity see more')
        }
      >
        <BlurView
          intensity={20}
          tint="dark"
          blurReductionFactor={0.5}
          overlayColor="transparent"
          reducedTransparencyFallbackColor="rgba(72, 49, 157, 0.20)"
        >
          <View style={styles.widgetContainer}>
            <View style={styles.header}>
              <Image
                source={require('../assets/images/weatherWidgets/drop.png')}
                style={{ height: 18, width: 18 }}
              />
              <Text style={styles.headerText}>RAINFALL</Text>
            </View>
            <Text
              style={{
                color: 'white',
                marginTop: 5,
                fontSize: 32,
              }}
            >
              {rainData.currentPrecip} mm
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
              }}
            >
              in last hour
            </Text>
            <Text
              style={{
                color: 'white',
                marginTop: 15,
                fontSize: 14,
              }}
            >
              {rainData.totalPrecip} mm expected in
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
              }}
            >
              next 24h.
            </Text>
          </View>
        </BlurView>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  widgetWrapper: {
    overflow: 'hidden',
    height: 180,
    marginVertical: 10,
    borderRadius: 25,
    width: '48%',
  },
  widgetContainer: {
    borderColor: 'rgba(235, 235, 245, 0.4)',
    borderWidth: 1,
    borderRadius: 25,
    height: 180,
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    columnGap: 5,
    alignItems: 'center',
  },
  headerText: {
    color: 'rgba(235, 235, 245, 0.6)',
    fontSize: 16,
    marginBottom: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: 'rgba(235, 235, 245, 0.2)',
    borderTopWidth: 1,
    marginTop: 10,
  },
});

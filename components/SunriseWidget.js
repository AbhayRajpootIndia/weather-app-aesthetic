import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { useMemo, useState } from 'react';

// components
import CustomSlider from './CustomSlider';
import SunriseCurve from './SunriseCurve';

export default function SunriseWidget({ astroData, handlePress }) {
  const [sliderContainerWidth, setSliderContainerWidth] = useState(300);

  // function to get current width of a View - (in this case for the outter container)
  const getWidgetContainerDimensions = (event) => {
    var { x, y, width, height } = event.nativeEvent.layout;
    // console.log(x);
    // console.log(y);
    // console.log(width);
    // console.log(height);
    setSliderContainerWidth(width);
  };

  const sunriseTime = useMemo(
    () => astroData.sunrise || '00:00 --',
    [astroData]
  );

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
          <View
            style={styles.widgetContainer}
            onLayout={(event) => getWidgetContainerDimensions(event)}
          >
            <View style={styles.header}>
              <Image
                source={require('../assets/images/weatherWidgets/sunrise.png')}
                style={{ height: 20, width: 20 }}
              />
              <Text style={styles.headerText}>SUNRISE</Text>
            </View>
            <Text
              style={{
                color: 'white',
                fontSize: 28,
              }}
            >
              {sunriseTime}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              width: 600,
              height: '100%',
              justifyContent: 'flex-end',
              paddingBottom: 30,
            }}
          >
            <SunriseCurve width={sliderContainerWidth} />
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

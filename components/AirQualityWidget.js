import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { useMemo, useState } from 'react';
import { IconButton } from 'react-native-paper';

// components
import CustomSlider from './CustomSlider';

const aiqMessage = (aiqIndex) => {
  if (0 < aiqIndex && aiqIndex <= 3) {
    return 'Low health risk';
  } else if (4 <= aiqIndex && aiqIndex <= 6) {
    return 'Moderate health risk';
  } else if (7 <= aiqIndex && aiqIndex <= 10) {
    return 'High health risk';
  } else {
    return 'Air Quality Index not found';
  }
};

export default function AirQualityWidget({ aiqData, handlePress }) {
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

  const aiqIndex = useMemo(() => aiqData['gb-defra-index'] || 0, [aiqData]);

  return (
    <View style={styles.widgetWrapper}>
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
              source={require('../assets/images/weatherWidgets/wind.png')}
              style={{ height: 20, width: 20 }}
            />
            <Text style={styles.headerText}>AIR QUALITY</Text>
          </View>
          <Text
            style={{
              color: 'white',
              fontSize: 24,
            }}
          >
            {aiqIndex} - {aiqMessage(aiqIndex)}
          </Text>

          <CustomSlider
            sliderWidth={sliderContainerWidth - 10}
            value={aiqIndex / 10}
            maxFactor={0.9}
          />

          <Pressable
            onPress={() =>
              handlePress ? handlePress() : console.log('Air qulity see more')
            }
          >
            <View style={styles.footer}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                }}
              >
                See more
              </Text>
              <IconButton
                icon="chevron-right"
                size={35}
                iconColor="rgba(235, 235, 245, 0.4)"
                style={{ margin: 0 }}
              ></IconButton>
            </View>
          </Pressable>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  widgetWrapper: {
    overflow: 'hidden',
    height: 200,
    marginVertical: 5,
    marginTop: 25,
    marginHorizontal: 10,
    borderRadius: 25,
  },
  widgetContainer: {
    borderColor: 'rgba(235, 235, 245, 0.4)',
    borderWidth: 1,
    borderRadius: 25,
    height: 200,
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
    marginVertical: 20,
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

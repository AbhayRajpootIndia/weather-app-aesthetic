import { View, Image } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

function SliderCircle() {
  return (
    <View
      style={{
        width: 10,
        height: 10,
        backgroundColor: 'white',
        borderRadius: 20,
      }}
    ></View>
  );
}

export default function CustomSlider({ value, sliderWidth }) {
  return (
    <View style={{ marginVertical: 15 }}>
      <MultiSlider
        enabledOne={false}
        sliderLength={sliderWidth || 300}
        markerOffsetX={value * sliderWidth}
        customMarker={() => <SliderCircle />}
        trackStyle={{ opacity: 0 }}
        containerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          height: 6,
          zIndex: 999,
        }}
      />

      {/* image or any other element for the background of slider bar */}
      <Image
        style={{
          width: '100%',
          height: 5,
          position: 'absolute',
          zIndex: 1,
        }}
        source={require('../assets/images/weatherWidgets/rainbow-color-bar.png')}
      />
    </View>
  );
}

import { View, Image } from 'react-native';

import SunriseCurveSvg from '../assets/images/weatherWidgets/sunrise-curve-2.jsx';

export default function SunriseCurve({ width, pointSize }) {
  const canvasWidth = width || 400;
  const canvasHeight = (8 / 27) * canvasWidth;

  const dotSize = pointSize || canvasWidth * 0.06;

  const dotX = canvasWidth * 0.34;
  const dotY = canvasHeight * 0.3 * 1;

  return (
    <View
      style={{
        width: canvasWidth,
        aspectRatio: 27 / 8,
      }}
    >
      <View
        style={{
          width: '100%',
          height: '50%',
          position: 'absolute',
          zIndex: 999,
          paddingTop: dotY,
          paddingLeft: dotX,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(256,256,256, 0.6)',
        }}
      >
        <View
          style={{
            width: dotSize,
            height: dotSize,
            marginLeft: -dotSize / 2,
            marginTop: -dotSize / 2,
            backgroundColor: 'white',
            borderRadius: 50,
          }}
        >
          <Image
            style={{
              position: 'absolute',
              width: dotSize * 1.4,
              height: dotSize * 1.4,
              marginLeft: -0.2 * dotSize,
              marginTop: -0.2 * dotSize,
            }}
            source={require('../assets/images/weatherWidgets/glowing-circle.png')}
          />
        </View>
      </View>
      <SunriseCurveSvg />
    </View>
  );
}

import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const SunriseCurveSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    viewBox="0 0 1920 560"
    {...props}
  >
    <Path
      fill="none"
      stroke="#3f5787"
      strokeWidth={25}
      d="M16.933 538.517S229.506 516.6 473.672 316.49 758.662 18.523 965.244 18.523"
    />
    <Path
      fill="none"
      stroke="#3f5787"
      strokeWidth={25}
      d="M1911.819 538.517S1699.245 516.6 1455.08 316.49 1170.09 18.523 963.508 18.523"
    />
  </Svg>
);
export default SunriseCurveSvg;

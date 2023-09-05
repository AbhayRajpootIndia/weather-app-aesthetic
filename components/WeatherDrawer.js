import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Dimensions,
  useAnimatedValue,
  ScrollView,
} from 'react-native';

import { BlurView } from 'expo-blur';

function WeatherDrawer() {
  const { width, height } = Dimensions.get('screen');
  const drawerHeight = height * 0.75;

  const [isOpen, setIsOpen] = useState(false);

  const pan = useRef(new Animated.ValueXY(0, 900)).current;
  const myY = useAnimatedValue(0);
  const yMax = useAnimatedValue(320);
  const yMin = useAnimatedValue(-320);

  const [yOffsetAtAnimationStart, setYOffsetAtAnimationStart] = useState(0);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => (isOpen ? false : true),
      onPanResponderMove: (e, gestureState) => {
        if (pan.y._value === -320) {
          setIsOpen(true);
          console.log('rannnnnn');
        }

        if (pan.y._value > 320) {
          console.log('1st');

          Animated.event(
            [
              null,
              {
                dx: pan.x,
                dy: yMax,
              },
            ],
            {
              useNativeDriver: false,
            }
          )(e, gestureState);
        } else if (pan.y._value < -320) {
          console.log('2nd' + yMin._value);

          Animated.event(
            [
              null,
              {
                dx: pan.x,
                dy: yMin,
              },
            ],
            {
              useNativeDriver: false,
            }
          )(e, gestureState);
        } else {
          console.log('3rd');

          Animated.event(
            [
              null,
              {
                dx: pan.x,
                dy: pan.y,
              },
            ],
            {
              useNativeDriver: false,
            }
          )(e, gestureState);
        }
      },
      onPanResponderRelease: async (e, { vy }) => {
        //pan.extractOffset();
        console.log(pan.y._value);
        console.log('bacn');
        if (pan.y._value > 100) {
          console.log('1st');
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        } else if (pan.y._value < -320) {
          console.log('2nd');
          Animated.spring(pan, {
            toValue: -320,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  //pan.y <= 320 || pan.y > -320 ? pan.y : 0.0

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag this box!</Text>
      <Animated.View
        style={{
          transform: [
            {
              translateY: pan.y,
            },
          ],
        }}
        {...panResponder.panHandlers}
      >
        <BlurView
          intensity={30}
          tint="dark"
          style={[
            styles.blurContainer,
            { width: width + 2, height: drawerHeight },
          ]}
        >
          <View style={styles.drawerHandle}></View>
          <ScrollView style={{ height: 500, backgroundColor: 'red' }}>
            <Text style={styles.text}>"hello"</Text>
          </ScrollView>
        </BlurView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  blurContainer: {
    overflow: 'hidden',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderColor: '#EBEBF599',
    borderWidth: 1,
    borderBottomWidth: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: -320,
  },
  drawerHandle: {
    backgroundColor: 'rgba(0, 0, 0, 0.30)',
    width: '18%',
    height: '1%',
    marginVertical: 10,
    borderRadius: 20,
  },
});

export default WeatherDrawer;

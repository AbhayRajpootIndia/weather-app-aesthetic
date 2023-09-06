import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useLayoutEffect,
  useEffect,
} from 'react';

import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Text,
  Image,
  Animated,
  ImageBackground,
  Pressable,
  Alert,
} from 'react-native';

import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

// not using normal flatlist since it wont scroll, must use from react-native-gesture-handler only
import { FlatList } from 'react-native-gesture-handler';

// components
import WeatherDrawerBottomTabsBar from './WeatherDrawerBottomTabsBar';
import WeatherElement from './WeatherElement';
import { LinearGradient } from 'expo-linear-gradient';

function TopBarButtons({ buttonText, isFocused, onPress }) {
  return (
    <Pressable
      onPress={
        onPress
          ? onPress
          : () =>
              Alert.alert(
                'Error',
                'OnPress handler is missing for this button.'
              )
      }
    >
      <View style={{ justifyContent: 'space-between', rowGap: 5 }}>
        <Text style={{ color: isFocused ? 'white' : '#EBEBF599' }}>
          {buttonText || 'Button Text'}
        </Text>
        {isFocused && (
          <LinearGradient
            start={{ x: 0.0, y: 1.0 }} // left side
            end={{ x: 1.0, y: 0.0 }} // right side
            colors={[
              'rgba(255, 255, 255, 0.10)',
              'rgba(255, 255, 255, 0.25)',
              'rgba(255, 255, 255, 0.50)',
              'rgba(255, 255, 255, 0.75)',
              'white',
              'rgba(255, 255, 255, 0.75)',
              'rgba(255, 255, 255, 0.50)',
              'rgba(255, 255, 255, 0.25)',
              'rgba(255, 255, 255, 0.10)',
            ]}
            style={{ width: '100%', height: 1 }}
          />
        )}
      </View>
    </Pressable>
  );
}

function WeatherDrawer() {
  const { width } = Dimensions.get('screen');
  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => ['40%', '80%'], []);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: '12',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: '1',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: '2',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: '3',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: '4',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: '5',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: '6',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: '7',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: '8',
    },
  ];

  const [forecastType, setForecastType] = useState('hourly');

  const animatedY = new Animated.Value(0);

  const handleSheetChange = useCallback((index) => {
    console.log('handleSheetChange', index);

    if (index === 0) {
      Animated.timing(animatedY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedY, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, []);

  // pointerEvents="box-none" means that the corresponding view will not receive the touch events while its children will

  return (
    <>
      <View style={styles.tabBarWrapper} pointerEvents="box-none">
        <Animated.View style={[{ transform: [{ translateY: animatedY }] }]}>
          <WeatherDrawerBottomTabsBar currentIndex animatedY={animatedY} />
        </Animated.View>
      </View>

      <View style={styles.container}>
        <BottomSheet
          ref={sheetRef}
          backgroundStyle={styles.sheetBackground}
          handleIndicatorStyle={styles.drawerHandle}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
        >
          <BottomSheetScrollView
            contentContainerStyle={styles.contentContainer}
          >
            <View style={[styles.topBarContainer, { width }]}>
              <TopBarButtons
                buttonText="Hourly Forecast"
                isFocused={forecastType === 'hourly'}
                onPress={() => setForecastType('hourly')}
              />
              <TopBarButtons
                buttonText="Weekly Forecast"
                isFocused={forecastType === 'weekly'}
                onPress={() => setForecastType('weekly')}
              />
            </View>
            <SafeAreaView style={styles.weatherElementsContainer}>
              <FlatList
                data={DATA}
                horizontal={true}
                scrollEnabled={true}
                renderItem={({ item }) => (
                  <WeatherElement time={item.title} key={item} />
                )}
                keyExtractor={(item, index) => index}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              />
            </SafeAreaView>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    zIndex: 5,
    opacity: 1,
  },
  container: {
    flex: 1,
    paddingTop: 200,
  },
  sheetBackground: {
    opacity: 0.9,
    backgroundColor: '#2E335A',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderWidth: 1,
    borderColor: '#EBEBF599',
  },
  contentContainer: {
    flexDirection: 'column',
    paddingTop: 10,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    height: 50,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#EBEBF599',
  },
  drawerHandle: {
    backgroundColor: 'rgba(0, 0, 0, 0.30)',
    width: '14%',
    height: 5,
  },
  weatherElementsContainer: {
    flexGrow: 1,
  },
  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: -5,
    marginTop: -10,
    marginBottom: 15,
    borderBottomColor: '#EBEBF599',
    borderBottomWidth: 1,
  },
});

export default WeatherDrawer;

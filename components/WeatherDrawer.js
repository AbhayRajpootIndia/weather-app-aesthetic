import { useCallback, useRef, useMemo, useState } from 'react';

import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';

import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

// not using normal flatlist since it wont scroll, must use from react-native-gesture-handler only
import { FlatList } from 'react-native-gesture-handler';

// components
import WeatherDrawerBottomTabsBar from './WeatherDrawerBottomTabsBar';
import TopBarButtons from './TopBarButtons';
import WeatherElement from './WeatherElement';
import AirQualityWidget from './AirQualityWidget';
import UvIndexWidget from './UvIndexWidget';

function TopBar({ width, forecastType, setForecastType }) {
  return (
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
  );
}

export default function WeatherDrawer() {
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

  // we use useRef() to store the value of new Animted.Value(0) to avoid re-initialising of the Animated.Value to 0 whenever a state changes in our component
  const animatedY = useRef(new Animated.Value(0));
  const bottomElementsOpacity = useRef(new Animated.Value(0.0));

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSheetChange = useCallback((index) => {
    console.log('handleSheetChange', index);
    setCurrentIndex(index);

    // when drawer is closed
    if (index === 0) {
      // bottomElements OPACITY
      Animated.timing(bottomElementsOpacity.current, {
        toValue: 0.0,
        duration: 50,
        useNativeDriver: true,
      }).start();

      Animated.timing(animatedY.current, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
    // when drawer is opened
    else {
      Animated.timing(animatedY.current, {
        toValue: 100,
        duration: 40,
        useNativeDriver: true,
      }).start();

      // bottomElements OPACITY
      Animated.timing(bottomElementsOpacity.current, {
        toValue: 1.0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, []);

  // pointerEvents="box-none" means that the corresponding view will not receive the touch events while its children will

  return (
    <>
      <View style={styles.tabBarWrapper} pointerEvents="box-none">
        <Animated.View
          style={[{ transform: [{ translateY: animatedY.current }] }]}
        >
          <WeatherDrawerBottomTabsBar currentIndex />
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
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <TopBar
              width={width}
              forecastType={forecastType}
              setForecastType={setForecastType}
            />

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

              <Animated.View
                style={[
                  { height: 800 },
                  { opacity: bottomElementsOpacity.current },
                ]}
              >
                <AirQualityWidget />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 5,
                  }}
                >
                  <UvIndexWidget />
                  <UvIndexWidget />
                </View>
              </Animated.View>
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
    height: '101%',
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

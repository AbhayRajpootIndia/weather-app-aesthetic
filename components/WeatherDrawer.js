import { useCallback, useRef, useMemo, useState, useEffect } from 'react';

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

// APIS

// redux
import { useSelector } from 'react-redux';

// components
import WeatherDrawerBottomTabsBar from './WeatherDrawerBottomTabsBar';
import TopBarButtons from './TopBarButtons';
import WeatherElement from './WeatherElement';
import AirQualityWidget from './AirQualityWidget';
import UvIndexWidget from './UvIndexWidget';
import SunriseWidget from './SunriseWidget';
import WindWidget from './WindWidget';
import RainFallWidget from './RainFallWidget';

// top bar component
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

// WEATHER DRAWER

export default function WeatherDrawer({ setIsOpenDrawer }) {
  const { width } = Dimensions.get('screen');

  const weatherData = useSelector((state) => state.weather.weatherData);
  const hourlyData = useSelector((state) => state.weather.hourlyData);
  const aiqData = useSelector((state) => state.weather.aiqData);
  const uvData = useSelector((state) => state.weather.uvData);
  const astroData = useSelector((state) => state.weather.astroData);
  const rainData = useSelector((state) => state.weather.rainData);
  const windData = useSelector((state) => state.weather.windData);

  const currentHour = useMemo(() => new Date().getHours(), []);

  useEffect(() => {
    if (weatherData.forecast) {
      setTimeout(() => {
        try {
          weatherListRef.current.scrollToIndex({
            animated: true,
            index: currentHour + 1 < 24 ? currentHour + 1 : currentHour,
          });
        } catch (err) {
          console.error(err);
        }
      }, 100);
    }
  }, [weatherData]);

  const weatherListRef = useRef();

  const getItemLayout = (data, index) => {
    return { length: 80, offset: 80 * index, index };
  };

  const scrollToIndexFailed = (error) => {
    try {
      weatherListRef.scrollToOffset({
        offset: error.averageItemLength * error.index,
        animated: true,
      });
      setTimeout(() => {
        if (hourlyData.length !== 0 && weatherListRef !== null) {
          weatherListRef.scrollToIndex({ index: error.index, animated: true });
        }
      }, 100);
    } catch (err) {
      console.error(err);
    }
  };

  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => ['40%', '80%'], []);

  const [forecastType, setForecastType] = useState('hourly');

  // we use useRef() to store the value of new Animted.Value(0) to avoid re-initialising of the Animated.Value to 0 whenever a state changes in our component
  const animatedY = useRef(new Animated.Value(0));
  const bottomElementsOpacity = useRef(new Animated.Value(0.5));
  const bottomElementsY = useRef(new Animated.Value(50));

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSheetChange = useCallback((index) => {
    console.log('handleSheetChange', index);
    setCurrentIndex(index);

    // when drawer is closed
    if (index === 0) {
      setIsOpenDrawer(false);
      // bottomElements OPACITY
      Animated.timing(bottomElementsOpacity.current, {
        toValue: 0.5,
        duration: 50,
        useNativeDriver: true,
      }).start();

      Animated.timing(bottomElementsY.current, {
        toValue: 50,
        duration: 100,
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
      setIsOpenDrawer(true);

      Animated.timing(animatedY.current, {
        toValue: 100,
        duration: 40,
        useNativeDriver: true,
      }).start();

      // bottomElements
      Animated.timing(bottomElementsOpacity.current, {
        toValue: 1.0,
        duration: 100,
        useNativeDriver: true,
      }).start();

      Animated.timing(bottomElementsY.current, {
        toValue: 0.0,
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
                ref={weatherListRef}
                getItemLayout={getItemLayout}
                onScrollToIndexFailed={scrollToIndexFailed}
                data={hourlyData}
                renderItem={({ item }) => (
                  <WeatherElement
                    hourData={item}
                    key={item.time_epoch}
                    currentHour={currentHour}
                  />
                )}
                keyExtractor={(item, index) => item.time_epoch}
                scrollEnabled={true}
                horizontal={true}
                initialNumToRender={5}
                maxToRenderPerBatch={3}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              />

              <Animated.View
                style={[
                  {
                    paddingBottom: 20,
                    opacity: bottomElementsOpacity.current,
                    transform: [{ translateY: bottomElementsY.current }],
                  },
                ]}
              >
                <AirQualityWidget aiqData={aiqData} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                  }}
                >
                  <UvIndexWidget uvData={uvData} />
                  <SunriseWidget astroData={astroData} />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    marginTop: -5,
                  }}
                >
                  <WindWidget windData={windData} />
                  <RainFallWidget rainData={rainData} />
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

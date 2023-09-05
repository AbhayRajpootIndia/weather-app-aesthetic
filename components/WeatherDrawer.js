import React, { useCallback, useRef, useMemo } from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions } from 'react-native';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';

import { BlurView } from 'expo-blur';

import { FlatList } from 'react-native-gesture-handler';
import WeatherElement from './WeatherElement';

function WeatherDrawer() {
  const { width, height } = Dimensions.get('screen');

  const sheetRef = useRef(null);

  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ['35%', '50%', '80%'], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log('handleSheetChange', index);
  }, []);

  // render
  const renderItem = useCallback(
    (item) => <WeatherElement time={12} key={item} />,
    []
  );

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

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.drawerHandle}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {/* {data.map(renderItem)} */}
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
  );
}

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    paddingHorizontal: 5,
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
});

const styles2 = StyleSheet.create({
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
});

export default WeatherDrawer;

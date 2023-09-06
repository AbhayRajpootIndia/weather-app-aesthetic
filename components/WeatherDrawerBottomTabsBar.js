import {
  View,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Pressable,
} from 'react-native';

const tabBarBackgroundRectangle = require('../assets/images/tab-bar-background.png');
const plusButton = require('../assets/images/plus-button.png');

function BottomTabButton({ iconImage, tabButtonHeight }) {
  const iconSize = tabButtonHeight * 0.7;
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 5,
      }}
    >
      <Image source={iconImage} style={{ width: iconSize, height: iconSize }} />
    </View>
  );
}

function WeatherDrawerBottomTabsBar() {
  const { width, height } = Dimensions.get('window');

  const backgroundImageSizeFactor = 1.6;
  const tabButtonHeight = (128 / 561) * width * 0.9;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <ImageBackground
          source={tabBarBackgroundRectangle}
          style={[styles.backgroundRectangle, { width: width }]}
        >
          <View
            style={[
              styles.tabButtonsContainer,
              { width: width, height: tabButtonHeight },
            ]}
          >
            <BottomTabButton
              iconImage={require('../assets/images/location-icon.png')}
              tabButtonHeight={tabButtonHeight}
            />
            <BottomTabButton
              iconImage={require('../assets/images/list-icon.png')}
              tabButtonHeight={tabButtonHeight}
            />
          </View>
          <Pressable onPress={() => console.log('bee')}>
            <View style={{ justifyContent: 'center' }}>
              <Image
                style={{
                  height: 65,
                  width: 65,
                  position: 'absolute',
                  alignSelf: 'center',
                  zIndex: 50,
                }}
                source={plusButton}
              />
              <Image
                style={[
                  styles.backgroundImage,
                  {
                    height: 0.076 * height * backgroundImageSizeFactor,
                    width: 0.202 * width * backgroundImageSizeFactor,
                  },
                ]}
                source={require('../assets/images/tab-bar-button-container.png')}
              />
            </View>
          </Pressable>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    zIndex: 5,
    opacity: 1,
  },
  container: {
    height: '10%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    opacity: 1,
    backgroundColor: 'cyan',
  },
  backgroundImage: {
    aspectRatio: 337 / 128,
  },
  backgroundRectangle: {
    aspectRatio: 561 / 128,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tabButtonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default WeatherDrawerBottomTabsBar;

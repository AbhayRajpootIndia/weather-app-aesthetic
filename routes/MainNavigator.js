import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

function MainNavigator() {
  const tabBarLabels = {
    CreateScreen: 'Weather',
    ScanScreenNavigator: 'Scan',
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <></>}
      >
        <Tab.Screen name="HomeScreen" children={() => <HomeScreen />} />
        {/* <Tab.Screen
        name="ScanScreenNavigator"
        children={() => <ScanScreenNavigator />}
      /> */}
      </Tab.Navigator>
    </>
  );
}

export default MainNavigator;

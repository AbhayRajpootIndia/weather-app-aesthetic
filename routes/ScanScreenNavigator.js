import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function ScanScreenNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="ScanScreen" children={() => <ScanScreen />} />
      <Stack.Screen
        name="ScanResultScreen"
        children={() => <ScanResultScreen />}
      /> */}
    </Stack.Navigator>
  );
}

export default ScanScreenNavigator;

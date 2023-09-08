import { useMemo } from 'react';
import { View, Pressable, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function TopBarButtons({ buttonText, isFocused, onPress }) {
  const underlineGradientColors = useMemo(
    () => [
      'rgba(255, 255, 255, 0.10)',
      'rgba(255, 255, 255, 0.25)',
      'rgba(255, 255, 255, 0.50)',
      'rgba(255, 255, 255, 0.75)',
      'white',
      'rgba(255, 255, 255, 0.75)',
      'rgba(255, 255, 255, 0.50)',
      'rgba(255, 255, 255, 0.25)',
      'rgba(255, 255, 255, 0.10)',
    ],
    []
  );

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
        <Text
          style={
            isFocused
              ? { color: 'white', opacity: 0.9 }
              : { color: '#EBEBF599' }
          }
        >
          {buttonText || 'Button Text'}
        </Text>
        {isFocused && (
          <LinearGradient
            start={{ x: 0.0, y: 1.0 }} // left side
            end={{ x: 1.0, y: 0.0 }} // right side
            colors={underlineGradientColors}
            style={{ width: '100%', height: 1 }}
          />
        )}
      </View>
    </Pressable>
  );
}

export default TopBarButtons;

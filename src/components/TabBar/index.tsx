import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, TouchableOpacity, View, useWindowDimensions } from 'react-native';

interface TabbarProps {
  state: any; 
  descriptors: any; 
  navigation: any; 
}

function Tabbar({ state, descriptors, navigation }: TabbarProps) {
  const { width } = useWindowDimensions();
  const tabWidth = width / state.routes.length;

  useEffect(() => {
    // ... (kode useEffect yang sama seperti sebelumnya)
  }, [state.index]);

  let route = state.routes[state.index];
  let routeName = route?.name || 'Home';

  const stackName = getFocusedRouteNameFromRoute(route);

  if (
    (routeName === 'Root:Messages' && stackName === 'Chat') ||
    (routeName === 'Root:Groups' && stackName === 'GroupChat') ||
    (routeName === 'Root:Stories' && stackName === 'Story') ||
    (routeName === 'Root:Calls' && stackName === 'Calling')
  ) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: 'main', height: 60, position: 'relative' }}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const Icon = options.tabBarIcon;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View key={index} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: isFocused ? 30 : 0,
                backgroundColor: 'main',
                width: isFocused ? 60 : tabWidth,
                height: isFocused ? 60 : 60,
              }}
              accessibilityRole="button"
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              activeOpacity={0.8}
            >
              <Icon focused={isFocused} />
            </TouchableOpacity>
          </View>
        );
      })}

      <View
        style={{
          height: 60,
          position: 'absolute',
          left: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          width: tabWidth,
        }}
      >
        <Image
          source={require('../assets/images/button.png')}
          style={{
            width: 120, 
            height: 60, 
            position: 'absolute',
            bottom: 8,
            left: -(130 - tabWidth) / 2,
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

export default Tabbar;

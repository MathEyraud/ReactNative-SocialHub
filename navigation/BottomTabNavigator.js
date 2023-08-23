import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import StackNavigatorHome       from './StackNavigatorHome';
import StackNavigatorFavorite   from './StackNavigatorFavorite';

import colors                   from '../theme/colors';
import fonts                    from '../theme/fonts';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    
  return (

    <Tab.Navigator 
        initialRouteName='StackNavigatorHome'
        screenOptions={({ route }) => ({
            headerShown:false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color }) => {

              let iconName;
  
              if (route.name === 'StackNavigatorHome') {
                iconName = focused ? 'home' : 'home-outline';

              } else if (route.name === 'StackNavigatorFavorite') {
                iconName = focused ? 'heart-sharp' : 'heart-outline';
              }
  
              return <Ionicons name={iconName} size={30} color={color} />;
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.grey,
        })}
    >

      <Tab.Screen name="StackNavigatorHome"     component={StackNavigatorHome} />

      <Tab.Screen name="StackNavigatorFavorite" component={StackNavigatorFavorite} />

    </Tab.Navigator>

  );
}
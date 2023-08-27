import * as React from 'react';
import { 
  createDrawerNavigator, 
  DrawerContentScrollView, 
  DrawerItemList } from "@react-navigation/drawer";

import { Ionicons } from '@expo/vector-icons';

import BottomTabNavigator from './BottomTabNavigator';
import FaqScreen          from "../screens/Faq";
  
import colors             from "../theme/colors";
import fonts              from '../theme/fonts';
import DrawerCustom       from '../components/DrawerCustom';
import fontSize           from '../theme/fontSize';



const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {

  return (

    <Drawer.Navigator 
      initialRouteName="HomeScreen"
      drawerContent={(props) => <DrawerCustom {...props} />}
      screenOptions={ ({route}) => ({
        
        headerShown:false,
        drawerLabelStyle:{
          fontFamily:fonts.PrimaryBold,
          fontSize:fontSize.Primary,
        },

        drawerType:"slide",
        swipeEdgeWidth:100,

        drawerIcon: ({ focused, color, size }) => {

          let iconName;

          if (route.name === 'BottomTabNavigator') {
            iconName = focused ? 'home' : 'home-outline';

          } else if (route.name === 'FaqScreen') {
            iconName = focused ? 'chatbox-ellipses-sharp' : 'chatbox-ellipses-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        overlayColor:colors.primary + 'A0',

        drawerActiveTintColor : colors.primary,
        drawerInactiveTintColor : colors.black,
      })}
      
    >

      <Drawer.Screen 
        name="BottomTabNavigator" 
        component={BottomTabNavigator} 
        options={{
          title:'Accueil',
        }}
      />

      <Drawer.Screen 
        name="FaqScreen"       
        component={FaqScreen}    
        options={{
          title:'FAQ',
          headerShown:true,
        }}   
      />

    </Drawer.Navigator>

  );
}
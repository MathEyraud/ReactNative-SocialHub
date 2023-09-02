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
import ProfileScreen      from '../screens/Profile';
import NotificationScreen from '../screens/Notification';
import StackNavigatorProfile from './StackNavigatorProfile';




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

          }else if (route.name === 'Faq') {
            iconName = focused ? 'chatbox-ellipses-sharp' : 'chatbox-ellipses-outline';

          }else if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';

          }else if (route.name === 'Notification') {
            iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
            
          }else if (route.name === 'ProfileRoute') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
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
        name="ProfileRoute"       
        component={StackNavigatorProfile}    
        options={{
          title:'Profil',
        }}   
      />

      <Drawer.Screen 
        name="Notification"       
        component={NotificationScreen}    
        options={{
          title:'Notification',
          headerShown:true,
        }}   
      />

      <Drawer.Screen 
        name="Faq"       
        component={FaqScreen}    
        options={{
          title:'FAQ',
          headerShown:true,
        }}   
      />

    </Drawer.Navigator>

  );
}
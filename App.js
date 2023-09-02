import 'react-native-gesture-handler';
import * as React from 'react';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer }  from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/Login';
import CreateProfileScreen from './screens/CreateProfile';

import store from './redux/store';
import { Provider } from 'react-redux';

import {
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
  OpenSans_300Light_Italic,
  OpenSans_400Regular_Italic,
  OpenSans_500Medium_Italic,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold_Italic,
} from '@expo-google-fonts/open-sans';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator()

export default function App() {

  // -------------------------------------------- //
  // ---------- CHARGEMENT DES POLICES ---------- //
  // -------------------------------------------- //
  const [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
    OpenSans_300Light_Italic,
    OpenSans_400Regular_Italic,
    OpenSans_500Medium_Italic,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold_Italic,
  });

  if (!fontsLoaded) {
    return null;

  }else{
    SplashScreen.hideAsync();
  }
  //
  //
  //
  //
  //
  // ------------------------------- //
  // ---------- AFFICHAGE ---------- //
  // ------------------------------- //
  return (

    <Provider store={store}>

      <NavigationContainer>

        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Login'>

          <Stack.Screen name="Login"          component={LoginScreen}         />
          <Stack.Screen name="CreateProfile"  component={CreateProfileScreen} />
          
          <Stack.Screen name="Home"           component={DrawerNavigator}     />

        </Stack.Navigator>

      </NavigationContainer>

    </Provider>

  );
}
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardStyleInterpolators,TransitionPresets  } from '@react-navigation/stack';

import ProfileScreen from '../screens/Profile';
import AddSocialMediaScreen from '../screens/AddSocialMedia';

import ModalAnimation from '../animations/modalAnimations';

const Stack = createNativeStackNavigator();

export default function StackNavigatorProfile({navigation}) {
    
    return (

        <Stack.Navigator initialRouteName="ProfileScreen" >

            <Stack.Screen 
                name="Profile"       
                component={ProfileScreen}
            />

            <Stack.Screen 
                name="AddSocialMedia"  
                component={AddSocialMediaScreen} 
                options={{
                    headerShown:false,
                    ...ModalAnimation
                }}   
            />

        </Stack.Navigator>

    );
};
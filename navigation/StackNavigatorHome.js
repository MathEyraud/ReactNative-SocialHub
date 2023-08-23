import * as React from 'react';
import { Easing } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen       from "../screens/Home";
import PortfolioScreen  from "../screens/Portfolio";
import PhotoScreen      from "../screens/Photo";

import colors                   from "../theme/colors";
import fonts                    from '../theme/fonts';
import ButtonHeaderCustom       from '../components/ButtonHeaderCustom';
import { HeaderButtons, Item }  from 'react-navigation-header-buttons';

const Stack = createNativeStackNavigator();

const openConfig = {};
const closeConfig = {};

export default function StackNavigatorHome({navigation}) {

    return (

        <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
                headerMode: 'screen',
                headerStyle: { 
                    backgroundColor: colors.white,
                },
                headerTitleStyle: {
                    fontFamily:fonts.PrimaryBold,
                    fontSize: 25,                   
                },
                headerTitleAlign: 'center'
            }}
        >

            <Stack.Screen 
                name="Home"       
                component={HomeScreen}      
                options={{
                    title: 'Accueil',
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={ButtonHeaderCustom}>
                            <Item 
                                title="menu" 
                                iconName="menu" 
                                iconSize={30}
                                onPress={() => navigation.openDrawer()} 
                            />
                        </HeaderButtons>
                    ),
                }}
                
                
            />

            <Stack.Screen 
                name="Portfolio"  
                component={PortfolioScreen} 
                /*options={ 
                    title: DEFINIT DANS LE COMPOSANT DE L'ECRAN
                }*/
            />

            <Stack.Screen 
                name="Photo"      
                component={PhotoScreen}     
                /*options={ 
                    title: DEFINIT DANS LE COMPOSANT DE L'ECRAN
                }*/
            />

        </Stack.Navigator>

    );
};
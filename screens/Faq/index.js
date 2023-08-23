import { Text, View, Button } from 'react-native'
import React from 'react'

import { styles } from './style'
import TextCustom from '../../components/Text/TextCustom'

export default function FaqScreen({navigation}) {

  // -------------------------------- //
  // ---------- NAVIGATION ---------- //
  // -------------------------------- //
  const handleNavifateToHome = () => {
    navigation.navigate('Home')
  }

  const handleNavifateToPortfolio = () => {
      navigation.navigate('Portfolio')
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

    <View style={styles.containerScreen}>

      <TextCustom style={{ fontSize: 30 }}>Faq Screen</TextCustom>
      
    </View>

  )
};
//
//
//
//
//
// ---------------------------- //
// ---------- HEADER ---------- //
// ---------------------------- //
//Possibilité de gérer le header ici 
FaqScreen.navigationOptions = (navigationData) => {

  return{
      
  }
};


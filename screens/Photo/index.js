import { View, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'

import TextCustom       from '../../components/Text/TextCustom'
import TextTitleCustom  from '../../components/Text/TextTitleCustom'

import getScreenDimensions from '../../utils/screenDimensions'

import { styles } from './style'


export default function PhotoScreen({route, navigation}) {

  // ---------------------------------------------- //
  // ---------- RECUPERATION DES DONNEES ---------- //
  // ---------------------------------------------- //
    const data          = route.params;
    const urlImage      = data.photo.url;
    const title         = data.photo.title;
    const description   = data.photo.description

    const colorTextHeader       = data.colorTextHeader
    const colorBackgroundHeader = data.favColor

    const screenDimensions = getScreenDimensions()
  //
  //
  //
  //
  //
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
  // -------------------------------------------- //
  // ---------- MODIFICATION DU HEADER ---------- //
  // -------------------------------------------- //
  useLayoutEffect(() => {

    navigation.setOptions({

      headerTitle: title.toUpperCase(), // Remplacez par le titre souhaité

      headerStyle: {
        backgroundColor: colorBackgroundHeader,
      },

      headerTintColor: colorTextHeader,
    });

  }, []);
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

      <View style={styles.containerPhoto}>

        <Image
          source={{uri : urlImage}}
          style={[styles.styleImage, {height:screenDimensions.height*(1/3)}]}
        />

      </View>



      <View style={styles.containerDescription}>

        <TextTitleCustom>{title}</TextTitleCustom>
        <TextCustom>{description}</TextCustom>

      </View>
      
    </View>

  )
};
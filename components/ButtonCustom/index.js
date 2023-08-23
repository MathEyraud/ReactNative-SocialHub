import { View, Text,Pressable } from 'react-native'
import React from 'react'
import { styles } from './style'
import colors from '../../theme/colors'
import TextCustom from '../Text/TextCustom'


export default function ButtonCustom({
  title,
  buttonEnabled,
  colorButton,
  onPress,
  stylesPressable,
  stylesLabel,
}) {

  return (

    <Pressable 
      style={({pressed}) => [
        {backgroundColor: pressed ? colorButton + '90'  : (buttonEnabled ? colorButton : colors.grey)},
        {...styles.containerButton,...stylesPressable},
      ]}
      onPress={onPress}
      disabled={!buttonEnabled}
    >

      <TextCustom 
        style={{...styles.label,...stylesLabel}}
      >
        {title}
      </TextCustom>
    
    </Pressable>

  )
}
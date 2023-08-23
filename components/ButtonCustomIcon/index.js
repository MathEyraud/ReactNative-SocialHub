import { View, Text,Pressable } from 'react-native'
import React from 'react'

import colors from '../../theme/colors'
import TextCustom from '../Text/TextCustom'
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';


export default function ButtonCustomIcon({
  nameIcon,
  sizeIcon,
  colorIcon,
  buttonEnabled,
  colorButton,
  onPress,
  stylesPressable,
}) {

  return (

    <Pressable 
      style={({pressed}) => [
        {backgroundColor: pressed ? colorButton + 'A0'  : (buttonEnabled ? colorButton : colors.grey)},
        {...styles.containerButton,...stylesPressable},
      ]}
      onPress={onPress}
      disabled={!buttonEnabled}
    >

      <Ionicons name={nameIcon} size={sizeIcon} color={colorIcon} />
    
    </Pressable>

  )
}
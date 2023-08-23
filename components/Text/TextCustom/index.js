import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './style'

export default function TextCustom({
    children,
    style,
    ...props
    }) {
  
    return (
        <Text style={[styles.label, style]} {...props}>
            {children}
        </Text>
    )
}
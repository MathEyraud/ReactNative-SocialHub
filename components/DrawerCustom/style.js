import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../theme/colors'
import fonts from '../../theme/fonts'
import fontSize from '../../theme/fontSize'
import borderRadius from '../../theme/borderRadius'



export const styles = StyleSheet.create({

    styleImage:{
        width: 100, 
        height: 100, 
        marginBottom: 20,
        borderRadius:borderRadius.Primary
    },

    labelUserName:{
        fontFamily: fonts.PrimaryBold, 
        fontSize: fontSize.Primary, 
        color: colors.primary,
    },

    containerLogOut:{
        flexDirection:'row',
        paddingHorizontal:20,
        paddingVertical:10,
        gap:30,
    },



})
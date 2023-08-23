import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import fonts from '../../theme/fonts'

export const styles = StyleSheet.create({

    containerButton:{

        flex:1,

        justifyContent:'center',
        alignItems:'center',

        borderRadius:10,    
    },

    label:{
        fontSize:20,
        fontFamily: fonts.PrimaryMedium
    },

})
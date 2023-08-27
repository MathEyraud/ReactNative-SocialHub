import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import fonts from '../../theme/fonts'
import fontSize from '../../theme/fontSize'
import borderRadius from '../../theme/borderRadius'

export const styles = StyleSheet.create({

    containerButton:{

        flex:1,

        justifyContent:'center',
        alignItems:'center',

        borderRadius:borderRadius.Button,    
    },

    label:{
        fontSize:fontSize.Button,
        fontFamily: fonts.PrimaryMedium
    },

})
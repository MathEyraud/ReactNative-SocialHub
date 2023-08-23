import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../theme/colors'

export const styles = StyleSheet.create({

    containerTouchableImage:{

        width:'100%',
        height:400,
        marginBottom:30,
    },

    containerImage:{
        flex:1,
        justifyContent: 'flex-end',
    },

    labelTitle:{
        color: colors.white,
        fontSize:30,
        backgroundColor: colors.black + 'A0',
        paddingVertical:5,
        paddingHorizontal:10,
        textAlign:'center',
    },

})
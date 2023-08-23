import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../theme/colors'

export const styles = StyleSheet.create({

    containerModal:{
        flex:1,
        paddingHorizontal:30,
        gap:30,
    },  

    containerHeader:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },

    labelTitle:{
        flex:1,
        textAlign:'center',
    },

    labelSubTitle:{
        textAlign:'center',
    },

    containerDescritption:{

    },

    separator:{
        borderWidth:0.5,
    },

    containerButton:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:50,
    },

    styleButton:{
        width:'100%',
        height:50,
        color:colors.white
    },


})
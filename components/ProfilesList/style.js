import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../theme/colors'

export const styles = StyleSheet.create({

    containerProfilesList:{
        width:'100%',
        backgroundColor:colors.white,
        padding:10,
    },   
    
    containerImage:{
        height:100,
        width:100,
        borderRadius:20,
    },

    autoLRow:{
        flex:1,
        flexDirection:'row',

        alignItems:'center',

        gap : 20,
    },

    containerInfo:{
        flex:1,
        flexDirection:'row',
        
        justifyContent: 'space-between',
        alignItems:'center',

        gap : 20,
        paddingRight:20,
    },

    containerButton:{

        //position:'absolute',
        height:50,
        width:100,

        //right:10,
    },

})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import colors       from '../../theme/colors'
import borderRadius from '../../theme/borderRadius'
import fonts        from '../../theme/fonts'
import fontSize     from '../../theme/fontSize'

export const styles = StyleSheet.create({ 

    containerInput:{
        width:'100%',
        height:50,

        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',

        backgroundColor:colors.white,
        borderRadius:borderRadius.Input,
        paddingHorizontal:20,
    },

    styleInput:{
        flex:1,
        fontFamily:fonts.PrimaryMedium,
        fontSize:fontSize.Input,
        textAlign:'center',
    },

})
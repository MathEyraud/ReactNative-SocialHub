import { StyleSheet } from 'react-native'
import colors from '../../theme/colors'

import getScreenDimensions from '../../utils/screenDimensions';
const screenDimensions = getScreenDimensions()

export const styles = StyleSheet.create({

    containerTouchableImage:{

        width:'100%',
        height:screenDimensions.height/3,
        marginBottom:20,
    },

    containerImage:{
        flex:1,
        justifyContent: 'flex-end',
    },

    labelTitle:{
        color: colors.white,
        fontSize:25,
        backgroundColor: colors.black + 'A0',
        paddingVertical:5,
        paddingHorizontal:10,
        textAlign:'center',
    },

})
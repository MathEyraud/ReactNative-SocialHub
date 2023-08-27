import { StyleSheet } from 'react-native'
import colors from '../../theme/colors'
import borderRadius from '../../theme/borderRadius'
import fonts from '../../theme/fonts'
import fontSize from '../../theme/fontSize'

export const styles = StyleSheet.create({

    containerScreen:{
        flex:1,

        justifyContent:'center',
        alignItems:'center',

        backgroundColor:colors.primary,

        gap:20,
        padding:20,
    },

    labelTitle:{
        color:colors.white
    },

    containerInput:{
        width:'100%',
        height:50,

        justifyContent:'center',
        alignItems:'center',

        backgroundColor:colors.white,
        borderRadius:borderRadius.Input,
        paddingHorizontal:20,

    },

    containerPhoto:{
        width:'100%',
        height:300,

        justifyContent:'center',
        alignItems:'center',
    },

    containerButton:{
        width:'100%',
        height:50,
    },

    styleInput:{
        width:'100%',
        height:'100%',

        fontFamily:fonts.PrimaryMedium,
        fontSize:fontSize.Input,
        textAlign:'center',
    },

    styleLabelButton:{
        textTransform:'uppercase', 
        color:colors.primary
    },

    styleLabelButtonNavigation:{
        color:colors.white
    },


})
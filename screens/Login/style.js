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

    containerButton:{
        width:'100%',
        height:50,
    },

    styleLabelButton:{
        textTransform:'uppercase', 
        color:colors.primary
    },

    styleLabelButtonNavigation:{
        color:colors.white
    },


})
import { StyleSheet } from 'react-native'
import colors from '../../theme/colors'

export const styles = StyleSheet.create({

    containerScreen:{
        flex:1,
    },

    styleButton:{
        paddingHorizontal:20,
        //width:150,
        height:50,

        position:'absolute',
        right:50,
        bottom:50,
    },
    
    labelButton:{
        color:colors.white
    }

})
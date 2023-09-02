import { StyleSheet } from 'react-native'
import fonts from '../../theme/fonts'

export const styles = StyleSheet.create({

    containerScreen:{
        flex:1,

        justifyContent:'center',
        alignItems:'center',

        gap:20,
        padding: 20,
    },

    containerButton:{
        width:'100%',
        height:50,
    },

    containerSection:{
        width:'100%',
        justifyContent:'center',
        alignItems:'flex-start',
    },

    containerText:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },

})
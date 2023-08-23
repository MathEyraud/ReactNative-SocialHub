import { StyleSheet } from 'react-native'
import fonts from '../../theme/fonts'

export const styles = StyleSheet.create({

    containerScreen:{
        flex:1,
    },

    containerPhoto:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        padding: 10,
        gap:10,
    },

    styleImage:{
        width:200, 
        height : 200,
        borderRadius:100,
        borderWidth:5,

        resizeMode: 'contain',
    },

    containerBio:{
        padding:20, 
        gap : 20,
    },

})
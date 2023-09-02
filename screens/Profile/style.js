import { StyleSheet } from 'react-native'
import fonts from '../../theme/fonts'
import getScreenDimensions from '../../utils/screenDimensions'
import colors from '../../theme/colors'
import borderRadius from '../../theme/borderRadius'

const screenSize = getScreenDimensions()
const heightScreen = screenSize.height
const widthScreen = screenSize.width

const padding = 20

export const styles = StyleSheet.create({

    containerScreen:{
        flex:1,
        gap:padding,
    },

    containerPhoto:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        //marginTop: JSX,
        gap:padding,
    },

    styleImageBackground:{
        width:'100%',
        //height:JSX

        position: 'absolute',
        //top: JSX
        left: 0, 
        right: 0,

        borderRadius: borderRadius.Primary*2,
        overflow: 'hidden', // Pour que le contenu ne dépasse pas les bords arrondis
    },

    styleImage:{
        justifyContent:'center',
        alignItems:'center',

        //width:  JSX
        //height : JSX
        borderRadius:100,
        borderWidth:5,
        borderColor:colors.white,

        resizeMode: 'contain',
    },

    containerUserDatas:{
        flexDirection:'column',
        flex:1,
        gap:padding,
        paddingHorizontal :padding,
    },

    containerData:{
        flexDirection:'column',
        width:'100%',

        gap:padding,
    },

    containerSocialMedia:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        gap:padding,
        
        width:'100%',
        height:100,

        backgroundColor:colors.white,
        borderRadius:borderRadius.Primary,

        paddingHorizontal :padding,

        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },

    containerButton:{
        marginTop:20,
        flexDirection:'row',
        width:'100%',
        height:50,
        gap:padding
    },

    autoLRow:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:padding,
    },

    iconePosition:{
        zIndex:1,
        position:'absolute',
        top:-10,
        right:-10,
    },
   

})
import {StyleSheet} from 'react-native';
import borderRadius from '../../theme/borderRadius';
import getScreenDimensions from '../../utils/screenDimensions';
import colors from '../../theme/colors';

const screenSize = getScreenDimensions()
const heightScreen = screenSize.height
const widthScreen = screenSize.width


const styles = StyleSheet.create({

    // -------------------------------------- //
    // ---------- CONTAINER SCREEN ---------- //
    // -------------------------------------- //

    containerPreviousScreen:{
        width:'100%',
        height:'75%',
        backgroundColor:colors.primary + "90"
    },

    containerScreen:{
        width:'100%',
        height:'25%',

        //borderTopLeftRadius:borderRadius.Primary,
        //borderTopRightRadius:borderRadius.Primary,
        //backgroundColor:colors.primary,

        position: 'absolute',
        bottom: 0,
    },

    // ------------------------------------- //
    // ---------- HEADER POSITION ---------- //
    // ------------------------------------- //
    containerHeader:{
        height:50,
    },

    headerTop:{
        flex:1,
        backgroundColor:colors.primaryTransparent
    },

    headerBottom:{
        flex:1,
        backgroundColor:colors.white
    },

    // ---------------------------- //
    // ---------- HEADER ---------- //
    // ---------------------------- //
    styleHeader:{
        width:'100%',
        height:50,

        zIndex:1,
        position:'absolute',
        alignItems:'center',

        backgroundColor:colors.white,
        borderTopLeftRadius:borderRadius.Primary,
        borderTopRightRadius:borderRadius.Primary,
    },

    styleGreyBar:{
        width:'20%',
        height:'5%',

        top:10,

        backgroundColor:colors.grey,
        borderRadius:100,
    },


    // ---------------------------- //
    // ---------- DATA ---------- //
    // ---------------------------- //
    containerData:{
        flex:2,

        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',

        padding:20,
        gap:20,
        backgroundColor:colors.white,

    },

});
  
export default styles;
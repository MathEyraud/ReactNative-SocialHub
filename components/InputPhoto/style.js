import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import borderRadius from '../../theme/borderRadius';

const styles = StyleSheet.create({

  container: {
    flex:1,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:borderRadius.Input,
  },

  labelTitle: {
    fontSize: 20,
    textAlign:'center',
  },

  image: {
    position:'absolute',
    width: '100%',
    height:'100%', 
    borderRadius:borderRadius.Primary,
    zIndex:1,
  },

  containerIconeBin:{
    position:'absolute',
    justifyContent:'flex-end',
    flex:1,
    height:'100%',
    width:"100%",
    zIndex:2,
    flexDirection:'row',
  },

  iconeBin:{
    right:16,
    top:16,
  },

});

export default styles;

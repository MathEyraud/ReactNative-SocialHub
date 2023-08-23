import { StyleSheet, Text, View,ImageBackground } from 'react-native'
import React from 'react'

import { styles } from './style'
const NoDataPath = '../../assets/NoData.png' 


export default Nodata = () => {
  return (
    <View style={{flex:1}}>
        <ImageBackground 
            source={require(NoDataPath)}
            style={styles.styleBackground}
        />
    </View>
  )
}


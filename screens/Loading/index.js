// LoadingScreen.js

import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import colors from '../../theme/colors';
import { styles } from './style';
import TextCustom from '../../components/Text/TextCustom';

export default LoadingScreen = () => {
  return (
    <View style={styles.containerScreen}>
      <ActivityIndicator size="large" color={colors.primary} />
      <TextCustom>Merci de patienter !</TextCustom>
    </View>
  );
};

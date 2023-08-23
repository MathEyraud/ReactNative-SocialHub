import * as React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './style';
import colors     from '../../theme/colors';


export default ButtonHeaderCustom = (props) => {

  return (
    <HeaderButton
      IconComponent={Ionicons}
      iconSize={30}
      color={colors.black}
      {...props}
    />
  )
}

import { StyleSheet, Text, View, Modal, Pressable, Switch } from 'react-native'
import React from 'react'

import { styles } from './style';
import TextCustom from '../Text/TextCustom';
import colors from '../../theme/colors';

export default SwitchCustom = ({
    title,
    value,
    setValue,
    }) => {
        
        return (
            <View style={styles.containerSwitch}>
                <TextCustom>{title}</TextCustom>
                <Switch
                    value={value}
                    onValueChange={setValue(!value)}
                    trackColor={{false: colors.grey, true: colors.success}}
                    thumbColor={value ? colors.white : colors.white}
                />
            </View>
        )
}


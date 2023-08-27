import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'

import { Ionicons } from '@expo/vector-icons';
import { styles } from './style'
import colors from '../../theme/colors';

export default InputText = ({
    onChangeText,
    password,
    placeholder,
    ...props
    }) => {

    const [hidePassword, setHidePassword] = useState(password);

    return (
        
        <View style={styles.containerInput}>

            <TextInput
                style={styles.styleInput}
                onChangeText={onChangeText}
                secureTextEntry={hidePassword}
                placeholder={placeholder}
                {...props}
            />

            {password && (
                <Ionicons
                    name={hidePassword ? "ios-eye" : "ios-eye-off"}
                    size={24}
                    color={colors.primary}
                    onPress={() => setHidePassword(!hidePassword)}
                />
            )}

        </View>

    )
}

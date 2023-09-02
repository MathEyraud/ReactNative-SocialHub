import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'

import { Ionicons } from '@expo/vector-icons';
import { styles } from './style'
import colors from '../../theme/colors';
import TextTitleCustom from '../Text/TextTitleCustom';
import TextCustom from '../Text/TextCustom';

const InputText = ({
    title,
    onChangeText,
    password,
    placeholder,
    styleContainer,
    styleInput,
    editable,
    ...props
    }) => {

    const [hidePassword, setHidePassword] = useState(password);

    return (

        <View style={styles.container}>

            {title && <TextCustom style={styles.labelTitle}>{title} :</TextCustom>}
        
            <View style={{...styles.containerInput, ...styleContainer}}>

                <TextInput
                    style={{...styles.styleInput,...styleInput}}
                    onChangeText={onChangeText}
                    secureTextEntry={hidePassword}
                    placeholder={placeholder}
                    editable={editable}
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

        </View>

    )
} 
export default InputText;
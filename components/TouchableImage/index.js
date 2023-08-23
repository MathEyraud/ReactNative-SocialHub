import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../theme/colors'
import TextCustom from '../Text/TextCustom';
import { styles } from './style';

export default TouchableImage = ({
    urlImage, 
    onPress,
    pressColor, 
    titleImage,
    }) => {

    return (
        <View style={styles.containerTouchableImage}>

            <Pressable 
                onPress={onPress}
                style={({pressed}) => [
                    {
                        backgroundColor: pressed ? pressColor + 'A0' : 'transparent',
                    },
                    {flex:1}
                ]}
            >

                <ImageBackground
                    source={{uri:urlImage}}
                    style={styles.containerImage}
                    resizeMode="cover"
                >

                <TextCustom style={styles.labelTitle}> {titleImage} </TextCustom>

                </ImageBackground>

            </Pressable>

        </View>

        
    )
}
import { View, Text, Pressable } from 'react-native'
import React from 'react'
import TextCustom from '../Text/TextCustom'
import { styles } from './style'
import { Image } from 'react-native'
import colors from '../../theme/colors'
import ButtonCustom from '../ButtonCustom'

export default function ProfilesList({
    name,
    country,
    urlImage,
    pressButton,
    }) {

    return (

        <View style={styles.containerProfilesList}>

            <View style={styles.autoLRow}>

                <Image
                    source={{uri : urlImage}}
                    style={styles.containerImage}
                />

                <View style={styles.containerInfo}>

                    <View>

                        <TextCustom style={{fontSize:30}}>{name}</TextCustom>

                        <TextCustom>{country}</TextCustom>  

                    </View>

                    <View style={styles.containerButton}>

                        <ButtonCustom
                            title="Détails"
                            colorButton={colors.primary}
                            onPress={pressButton}
                            buttonEnabled={true}
                            //stylesPressable={styles.containerButton}
                            stylesLabel={{color:colors.white}}
                        />

                    </View>    

                </View> 

            </View>

        </View>
    )
}
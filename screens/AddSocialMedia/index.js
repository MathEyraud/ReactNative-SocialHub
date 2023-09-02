import { Modal, View, StatusBar, Pressable, Alert  } from 'react-native'
import React, { useState } from 'react'

import styles       from './style';
import InputText    from '../../components/InputText';
import colors       from '../../theme/colors';
import ButtonCustom from '../../components/ButtonCustom';

export default function AddSocialMediaScreen ({
    isVisible,
    setShowAddSocialMedia,
    onModalCloseFail,
    onModalCloseSucces,
    }){
        
    const [urlSocialMedia, setUrlSocialMedia] = useState("")
    
    /* ---------------------------------------------- */
    /* ---------- GESTION DE LA VALIDATION ---------- */
    /* ---------------------------------------------- */
    const handleValideLink = () => {

        console.log("\n ----- handleValideLink ----- ",);
        console.log("urlSocialMedia",urlSocialMedia);

        //On vérifie l'url
        if (isValidUrl(urlSocialMedia)) {
            
            //ON LANCE LA FONCTION D'AJOUT
            onModalCloseSucces(urlSocialMedia)
            
            //ON FERME LA MODAL
            setShowAddSocialMedia(prevState => !prevState)

        } else {
            Alert.alert('URL non valide', 'L\'URL n\'est pas valide. Veuillez entrer une URL correcte.');
        }
        
    }

    const isValidUrl = (inputText) => {
        // Expression régulière pour valider une URL
        const urlPattern = /^(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
    
        return urlPattern.test(inputText);
    };

    /* --------------------------------- */
    /*               AFFICHAGE           */
    /* --------------------------------- */
    return (

        <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={() => {onModalCloseFail()}}>

            {/* ---------- PREVIOUS SCREEN ---------- */}
            <Pressable 
                style={[styles.containerPreviousScreen]} 
                onPress={() => {onModalCloseFail()}}
            > 
                <StatusBar backgroundColor={colors.primaryTransparent} />
            </Pressable>



            {/* ---------- ACTUAL SCREEN ---------- */}
            <View style={[styles.containerScreen]}>

                {/* ---------- HEADER ---------- */}
                <View style={styles.containerHeader}>

                    <View style={styles.headerTop}></View>

                    <View style={styles.styleHeader}>
                        <View style={styles.styleGreyBar}></View>
                    </View>
                    
                    <View style={styles.headerBottom}></View>

                </View>

                <View style={{height:1, backgroundColor:colors.grey}}></View>

                {/* ---------- DATAS ---------- */}
                <View style={styles.containerData}>
                    
                    <View style={{flex:3}}> 

                        <InputText
                            onChangeText={text=> setUrlSocialMedia(text)}
                            placeholder="Url du compte"
                            editable={true}
                            keyboardType={"url"}
                            styleContainer={{backgroundColor:colors.input}}
                            placeholderTextColor={colors.primary}
                        />

                    </View>

                    <View style={{flex:1,height:50}}> 

                    {urlSocialMedia.length === 0 ?(
                        <ButtonCustom
                            title='ANNULER'
                            buttonEnabled={true}
                            colorButton={colors.warning}
                            onPress={() => onModalCloseFail()}
                            stylesLabel={{color:colors.white}}
                        />
                    ):(
                        <ButtonCustom
                            title='VALIDER'
                            buttonEnabled={true}
                            colorButton={colors.primary}
                            onPress={() => handleValideLink()}
                            stylesLabel={{color:colors.white}}
                        />
                    )}
                        
                    </View>

                </View>

            </View>

        </Modal>
    );
};
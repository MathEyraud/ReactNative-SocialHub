import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React, { useCallback, useState } from 'react'

import { Ionicons }     from '@expo/vector-icons';
import TextCustom       from '../Text/TextCustom';

import TextTitleCustom  from '../Text/TextTitleCustom';
import SwitchCustom     from '../SwitchCustom';
import ButtonCustom     from '../ButtonCustom';

import { styles }       from './style';
import colors           from '../../theme/colors';

import { useDispatch }          from 'react-redux';
import { setFieldsSettings }    from '../../redux/actions/actionSelectionSettings';

export default ModalSettings = ({
    showModal,
    setShowModal,

    }) => {
        
        const [isElectronique       ,setIsElectronique]         = useState(true)
        const [isIA                 ,setIsIA]                   = useState(true)
        const [isInformatique       ,setIsInformatique]         = useState(true)
        const [isTelecommunications ,setIsTelecommunications]   = useState(true)
        const [isCivil              ,setIsCivil]                = useState(true)
        const [isMecanique          ,setIsMécanique]            = useState(true)

        const dispatch = useDispatch()
        
        const saveSettings = useCallback(() => {

            const savedSettings ={
                electronique        : isElectronique,
                IA                  : isIA,
                informatique        : isInformatique,
                telecommunication   : isTelecommunications,
                civil               : isCivil,
                mecanique           : isMecanique,
            };

            dispatch(setFieldsSettings(savedSettings));

            setShowModal(false);

        },[isElectronique, isIA, isInformatique, isTelecommunications, isCivil, isMecanique])

        return (
            <Modal visible={showModal} animationType="slide">

                <View style={styles.containerModal}>

                    <View style={styles.containerHeader}>

                        <TextTitleCustom style={styles.labelTitle}>Paramètres</TextTitleCustom>

                        <Pressable onPress={() => setShowModal(false)}>
                            <Ionicons name="close" size={30} color="black" />
                        </Pressable>

                    </View>

                    <View style={styles.containerDescritption}>

                        <TextCustom style={styles.labelSubTitle}>Utilisez les paramètres pour gérer les domaines.</TextCustom>

                    </View>

                    <View style={styles.separator}/>

                    <View>

                        <SwitchCustom title={"Électronique"}        value={isElectronique}          setValue={() => setIsElectronique        }/>
                        <SwitchCustom title={"IA"}                  value={isIA}                    setValue={() => setIsIA                  }/>
                        <SwitchCustom title={"Informatique"}        value={isInformatique}          setValue={() => setIsInformatique        }/>
                        <SwitchCustom title={"Télécommunications"}  value={isTelecommunications}    setValue={() => setIsTelecommunications  }/>
                        <SwitchCustom title={"Civil"}               value={isCivil}                 setValue={() => setIsCivil               }/>
                        <SwitchCustom title={"Mécanique"}           value={isMecanique}             setValue={() => setIsMécanique           }/>
                    
                    </View>

                    <View>

                        {isElectronique === false &&
                            isIA === false &&
                            isInformatique === false &&      
                            isTelecommunications === false &&
                            isCivil === false &&             
                            isMecanique === false ?         

                            (
                                <View style={styles.containerButton}>
                                    <ButtonCustom
                                        title='Veuillez choisir au moins un domaine'
                                        buttonEnabled={false}
                                        stylesPressable={styles.styleButton}
                                        stylesLabel={{color:colors.white}}
                                    />
                                </View>
                            )
                            :
                            (
                                <View style={styles.containerButton}>
                                    <ButtonCustom
                                        title='Valider les paramètres'
                                        buttonEnabled={true}
                                        colorButton={colors.primary}
                                        onPress={saveSettings}
                                        stylesPressable={styles.styleButton}
                                        stylesLabel={{color:colors.white}}
                                    />
                                </View>
                            )
                        } 

                    </View>

                </View>

            </Modal>
        )
}


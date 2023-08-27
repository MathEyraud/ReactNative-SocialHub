import { View, FlatList} from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import ButtonHeaderCustom from '../../components/ButtonHeaderCustom'

import ProfilesList from '../../components/ProfilesList'

import { styles } from './style'
import NoData from '../../components/NoData'
import ModalSettings from '../../components/ModalSettings'
import ButtonCustom from '../../components/ButtonCustom'
import colors from '../../theme/colors'
import ButtonCustomIcon from '../../components/ButtonCustomIcon'

export default function HomeScreen({navigation}) {

    const authUser = useSelector(state => state.userPersonnalData);

    // -------------------------------- //
    // ---------- NAVIGATION ---------- //
    // -------------------------------- //
    const handleNavigateToPortfolio = (item) => {
        navigation.navigate('Portfolio',item)
    }

    const handleNavifateToPhoto = () => {
        navigation.navigate('Photo')
    }
    //
    //
    //
    //
    //
    // ------------------------------------------------- //
    // ---------- GESTION DU MESSAGE SETTINGS ---------- //
    // ------------------------------------------------- //
    const [showModal, setShowModal] = useState(false) 
    const handlePressSettings = () => {
        setShowModal(!showModal)
    }
    //
    //
    //
    //
    //
    // ---------------------------------------------- //
    // ---------- RECUPERATION DES DONNEES ---------- //
    // ---------------------------------------------- //
    const selectedFieldsSettings    = useSelector(state => state.users.selectedFieldsSettings)
    const userData                  = useSelector(state => state.userPersonnalData)
    //
    //
    //
    //
    //
    // --------------------------------------- //
    // ---------- GESTION DU HEADER ---------- //
    // --------------------------------------- //
    useLayoutEffect(() => {

        navigation.setOptions({

            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={ButtonHeaderCustom}>
                    <Item 
                        title="settings" 
                        iconName={showModal ? "settings" : "settings-outline" }
                        iconSize={30}
                        onPress={() => handlePressSettings()} 
                    />
                </HeaderButtons>
            )
        });

    }, [showModal]);
    //
    //
    //
    //
    //
    // ------------------------------- //
    // ---------- AFFICHAGE ---------- //
    // ------------------------------- //
    if(selectedFieldsSettings.length === 0){
        return (<NoData/>)

    }else{
        return (

            <View style={styles.containerScreen}>

                <ModalSettings showModal={showModal} setShowModal={setShowModal}>


                </ModalSettings>
                
                <FlatList
                    data={selectedFieldsSettings}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <ProfilesList
                            name={item.firstName}
                            country={item.country}
                            urlImage={item.urlProfileImage}
                            pressButton={() => handleNavigateToPortfolio(item)}
                        />
                    )}
                />
    
            </View>
        )
    }
    
};
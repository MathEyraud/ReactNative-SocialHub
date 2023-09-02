import React, { useLayoutEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, Image, ActivityIndicator, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import ButtonCustom from '../ButtonCustom';
import { styles } from './style';

import { getData, removeAllUserData } from '../../utils/AsyncStorage/storage';
import ASYNCSTORAGE_USER_DATA from '../../utils/AsyncStorage/userData'

import { actionLogout } from '../../redux/actions/actionAuthUser';
import { useDispatch } from 'react-redux';

export default DrawerCustom = (props) => {

    // ----------------------------------------------------- //
    // ---------- GESTION DES DONNEES UTILISATEUR ---------- //
    // ----------------------------------------------------- //
    const [userFirstName,setUserFirstName]  = useState("");
    const [userLastName ,setUserLastName]   = useState("");
    const [userPhoto    ,setUserPhoto]      = useState();
    const [isDataLoad   ,setIsDataLoad]     = useState(false);

    const dispatch = useDispatch();
    
    const loadUserData = async() => {

        try {
            setUserFirstName(await getData(ASYNCSTORAGE_USER_DATA.FIRST_NAME    ))
            setUserLastName (await getData(ASYNCSTORAGE_USER_DATA.LAST_NAME     ))
            setUserPhoto    (await getData(ASYNCSTORAGE_USER_DATA.PROFILE_PHOTO ))
            setIsDataLoad(true)
            
        } catch (error) {
            Alert.alert(
                "Erreur", 
                "Il y a eu un problème lors de la récupération de vos données !"
                [{text: 'Retour page connexion', onPress:()=> props.navigation.repalce('Login')}]
            )
        }
    }

    useLayoutEffect(() => {
        loadUserData()
    },[])
    //
    //
    //
    //
    //
    // ----------------------------------------------- //
    // ---------- GESTION DE LA DECONNEXION ---------- //
    // ----------------------------------------------- //
    const handleLogOut = async () => {

        try {

            await dispatch(await actionLogout());
            await removeAllUserData()
            props.navigation.dispatch(resetAction);
            props.navigation.replace('Login')

        } catch (error) {
            Alert.alert("Alert", "Il y a eu un problème lors de votre déconnexion !")
            alert(error)

        }
    }

    const resetAction = CommonActions.reset({
        index: 0, // L'index de la nouvelle route dans la stack
        routes: [{ name: 'Login' }], // La nouvelle route que vous voulez définir comme point de départ
    });
    //
    //
    //
    //
    //
    // ------------------------------- //
    // ---------- AFFICHAGE ---------- //
    // ------------------------------- //
    return (
        <DrawerContentScrollView {...props}>

            {/* ----- PROFIL ----- */}
            <View style={{ padding: 20 }}>

                {isDataLoad ? (

                    <>
                        {!userPhoto ? (
                            <Image
                                source={require('../../assets/NoData.png')}
                                style={styles.styleImage}
                            />
                        ) : (
                            <Image
                                source={{uri : userPhoto}}
                                style={styles.styleImage}
                            />
                        )}
                        
                        <Text style={styles.labelUserName}>
                            {userFirstName}
                        </Text>
                        <Text style={styles.labelUserName}>
                            {userLastName}
                        </Text>
                    </>
        
                ) : (

                    <ActivityIndicator size="large" color={colors.primary} />    

                )}
                
            </View>


            {/* ----- ONGLETS ----- */}
            <DrawerItemList {...props} />

            
            {/* ----- DECONNEXION ----- */}
            <View style={styles.containerLogOut}>

                <Ionicons name="log-out-outline" size={24} color="black" />

                <ButtonCustom 
                    title="Déconnexion"
                    buttonEnabled={true}
                    colorButton={"transparent"}
                    onPress={handleLogOut}
                    stylesPressable={{
                        alignItems:'flex-start'
                    }}
                    stylesLabel={{
                        fontFamily:fonts.PrimaryBold,
                    }}
                />

            </View>

        </DrawerContentScrollView>
    );

};
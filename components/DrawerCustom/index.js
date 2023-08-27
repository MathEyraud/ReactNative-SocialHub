import React, { useLayoutEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, Image, ActivityIndicator } from 'react-native';
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
    
    const loadUserName = async() => {

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
        loadUserName()
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

        dispatch(actionLogout());

        try {
            await removeAllUserData()
            props.navigation.navigate('Login')

        } catch (error) {
            Alert.alert("Alert", "Il y a eu un problème lors de votre déconnexion !")
            alert(error)

        }
    }
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

        <DrawerItemList {...props} />

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
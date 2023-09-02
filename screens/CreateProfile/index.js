import { ActivityIndicator, Alert, View, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './style';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import ButtonCustom from '../../components/ButtonCustom';

import TextTitleCustom from '../../components/Text/TextTitleCustom';
import { useDispatch } from 'react-redux';
import { createProfile, setUserData } from '../../redux/actions/actionSetUserData';
import InputPhoto from '../../components/InputPhoto';

import ASYNCSTORAGE_USER_DATA from '../../utils/AsyncStorage/userData'
import { getData } from '../../utils/AsyncStorage/storage';
import { useLayoutEffect } from 'react';
import InputText from '../../components/InputText';

export default function CreateProfileScreen({navigation}) {
    
    // ------------------------------------------- //
    // ---------- GESTION DES VARIABLES ---------- //
    // ------------------------------------------- //
    const [userFirstName,setUserFirstName   ]   = useState("")
    const [userLastName ,setUserLastName    ]   = useState("")
    const [userPhotoUrl ,setUserPhotoUrl    ]   = useState(null)
    const [userIdAuth   ,setUserIdAuth      ]   = useState(null)
    const [userEmail    ,setUserEmail       ]   = useState(null)
    
    const [isSignup     ,setIsSignup        ]   = useState(true)
    const [error        ,setError           ]   = useState(null)
    const [isLoading    ,setIsLoading       ]   = useState(false)
    const [isAuth       ,setIsAuth          ]   = useState(false)



    const textInputRef = useRef(null);
    const dispatch = useDispatch()
    //
    //
    //
    //
    //
    // ----------------------------------------------------- //
    // ---------- GESTION DES DONNEES UTILISATEUR ---------- //
    // ----------------------------------------------------- //
    const handleSubmitDataToFirebase = async () => {    

        if(userFirstName.length > 0 && userLastName.length > 0){

            setIsLoading(true)

            await dispatch(await createProfile(userEmail, userIdAuth, userFirstName,userLastName,userPhotoUrl))

            navigation.replace('Home')

            setIsLoading(false)

        }else{
            Alert.alert("Erreur", "Merci de renseigner les informations nécessaires !")
            setIsLoading(false)
        }
    }

    useEffect(() => {

        if(error !== null){
            Alert.alert("Erreur",error)
        }

    },[error])

    useEffect(async () => {

        const userIdAuthTempo = await getData(ASYNCSTORAGE_USER_DATA.FIREBASE_USER_ID);
        setUserIdAuth(userIdAuthTempo);

        const userEmailTempo = await getData(ASYNCSTORAGE_USER_DATA.EMAIL);
        setUserEmail(userEmailTempo);

    }, []);
      
    //
    //
    //
    //
    //
    // ------------------------------- //
    // ---------- AFFICHAGE ---------- //
    // ------------------------------- //
    return (
        
        <SafeAreaView style={styles.containerScreen}>

            <ScrollView>

                <View style={styles.containerInput}>

                    { isLoading ? 
                        <View>
                            <ActivityIndicator size="large" color={colors.white} />
                        </View>

                        :
                    
                        <View>
                            <Ionicons name="link" size={50} color={colors.white} />
                        </View>
                    }

                    <View>
                        <TextTitleCustom style={styles.labelTitle}>

                            Création de profil

                        </TextTitleCustom>
                    </View>

                    <View style={{height:20}}></View>

                    <InputText
                        onChangeText={setUserFirstName}
                        placeholder="Renseignez votre nom"
                        password={false}
                    />

                    <InputText
                        onChangeText={setUserLastName}
                        placeholder="Renseignez votre prénom"
                        password={false}
                    />

                    <View style={styles.containerPhoto}>
                        <InputPhoto
                            title="Choisir une photo"
                            setUserPhoto={setUserPhotoUrl}
                            iconeSize={40}
                            backgroundColor={colors.white}
                            colorIcone={colors.primary}
                        />
                    </View>

                    <View style={{height:20}}></View>

                    <View style={styles.containerButton}>
                        <ButtonCustom
                            title="Valider"
                            buttonEnabled={true}
                            colorButton={colors.white}
                            onPress={handleSubmitDataToFirebase}
                            stylesLabel={styles.styleLabelButton}
                        />
                    </View>

                </View>

            </ScrollView>

        </SafeAreaView>
    )
    
};
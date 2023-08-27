import { ActivityIndicator, Alert, TextInput, View, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './style';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import ButtonCustom from '../../components/ButtonCustom';

import TextTitleCustom from '../../components/Text/TextTitleCustom';
import TextCustom from '../../components/Text/TextCustom';
import { useDispatch } from 'react-redux';
import { loginFirebaseRealtimeDatabase, sendUserPersonnalData } from '../../api/firebase/firebaseAuth';
import { storeData } from '../../utils/AsyncStorage/storage';
import ASYNCSTORAGE_USER_DATA from '../../utils/AsyncStorage/userData'
import { setUserData } from '../../redux/actions/actionSetUserData';
import InputPhoto from '../../components/InputPhoto';

export default function CreateProfileScreen({navigation}) {
    
    // ------------------------------------------- //
    // ---------- GESTION DES VARIABLES ---------- //
    // ------------------------------------------- //
    const [userFirstName,setUserFirstName]  = useState("")
    const [userLastName ,setUserLastName]   = useState("")
    const [userPhotoUrl ,setUserPhotoUrl]   = useState(null)
    
    const [isSignup     ,setIsSignup]       = useState(true)
    const [error        ,setError]          = useState(null)
    const [isLoading    ,setIsLoading]      = useState(false)
    const [isAuth       ,setIsAuth]         = useState(false)



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

            await dispatch(await setUserData(userFirstName,userLastName,userPhotoUrl))

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

                            Création de compte

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
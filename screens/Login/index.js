import { ActivityIndicator, Alert, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Animated, {
    useSharedValue,
    withSpring,
    useAnimatedStyle,
    } from 'react-native-reanimated';

import { styles } from './style';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import ButtonCustom from '../../components/ButtonCustom';
import InputText from '../../components/InputText';

import TextTitleCustom from '../../components/Text/TextTitleCustom';
import { useDispatch } from 'react-redux';
import { actionLogin, actionSignup } from '../../redux/actions/actionAuthUser';

import LoadingScreen from '../../screens/Loading'

import ASYNCSTORAGE_USER_DATA from '../../utils/AsyncStorage/userData'
import { getData } from '../../utils/AsyncStorage/storage';
import { getUserData } from '../../api/firebase/firebaseAuth';

export default function LoginScreen({navigation}) {
    
    // ------------------------------------------- //
    // ---------- GESTION DES VARIABLES ---------- //
    // ------------------------------------------- //
    const [userEmail            ,setUserEmail]              = useState("")
    const [userPassword         ,setUserPassword]           = useState("")
    const [userPasswordConfirm  ,setUserPasswordConfirm]    = useState("")

    const [isSignup     ,setIsSignup]   = useState(true)
    const [error        ,setError]      = useState(null)
    const [isLoading    ,setIsLoading]  = useState(false)
    const [isAuth       ,setIsAuth]     = useState(false)


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

        console.log("userEmail",userEmail);
        console.log("userPassword",userPassword);
        console.log("userPasswordConfirm",userPasswordConfirm);

        if(userEmail.length > 0 && userPassword.length > 0){
            
            //INSCRIPTION
            if(isSignup === true && userPasswordConfirm.length > 0){

                if(userPassword === userPasswordConfirm){
                    setError(null)
                    setIsLoading(true)
                    
                    try {
                        await dispatch( await actionSignup(userEmail,userPassword))
                        navigation.replace('CreateProfile')
    
                    } catch (error) {
                        setError(error.message)
                        setIsLoading(false)
                    }

                }else{
                    Alert.alert("Erreur", "Mot de passe différent !")
                }

                
            
            //CONNEXION
            }else{
                
                setError(null)
                setIsLoading(true)
                
                try {
                    await dispatch( await actionLogin(userEmail,userPassword))
                    navigation.replace('Home')

                } catch (error) {
                    setError(error.message)
                    setIsLoading(false)
                }
            }

        }else{
            
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
    // ------------------------------------------------------- //
    // ---------- RECUPERATION DES DATA DE FIREBASE ---------- //
    // ------------------------------------------------------- //
    const loadUserData = async () => {

        const userToken     = await getData(ASYNCSTORAGE_USER_DATA.FIREBASE_TOKEN     ); //console.log("userToken     ",userToken     );
        const userId        = await getData(ASYNCSTORAGE_USER_DATA.FIREBASE_USER_ID   ); //console.log("userId        ",userId        );
        const userTokenDate = await getData(ASYNCSTORAGE_USER_DATA.FIREBASE_TOKEN_DATE); //console.log("userTokenDate ",userTokenDate );


        if(userToken !== (null || undefined) && userId !== (null || undefined)){

            if( userTokenDate <= new Date()){

                    setIsAuth(true)
                    return;

            }else{

                const userFirstName = await getData(ASYNCSTORAGE_USER_DATA.FIRST_NAME); //console.log("userFirstName",userFirstName);
                const userLastName  = await getData(ASYNCSTORAGE_USER_DATA.LAST_NAME ); //console.log("userLastName ",userLastName );
        
                if (userFirstName !== (null || undefined) && userLastName !== (null || undefined)) {
                    navigation.replace('Home');
                    setIsAuth(true);

                } else {

                    const response = await getUserData(userId); //console.log("response",response);

                    if(response === false){
                        navigation.replace('CreateProfile');
                        setIsAuth(true);
                        
                    }else{
                        navigation.replace('Home');
                        setIsAuth(true);
                    }
                    
                }
            }
            
        }else{
            setIsAuth(true)
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
    // ---------------------------------------------- //
    // ---------- TRANSITION ENTRE 'ECRAN' ---------- //
    // ---------------------------------------------- //
    const translateX = useSharedValue(0);

    const transitionLeftToRight = async () => {
        translateX.value += 200;
    }
    const transitionRightToLeft = async () => {
        translateX.value = 0;
    }
    

    const handleChangeAuth = async () => {
        await transitionLeftToRight()
        setIsSignup(prevState => !prevState)
        await transitionRightToLeft()
    };

    
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: withSpring(translateX.value * 2) }],
    }));
    //
    //
    //
    //
    //
    // ------------------------------- //
    // ---------- AFFICHAGE ---------- //
    // ------------------------------- //
    if(isAuth === false){
        return <LoadingScreen/>

    }else{
        return (

            <View style={styles.containerScreen}>

                { isLoading ? 
                    <View>
                        <ActivityIndicator size="large" color={colors.white} />
                    </View>

                    :
                
                    <View>
                        <Ionicons name="link" size={50} color={colors.white} />
                    </View>
                }

                <Animated.View style={animatedStyles}>
                    <TextTitleCustom style={styles.labelTitle}>

                        {isSignup ? "Inscription" : "Connexion"}

                    </TextTitleCustom>
                </Animated.View>

                <View></View>

                <InputText
                    onChangeText={setUserEmail}
                    placeholder="Renseignez votre adresse mail"
                    password={false}
                    inputMode='email'
                />

                <InputText
                    onChangeText={setUserPassword}
                    placeholder="Renseignez votre mot de passe"
                    password={true}
                />

                { isSignup && 
                    <InputText
                        onChangeText={setUserPasswordConfirm}
                        placeholder="Confirmer le mot de passe"
                        password={true}
                    />
                }

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

                <View style={styles.containerButton}>
                    <ButtonCustom
                        title={isSignup ? "Connexion ?" : "S'inscrire ?"}
                        buttonEnabled={true}
                        colorButton={"transparent"}
                        onPress={() => (handleChangeAuth())}
                        stylesLabel={styles.styleLabelButtonNavigation}
                    />
                </View>

            </View>
        )
    }
    
};
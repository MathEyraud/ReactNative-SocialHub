import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Alert, View } from 'react-native'
import * as Notifications from 'expo-notifications';

import { styles }   from './style'
import fonts        from '../../theme/fonts';
import colors       from '../../theme/colors'

import TextTitleCustom  from '../../components/Text/TextTitleCustom';
import ButtonCustom     from '../../components/ButtonCustom'
import TextCustom       from '../../components/Text/TextCustom';

export default function ProfileScreen({route, navigation}) {

    // -------------------------------- //
    // ---------- VARIABLES  ---------- //
    // -------------------------------- //
    const [notificationReceived     , setNotificationReceived]      = useState();
    const [notificationResponse     , setNotificationResponse]      = useState();
    const [tokenExpoPushNotification, setTokenExpoPushNotification] = useState()

    const refNotificationReceived = useRef();
    const refNotificationResponse = useRef();


    //
    //
    //
    //
    //
    // --------------------------------------- //
    // ---------- NOTIFICATION TEST ---------- //
    // --------------------------------------- //
    //PARAMETRE DE LA NOTIFICATION
    Notifications.setNotificationHandler({

        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
        }),

    });

    //DEFINITION DE LA NOTIFICATION
    async function handleNotification() {

        console.log(" ----- handleNotification ----- ",);

        await Notifications.scheduleNotificationAsync({

            content: {
                title: "Vous avez une notification",
                body: 'Vous avez ici le corps de la notification',
                data: { data: 'goes here' },
            },

            //trigger: { seconds: 2 },
            trigger: null,

        });
    }

    //GESTION DES EVENEMENTS - NOTIFICATION LOCAL
    useEffect(() => {

        console.log(" ----- addNotificationReceivedListener ----",);
        
        //CHARGEMENT DE LA NOTIFICATION QUAND ELLE APPARAIT
        refNotificationReceived.current = Notifications.addNotificationReceivedListener(notification => {
            setNotificationReceived(notification)
            console.log("La notification s'est affichée :",notification);
        })

        return () => {
            Notifications.removeNotificationSubscription(refNotificationReceived.current)
        }

    },[])

    //GESTION DES REPONSES - NOTIFICATION LOCAL
    useEffect(() => {

        console.log(" ----- addNotificationResponseReceivedListener ----",);

        //AFFICHAGE DE LA NOTIFICATION LORSEQUE L'UTILISATEUR CLIQUE DESSUS
        refNotificationResponse.current = Notifications.addNotificationResponseReceivedListener(response => {
            setNotificationResponse(response)
            console.log("L'utilisateur a cliqué sur la notification",response);
        })

        return () => {
            Notifications.removeNotificationSubscription(refNotificationResponse.current)
        }

    },[])

    //GESTION DES EVENEMENTS - NOTIFICATION PUSH (GOOGLE - APPLE)
    useEffect(() => {

        console.log(" ----- registerForPushNotifications ----",);

        registerForPushNotifications().then(token => setTokenExpoPushNotification(token))

    },[])

    async function registerForPushNotifications() {
        
        let token;

        //VERIFICATION DE LA PERMISSION DES NOTIFICATIONS PUSH
        const {status : existingStatus} = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus;

        //SI NON AUTORISE ALORS ON FAIT LA DEMANDE
        if(existingStatus !== 'granted'){
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        //VERIFICATION DE LA NOUVELLE DEMANDE
        if(finalStatus !=='granted'){
            Alert.alert("Pas de jeton de notification push !")
            return;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("token :",token);

        return token;
    }
    
    // -------------------------------------------- //
    // ---------- MODIFICATION DU HEADER ---------- //
    // -------------------------------------------- //
    useLayoutEffect(() => {

        navigation.setOptions({

            headerTitle: 'Notification',
            headerTitleStyle: {
                color: colors.black,
                fontFamily:fonts.PrimaryBold,
                fontSize: 25, 
            },
            headerTintColor: colors.primary,
        });

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

        <View style={styles.containerScreen}>

            <TextTitleCustom>SCREEN NOTIFICATION</TextTitleCustom>



            <View style={styles.containerButton}>
                <ButtonCustom
                    title="Notification"
                    buttonEnabled={true}
                    colorButton={colors.primary}
                    onPress={async () => {await handleNotification()}}
                    stylesLabel={{color:colors.white}}
                />
            </View>



            <View style={styles.containerSection}>

                <TextTitleCustom>Notification affichée </TextTitleCustom>     

                <View style={styles.containerText}>
                    <TextCustom>Titre : </TextCustom>     
                    <TextCustom>{notificationReceived && notificationReceived.request.content.title}</TextCustom>
                </View>

                <View style={styles.containerText}>
                    <TextCustom>Corps : </TextCustom>    
                    <TextCustom>{notificationReceived && notificationReceived.request.content.body}</TextCustom>
                </View>

                
                <View style={styles.containerText}>
                    <TextCustom>Date : </TextCustom>      
                    <TextCustom>{notificationReceived && notificationReceived.date}</TextCustom>
                </View>

            </View>



            <View style={styles.containerSection}>

                <TextTitleCustom>Notification pressée </TextTitleCustom>     
                
                <View style={styles.containerText}>
                    <TextCustom>Date : </TextCustom>      
                    <TextCustom>{notificationResponse && notificationResponse.notification.date}</TextCustom>
                </View>

            </View>



            <View style={styles.containerSection}>

                <TextTitleCustom>Notification 'PUSH' </TextTitleCustom>     
                
                <View style={styles.containerText}>
                    <TextCustom>Token : </TextCustom>      
                    <TextCustom>{tokenExpoPushNotification && tokenExpoPushNotification}</TextCustom>
                </View>

            </View>
            
        </View>

    )
};
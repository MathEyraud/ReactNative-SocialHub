import { ScrollView, Modal, View, Image, Alert, ImageBackground, StatusBar, Pressable, ActivityIndicator, Linking } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Animated, {useSharedValue,withSpring,useAnimatedStyle,} from 'react-native-reanimated';

import { useDispatch }          from 'react-redux';
import { modificationProfile }  from '../../redux/actions/actionSetUserData';

import { styles }   from './style'
import fonts        from '../../theme/fonts';
import colors       from '../../theme/colors'

import { getData }              from '../../utils/AsyncStorage/storage'
import ASYNCSTORAGE_USER_DATA   from '../../utils/AsyncStorage/userData'
import getScreenDimensions      from '../../utils/screenDimensions';

import InputText            from '../../components/InputText';
import ButtonCustom         from '../../components/ButtonCustom';
import ButtonHeaderCustom   from '../../components/ButtonHeaderCustom';
import TextTitleCustom      from '../../components/Text/TextTitleCustom';
import AddSocialMediaScreen from '../AddSocialMedia';





export default function ProfileScreen({route, navigation}) {

    // ---------------------------------------------- //
    // ---------- RECUPERATION DES DONNEES ---------- //
    // ---------------------------------------------- //
    const [userId       ,setUserId          ] = useState("");
    const [userEmail    ,setUserEmail       ] = useState("");

    const [userFirstName,setUserFirstName   ] = useState("");
    const [userLastName ,setUserLastName    ] = useState("");
    const [userPhotoUrl ,setUserPhotoUrl    ] = useState("");

    const [userFirstNameNew,setUserFirstNameNew   ] = useState("");
    const [userLastNameNew ,setUserLastNameNew    ] = useState("");
    const [userPhotoUrlNew ,setUserPhotoUrlNew    ] = useState("");

    const [userAccountFacebook  ,setUserAccountFacebook     ] = useState("");
    const [userAccountSnapchat  ,setUserAccountSnapchat     ] = useState("");
    const [userAccountInstagram ,setUserAccountInstagram    ] = useState("");
    const [userAccountTwitter   ,setUserAccountTwitter      ] = useState("");
    const [userAccountLinkedIn  ,setUserAccountLinkedIn     ] = useState("");

    const [userAccountFacebookNew  ,setUserAccountFacebookNew     ] = useState("");
    const [userAccountSnapchatNew  ,setUserAccountSnapchatNew     ] = useState("");
    const [userAccountInstagramNew ,setUserAccountInstagramNew    ] = useState("");
    const [userAccountTwitterNew   ,setUserAccountTwitterNew      ] = useState("");
    const [userAccountLinkedInNew  ,setUserAccountLinkedInNew     ] = useState("");

    const [isEdit               ,setIsEdit              ] = useState(false);
    const [isLoading            ,setIsLoading           ] = useState(false);
    const [showAddSocialMedia   ,setShowAddSocialMedia  ] = useState(false);
    const [socialMedia          ,setSocialMedia         ] = useState("");


    const screenSize = getScreenDimensions()
    const heightScreen = screenSize.height
    const widthScreen = screenSize.width

    const heightStatusBar = StatusBar.currentHeight || 0;

    console.log("heightStatusBar",heightStatusBar);   

    const dispatch = useDispatch()

    //
    //
    //
    //
    //
    // -------------------------------------------- //
    // ---------- MODIFICATION DU HEADER ---------- //
    // -------------------------------------------- //

    useLayoutEffect(() => {

        navigation.setOptions({
            
            //headerTitle: 'Profil',
            headerTransparent: true,
            headerTitleStyle: {
                color: colors.black,
                fontFamily:fonts.PrimaryBold,
                fontSize: 25, 
            },
            headerTintColor: colors.primary,
            headerTitleAlign:'center',
            headerStyle: {
                backgroundColor:'transparent',
            },
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={ButtonHeaderCustom}>
                    <Item
                        title="menu" 
                        iconSize={30}
                        iconName={"menu"}
                        onPress={() => (navigation.toggleDrawer())} 
                        color={colors.primary}
                    />
                </HeaderButtons>
            ),
            headerRight: () => (
                <Animated.View style={animatedStyles}>
                    <HeaderButtons HeaderButtonComponent={ButtonHeaderCustom}>
                        <Item
                            title="edit" 
                            iconSize={30}
                            iconName={isEdit ? "create" : "create-outline"}
                            onPress={!isEdit ? (() => (setIsEdit(prevState => !prevState))):null} 
                            color={colors.primary}
                        />
                    </HeaderButtons>
                </Animated.View>
            ),
        });

    }, [isEdit]);
    //
    //
    //
    //
    // -------------------------------------------- //
    // ---------- CHARGEMENT DES DONNEES ---------- //
    // -------------------------------------------- //
    useEffect(() => {

        fetchUserData();

    }, []);

    const fetchUserData = async () => {

        try {
            setUserId       (await getData(ASYNCSTORAGE_USER_DATA.FIREBASE_USER_ID  ));
            setUserPhotoUrl (await getData(ASYNCSTORAGE_USER_DATA.PROFILE_PHOTO     ));
            setUserFirstName(await getData(ASYNCSTORAGE_USER_DATA.FIRST_NAME        ));   
            setUserLastName (await getData(ASYNCSTORAGE_USER_DATA.LAST_NAME         ));   
            setUserEmail    (await getData(ASYNCSTORAGE_USER_DATA.EMAIL             )); 

            setUserPhotoUrlNew (await getData(ASYNCSTORAGE_USER_DATA.PROFILE_PHOTO  ));
            setUserFirstNameNew(await getData(ASYNCSTORAGE_USER_DATA.FIRST_NAME     ));   
            setUserLastNameNew (await getData(ASYNCSTORAGE_USER_DATA.LAST_NAME      ));  

            setUserAccountFacebook  (await getData(ASYNCSTORAGE_USER_DATA.URL_PROFILE_ACCOUNT_FACEBOOK   ));  
            setUserAccountSnapchat  (await getData(ASYNCSTORAGE_USER_DATA.URL_PROFILE_ACCOUNT_SNAPCHAT   ));  
            setUserAccountInstagram (await getData(ASYNCSTORAGE_USER_DATA.URL_PROFILE_ACCOUNT_INSTAGRAM  ));  
            setUserAccountTwitter   (await getData(ASYNCSTORAGE_USER_DATA.URL_PROFILE_ACCOUNT_TWITTER    ));  
            setUserAccountLinkedIn  (await getData(ASYNCSTORAGE_USER_DATA.URL_PROFILE_ACCOUNT_LINKEDIN   ));  

            setUserAccountFacebookNew  (await getData(ASYNCSTORAGE_USER_DATA.URL_PROFILE_ACCOUNT_FACEBOOK   ));  
            setUserAccountSnapchatNew  (await getData(ASYNCSTORAGE_USER_DATA.URL_PROFILE_ACCOUNT_SNAPCHAT   ));  
            setUserAccountInstagramNew (await getData(ASYNCSTORAGE_USER_DATA.URL_PROFILE_ACCOUNT_INSTAGRAM  ));  
            setUserAccountTwitterNew   (await getData(ASYNCSTORAGE_USER_DATA.URL_PROFILE_ACCOUNT_TWITTER    ));  
            setUserAccountLinkedInNew  (await getData(ASYNCSTORAGE_USER_DATA.URL_PROFILE_ACCOUNT_LINKEDIN   ));  

        } catch (error) {
            console.error("Erreur lors de la récupération des données [fetchUserData]:", error);
            Alert.alert("Erreur", "Erreur lors de la récupération des données !")
        }
    };
    //
    //
    //
    //
    //
    // -------------------------------------------- //
    // ---------- MODIFICATION DU PROFIL ---------- //
    // -------------------------------------------- //
    const handleEditData = async () => {
        
        try {

            const response = await new Promise((resolve) => {
                Alert.alert(
                    'Modification des données', 
                    'Vous allez modifier vos données personnelles, êtes-vous sûr de vouloir continuer ?', 
                    [
                        {
                            text: 'Annuler',
                            onPress: () => resolve(false),
                            style: 'cancel',
                        },
                        {
                            text: 'Valider', 
                            onPress: () => resolve(true),
                        },
                    ]
                );
            });
    
            if (response) {

                setIsLoading(true)

                await dispatch(await modificationProfile(
                    userId, 
                    {
                        userFirstName           : userFirstNameNew,
                        userLastName            : userLastNameNew,
                        userPhoto               : userPhotoUrlNew,
                        userAccountFacebook     : userAccountFacebookNew,
                        userAccountSnapchat     : userAccountSnapchatNew,
                        userAccountInstagram    : userAccountInstagramNew,
                        userAccountTwitter      : userAccountTwitterNew,
                        userAccountLinkedIn     : userAccountLinkedInNew,
                    }
                ))

                setUserFirstName(userFirstNameNew);
                setUserLastName(userLastNameNew);
                setUserPhotoUrl(userPhotoUrlNew);

                setUserAccountFacebook(userAccountFacebookNew)
                setUserAccountSnapchat(userAccountSnapchatNew)
                setUserAccountInstagram(userAccountInstagramNew)
                setUserAccountTwitter(userAccountTwitterNew)
                setUserAccountLinkedIn(userAccountLinkedInNew)

                setIsEdit(prevState => !prevState)
                setIsLoading(false)
                
            } else {
                // L'utilisateur a choisi d'annuler
                console.log('Modification annulée');
                setIsLoading(false)

            }

        } catch (error) {
            console.error('Erreur lors de la gestion de la modification des données:', error);
            setIsLoading(false)

        }
        
    };
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
        translateX.value -= 50;
    }
    const transitionRightToLeft = async () => {
        translateX.value = 0;
    }
    
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: withSpring(translateX.value * 2) }],
    }));

    useEffect(() => {

        const transition = async () => {
            await transitionLeftToRight();
            await new Promise(resolve => setTimeout(resolve, 100));
            await transitionRightToLeft();
        };

        transition();

    }, [isEdit]);
    //
    //
    //
    //
    //
    // ------------------------------------------------------------- //
    // ---------- GESTIONS DE LA MODIFICATION DE LA PHOTO ---------- //
    // ------------------------------------------------------------- //
    const handleImageSelect = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        
        if (!result.canceled) {
            setUserPhotoUrlNew(result.assets[0].uri)
        }
    };
    //
    //
    //
    //
    //
    // ------------------------------------------------------------------------ //
    // ---------- GESTIONS DE LA MODIFICATION DES LIENS SOCIAL MEDIA ---------- //
    // ------------------------------------------------------------------------ //
    const handleAddAccount = (socialMedia) => {

        //ON SET POUR POUVOIR ENSUITE ORIENTER L'URL
        setSocialMedia(socialMedia)

        //AFFICHER UNE BOITE DE DIALOGUE
        setShowAddSocialMedia(true);
       
    };

    const failAddLinkSocialMedia = async () => {

        setSocialMedia("")
        setShowAddSocialMedia(prevState => !prevState)

    }

    const succesAddLinkSocialMedia = (urlSocialMedia) => {

        switch (socialMedia) {

            case "facebook":
                
                setUserAccountFacebookNew(urlSocialMedia);
                break;
            
            case "snapchat":
                
                setUserAccountSnapchatNew(urlSocialMedia);
                break;
            
            case "instagram":
                
                setUserAccountInstagramNew(urlSocialMedia);
                break;

            case "twitter":
                
                setUserAccountTwitterNew(urlSocialMedia);
                break;
                
            case "linkedIn":
                
                setUserAccountLinkedInNew(urlSocialMedia);
                break;
        
            default:

                break;
        }

        setSocialMedia("")
    };

    const handleDeleteAccount = (socialMedia) => {

        Alert.alert(
            "Attention",
            "Etes-vous sure de vouloir supprimer ce compte ?",
            [
                {
                    text: 'Annuler',
                    style: 'cancel',
                    onPress: () => console.log('Cancel Pressed'),
                },
                {
                    text: 'Valider',
                    onPress: () => {deleteAccount(socialMedia)},
                },
            ]
        )
       
    };

    const deleteAccount = (socialMedia) => {

        switch (socialMedia) {

            case "facebook":
                
                setUserAccountFacebookNew("");
                break;
            
            case "snapchat":
                
                setUserAccountSnapchatNew("");
                break;
            
            case "instagram":
                
                setUserAccountInstagramNew("");
                break;

            case "twitter":
                
                setUserAccountTwitterNew("");
                break;
                
            case "linkedIn":
                
                setUserAccountLinkedInNew("");
                break;
        
            default:

                break;
        }
    };
    
    const handleGoAccount = (socialMedia) => {
        switch (socialMedia) {

            case "facebook":
                
                if(userAccountFacebook){
                    Linking.openURL(userAccountFacebook)
                    .catch((error) => {
                        Alert.alert('Erreur', 'Impossible d\'ouvrir le lien');
                        console.error('Erreur lors de l\'ouverture du lien :', error);
                    });
                }
                break;
            
            case "snapchat":
                
                if(userAccountSnapchat){
                    Linking.openURL(userAccountSnapchat)
                    .catch((error) => {
                        Alert.alert('Erreur', 'Impossible d\'ouvrir le lien');
                        console.error('Erreur lors de l\'ouverture du lien :', error);
                    });
                }
                break;
            
            case "instagram":
                
                if(userAccountInstagram){
                    Linking.openURL(userAccountInstagram)
                    .catch((error) => {
                        Alert.alert('Erreur', 'Impossible d\'ouvrir le lien');
                        console.error('Erreur lors de l\'ouverture du lien :', error);
                    });
                }
                break;

            case "twitter":
                
                if(userAccountTwitter){
                    Linking.openURL(userAccountTwitter)
                    .catch((error) => {
                        Alert.alert('Erreur', 'Impossible d\'ouvrir le lien');
                        console.error('Erreur lors de l\'ouverture du lien :', error);
                    });
                }
                break;
                
            case "linkedIn":
                
                if(userAccountLinkedIn){
                    Linking.openURL(userAccountLinkedIn)
                    .catch((error) => {
                        Alert.alert('Erreur', 'Impossible d\'ouvrir le lien');
                        console.error('Erreur lors de l\'ouverture du lien :', error);
                    });
                }
                break;
        
            default:

                break;
        }
    }
    //
    //
    //
    //
    //
    // -------------------------------------- //
    // ---------- AFFICHAGE COMMUN ---------- //
    // -------------------------------------- //
    const headerScreen = () => {

        return (

            <View>

                <ImageBackground
                    source={ 
                        !isEdit ?
                            (userPhotoUrl ? {uri : userPhotoUrl} : require('../../assets/NoData.png'))
                            :
                            {uri : userPhotoUrlNew}
                    } 
                    style={[styles.styleImageBackground, {height:(heightStatusBar*2)*2}]}
                    imageStyle={{ opacity: 0.3 }}
                />
                
                <View style={styles.containerPhoto}>

                    <Pressable onPress={isEdit ? handleImageSelect : null}>

                        {isLoading ? 
                            <View>
                                <ActivityIndicator size="large" color={colors.primary} />
                            </View>
                        :   
                            <Image
                                source={ 
                                    !isEdit ?
                                        (userPhotoUrl ? {uri : userPhotoUrl} : require('../../assets/NoData.png'))
                                        :
                                        (userPhotoUrlNew ? {uri : userPhotoUrlNew} : require('../../assets/NoData.png'))
                                }
                                style={[
                                    styles.styleImage,
                                    {   
                                        marginTop:((heightStatusBar*2)*2-(widthScreen/3/2)),
                                        width:  widthScreen/3,
                                        height : widthScreen/3,
                                    }
                                ]}
                            />
                        }
                    </Pressable>
                    

                    <View style={{flexDirection:'row'}}>

                        {isEdit ? 
                            <TextTitleCustom>{userFirstNameNew} {userLastNameNew}</TextTitleCustom>
                        :
                            <TextTitleCustom>{userFirstName} {userLastName}</TextTitleCustom>
                        }
                        
                    </View>

                </View>

            </View>

        )
    }

    const containerSocialMedia = () => {

        const iconeSizeSocialMedia = 60
        const iconeSizeSocialMediaModification = iconeSizeSocialMedia/3

        const colorFacebook = "#3b5998"
        const colorSnapchat = "#FFFC00"
        const colorInstagram = "#C13584"
        const colorTwitter = "#1DA1F2"
        const colorLinkedIn = "#0077b5"
        
        return (
            <View style={styles.containerSocialMedia}>

                <View>
                    <Ionicons 
                        name="logo-facebook" 
                        size={iconeSizeSocialMedia} 
                        color={userAccountFacebook ? colorFacebook : colors.black} 
                        onPress={() => {handleGoAccount("facebook")}}
                    />

                    {isEdit ? 
                        <View style={styles.iconePosition}>
                            {!userAccountFacebookNew ? 
                                <Ionicons name="add-circle" size={iconeSizeSocialMediaModification} color={colors.success} onPress={() => {handleAddAccount("facebook")}}/> 
                                : 
                                <Ionicons name="close-circle" size={iconeSizeSocialMediaModification} color={colors.warning} onPress={() => {handleDeleteAccount("facebook")}}/>
                            }
                        </View> 
                        : 
                        null
                    } 
                </View>
                
                <View>
                    <Ionicons 
                        name="logo-snapchat"  
                        size={iconeSizeSocialMedia} 
                        color={userAccountSnapchat ? colorSnapchat : colors.black} 
                        onPress={() => {handleGoAccount("snapchat")}}
                    />

                    {isEdit ? 
                        <View style={styles.iconePosition}>
                            {!userAccountSnapchatNew ?
                                <Ionicons name="add-circle" size={iconeSizeSocialMediaModification} color={colors.success} onPress={() => {handleAddAccount("snapchat")}}/> 
                                : 
                                <Ionicons name="close-circle" size={iconeSizeSocialMediaModification} color={colors.warning} onPress={() => {handleDeleteAccount("snapchat")}}/>
                            }
                        </View> 
                        : 
                        null
                    } 
                </View>
                
                <View>
                    <Ionicons 
                        name="logo-instagram" 
                        size={iconeSizeSocialMedia} 
                        color={userAccountInstagram ? colorInstagram : colors.black} 
                        onPress={() => {handleGoAccount("instagram")}}
                    />

                    {isEdit ? 
                        <View style={styles.iconePosition}>
                            {!userAccountInstagramNew ? 
                                <Ionicons name="add-circle" size={iconeSizeSocialMediaModification} color={colors.success} onPress={() => {handleAddAccount("instagram")}}/> 
                                : 
                                <Ionicons name="close-circle" size={iconeSizeSocialMediaModification} color={colors.warning} onPress={() => {handleDeleteAccount("instagram")}}/>
                            }
                        </View> 
                        : 
                        null
                    } 
                </View>
                
                <View>
                    <Ionicons 
                        name="logo-twitter"   
                        size={iconeSizeSocialMedia} 
                        color={userAccountTwitter ? colorTwitter : colors.black} 
                        onPress={() => {handleGoAccount("twitter")}}
                    />

                    {isEdit ? 
                        <View style={styles.iconePosition}>
                            {!userAccountTwitterNew ? 
                                <Ionicons name="add-circle" size={iconeSizeSocialMediaModification} color={colors.success} onPress={() => {handleAddAccount("twitter")}}/> 
                                : 
                                <Ionicons name="close-circle" size={iconeSizeSocialMediaModification} color={colors.warning} onPress={() => {handleDeleteAccount("twitter")}}/>
                            }
                        </View> 
                        : 
                        null
                    } 
                </View>
                
                <View>
                    <Ionicons 
                        name="logo-linkedin"  
                        size={iconeSizeSocialMedia} 
                        color={userAccountLinkedIn ? colorLinkedIn : colors.black} 
                        onPress={() => {handleGoAccount("linkedIn")}}
                    />

                    {isEdit ? 
                        <View style={styles.iconePosition}>
                            {!userAccountLinkedInNew ? 
                                <Ionicons name="add-circle" size={iconeSizeSocialMediaModification} color={colors.success} onPress={() => {handleAddAccount("linkedIn")}}/> 
                                : 
                                <Ionicons name="close-circle" size={iconeSizeSocialMediaModification} color={colors.warning} onPress={() => {handleDeleteAccount("linkedIn")}}/>
                            }
                        </View> 
                        : 
                        null
                    } 
                </View>

            </View>
        )
    }

    useLayoutEffect(() => {

      //Effectuer un re-render lors de la modification des account
      //Sans cela on ne peut pas changer les icones en mode edit
    
      return () => {
        //NETTOYAGE
      }

    }, [userAccountFacebook,userAccountInstagram,userAccountLinkedIn,userAccountSnapchat,userAccountTwitter])
    
    //
    //
    //
    //
    //
    /* ------------------------------------------------- */
    /* ---------- AFFICHAGE MODE MODIFICATION ---------- */
    /* ------------------------------------------------- */
    if(isEdit){

        return (

        <>
            <ScrollView>

                <View style={styles.containerScreen}>

                    {headerScreen()}

                    <View style={styles.containerUserDatas}>

                        {containerSocialMedia()}

                        <View style={styles.containerData}>

                            <View style={styles.autoLRow}>

                                <View style={{flex:1}}>
                                    
                                    <InputText
                                        placeholder="Prénom"
                                        styleContainer={{backgroundColor : colors.white}}
                                        editable={false}
                                    />

                                </View>

                                <Animated.View style={[animatedStyles, {flex:2}]}>

                                    <InputText
                                        onChangeText={text => setUserFirstNameNew(text)}
                                        placeholder="Prénom"
                                        value={userFirstNameNew}
                                        styleContainer={{backgroundColor : colors.input}}
                                    />

                                </Animated.View>

                            </View>

                            <View style={styles.autoLRow}>

                                <View style={{flex:1}}>
                                    
                                    <InputText
                                        placeholder="Nom"
                                        styleContainer={{backgroundColor : colors.white}}
                                        editable={false}
                                    />

                                </View>

                                <Animated.View style={[animatedStyles, {flex:2}]}>

                                    <InputText
                                        onChangeText={text => setUserLastNameNew(text)}
                                        placeholder="Nom"
                                        value={userLastNameNew}
                                        styleContainer={{backgroundColor : colors.input}}
                                    />

                                </Animated.View>

                            </View>

                            <View style={styles.containerButton}>

                                <ButtonCustom
                                    title="ANNULER"
                                    buttonEnabled={true}
                                    colorButton={colors.warning}
                                    stylesLabel={{color:colors.white}}
                                    stylesPressable={{flex:1}}
                                    onPress={() => (setIsEdit(prevState => !prevState))}
                                />   

                                <ButtonCustom
                                    title="VALIDER"
                                    buttonEnabled={true}
                                    colorButton={colors.primary}
                                    stylesLabel={{color:colors.white}}
                                    stylesPressable={{flex:2}}
                                    onPress={() => {handleEditData()}}
                                />      

                            </View>

                        </View>

                    </View>

                </View>

            </ScrollView>

            <AddSocialMediaScreen
                isVisible               = {showAddSocialMedia}
                setShowAddSocialMedia   = {setShowAddSocialMedia}
                onModalCloseFail        = {failAddLinkSocialMedia}
                onModalCloseSucces      = {succesAddLinkSocialMedia}
            />
        
        </>

        )
    /* ----------------------------------------- */
    /* ---------- AFFICHAGE CLASSIQUE ---------- */
    /* ----------------------------------------- */
    }else{
        
        return (

            <View style={styles.containerScreen}>

                {headerScreen()}

                <View style={styles.containerUserDatas}>

                    {containerSocialMedia()}

                    <View style={styles.containerData}>

                        <View style={styles.autoLRow}>  

                            {/* ------------------ */}
                            {/* ----- PRENOM ----- */}
                            {/* ------------------ */}
                            <View style={{flex:1}}>
                                
                                <InputText
                                    placeholder="Prénom"
                                    styleContainer={{backgroundColor : colors.white}}
                                    editable={false}
                                />

                            </View>

                            <Animated.View style={[animatedStyles, {flex:2}]}>

                                <InputText
                                    value={userFirstName}
                                    styleContainer={{backgroundColor : colors.white}}
                                    editable={false}
                                />

                            </Animated.View>

                        </View>

                        <View style={styles.autoLRow}>

                            {/* --------------- */}
                            {/* ----- NOM ----- */}
                            {/* --------------- */}
                            <View style={{flex:1}}>
                                
                                <InputText
                                    placeholder="Nom"
                                    styleContainer={{backgroundColor : colors.white}}
                                    editable={false}
                                />

                            </View>

                            <Animated.View style={[animatedStyles, {flex:2}]}>

                                <InputText
                                    value={userLastName}
                                    styleContainer={{backgroundColor : colors.white}}
                                    editable={false}
                                />

                            </Animated.View>

                        </View>

                        <View style={styles.autoLRow}>

                            {/* ------------------------ */}
                            {/* ----- ADRESSE MAIL ----- */}
                            {/* ------------------------ */}
                            <View style={{flex:1}}>
                                
                                <InputText
                                    placeholder="Mail"
                                    styleContainer={{backgroundColor : colors.white}}
                                    editable={false}
                                />

                            </View>

                            <Animated.View style={[animatedStyles, {flex:2}]}>

                                <InputText
                                    value={userEmail}
                                    styleContainer={{backgroundColor : colors.white}}
                                    editable={false}
                                />

                            </Animated.View>

                        </View>

                    </View>

                </View>

            </View>
        )
    }
    
};
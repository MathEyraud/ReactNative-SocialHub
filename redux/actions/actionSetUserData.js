import * as React from 'react';
import { SET_USER_DATA, SET_USER_NEW_PORFILE } from "../constants";
import { createProfileFirebase, getProfileFirebase, modificationProfileFirebase } from '../../api/firebase/firebaseAuth';
import { storeData } from '../../utils/AsyncStorage/storage';
import ASYNCSTORAGE_USER_DATA from '../../utils/AsyncStorage/userData'
import { Alert } from 'react-native';


export const createProfile = async (userEmail, userIdAuth, userFirstName, userLastName, userPhoto) => {

    return async (dispatch) => {

        try {
            await createProfileFirebase(userEmail,userIdAuth,userFirstName,userLastName,userPhoto,);

            dispatch(actionSetUserData(userEmail, userFirstName, userLastName, userPhoto))

            saveUserDateAsyncStorage(
                {
                    userFirstName   : userFirstName,
                    userLastName    : userLastName,
                    userPhoto       : userPhoto,
                }
            )
            
        } catch (error) {
            Alert.alert("Erreur", error)
        }
        
    }
};
//
//
//
//
//
export const modificationProfile = async (
    userId,
    {
        userFirstName,
        userLastName,
        userPhoto,
        userAccountFacebook,
        userAccountSnapchat,
        userAccountInstagram,
        userAccountTwitter,
        userAccountLinkedIn,
        } = {}
    ) => {

    console.log(" ----- modificationProfile ----- ",);

    return async (dispatch) => {

        console.log("userAccountTwitter",userAccountTwitter);

        try {
            await modificationProfileFirebase(
                userId, 
                {
                    userFirstName           : userFirstName,
                    userLastName            : userLastName,
                    userPhoto               : userPhoto,
                    userAccountFacebook     : userAccountFacebook,
                    userAccountSnapchat     : userAccountSnapchat,
                    userAccountInstagram    : userAccountInstagram,
                    userAccountTwitter      : userAccountTwitter,
                    userAccountLinkedIn     : userAccountLinkedIn,
                }
            );

            dispatch(actionSetUserNewProfile(userFirstName, userLastName, userPhoto))

            saveUserDateAsyncStorage(
                {
                    userFirstName           : userFirstName,
                    userLastName            : userLastName,
                    userPhoto               : userPhoto,
                    userAccountFacebook     : userAccountFacebook,
                    userAccountSnapchat     : userAccountSnapchat,
                    userAccountInstagram    : userAccountInstagram,
                    userAccountTwitter      : userAccountTwitter,
                    userAccountLinkedIn     : userAccountLinkedIn,
                }
            )
            
        } catch (error) {
            Alert.alert("Erreur", error)
        }
        
    }
};
//
//
//
//
//
export const checkProfile = async (userId) => {

    return async (dispatch) => {

        let responseProfile = null

        // ---- VERIFICATION D'UN PROFIL EXISTANT ---- //
        try {
            responseProfile = await getProfileFirebase(userId);   //console.log("responseProfile",responseProfile);
            if(!responseProfile){
                throw new Error("NoProfile")
            }

        } catch (error) {
            throw error;
        }

        const userFirstName = responseProfile.firstName.stringValue;
        const userLastName  = responseProfile.lastName.stringValue;
        const userUrlPhoto  = responseProfile.urlPhoto.stringValue;

        // ----- REDUX DISPATCH ----- //
        dispatch(actionSetUserData  (userFirstName, userLastName, userUrlPhoto));


        // ------- SAVE DATA ASYNCSTORAGE-------- // 
        await saveUserDataProfileAsyncStorage(userFirstName, userLastName, userUrlPhoto)  
        
    }
};
//
//
//
//
//
export const actionSetUserData = (userEmail, userFirstName, userLastName, userPhoto) => {
        
    return {
        
        type : SET_USER_DATA,

        userEmail       : userEmail,
        userFirstName   : userFirstName,
        userLastName    : userLastName,
        userPhoto       : userPhoto,
        
    }
};


export const actionSetUserNewProfile = (userFirstName, userLastName, userPhoto) => {
        
    return {
        
        type : SET_USER_NEW_PORFILE,

        userFirstName   : userFirstName,
        userLastName    : userLastName,
        userPhoto       : userPhoto,
        
    }
};
//
//
//
//
//
// --------------------------------------------- //
// ----------- STOCKAGE ASYNCSTORAGE ----------- //
// -------------------------------------------- //
const saveUserDateAsyncStorage = async (
    {
        userFirstName,
        userLastName,
        userPhoto,
        userAccountFacebook,
        userAccountSnapchat,
        userAccountInstagram,
        userAccountTwitter,
        userAccountLinkedIn,
    } = {}
    ) => {
        
        //ENREGISTREMENT DES DONNEES DANS ASYNCSTORAGE
        if (userFirstName   ) {await storeData(ASYNCSTORAGE_USER_DATA.FIRST_NAME   ,userFirstName  )}
        if (userLastName    ) {await storeData(ASYNCSTORAGE_USER_DATA.LAST_NAME    ,userLastName   )}
        if (userPhoto       ) {await storeData(ASYNCSTORAGE_USER_DATA.PROFILE_PHOTO,userPhoto      )}

        if (userAccountFacebook ) {await storeData(ASYNCSTORAGE_USER_DATA.URL_PROFILE_ACCOUNT_FACEBOOK  ,userAccountFacebook    )}
        if (userAccountSnapchat ) {await storeData(ASYNCSTORAGE_USER_DATA.URL_PROFILE_ACCOUNT_SNAPCHAT  ,userAccountSnapchat    )}
        if (userAccountInstagram) {await storeData(ASYNCSTORAGE_USER_DATA.URL_PROFILE_ACCOUNT_INSTAGRAM ,userAccountInstagram   )}
        if (userAccountTwitter  ) {await storeData(ASYNCSTORAGE_USER_DATA.URL_PROFILE_ACCOUNT_TWITTER   ,userAccountTwitter     )}
        if (userAccountLinkedIn ) {await storeData(ASYNCSTORAGE_USER_DATA.URL_PROFILE_ACCOUNT_LINKEDIN  ,userAccountLinkedIn    )}

    
    
    
}
//
//
//
//
//
const saveUserDataProfileAsyncStorage = async (userFirstName, userLastName, userUrlPhoto) => {

    //ENREGISTREMENT DES DONNEES DANS ASYNCSTORAGE
    await storeData(ASYNCSTORAGE_USER_DATA.FIRST_NAME   ,userFirstName  )
    await storeData(ASYNCSTORAGE_USER_DATA.LAST_NAME    ,userLastName   )
    await storeData(ASYNCSTORAGE_USER_DATA.PROFILE_PHOTO,userUrlPhoto   )
}
import * as React from 'react';

import { AUTH_USER, LOGOUT_USER }           from "../constants";
import { getProfileFirebase, loginFirebase, registerFirebase }  from '../../api/firebase/firebaseAuth';

import { storeData }            from '../../utils/AsyncStorage/storage';
import ASYNCSTORAGE_USER_DATA   from '../../utils/AsyncStorage/userData'
import { actionSetUserData }    from './actionSetUserData';

// --------------------------------- //
// ---------- INSCRIPTION ---------- //
// --------------------------------- //
export const actionSignup = async (userEmail, passwordUser) => {
        
    return async (dispatch) => {
        
        // ----- DATA SEND ----- // 
        let response = null

        try {
            response = await registerFirebase(userEmail, passwordUser);

        } catch (error) {
            throw error;
        }
                

        // ----- REDUX DISPATCH ----- // 
        dispatch(actionAuthUser(response.localId, response.idToken))


        // ------- SAVE DATA -------- // 
        //TRANSFORMATION DU TEMPS RESTANT DU TOKEN
        const timeExpireTokenMilisec    = parseInt(response.expiresIn)*1000;
        const timeExpireTokenDate       = new Date().getTime() + timeExpireTokenMilisec;
        const dateTokenExpire           = new Date(timeExpireTokenDate).toISOString();

        //ENREGISTREMENT DES DONNEES DANS ASYNCSTORAGE
        await saveUserDataAuthAsyncStorage(userEmail,response.idToken, response.localId, dateTokenExpire )
    }
};
//
//
//
//
//
// --------------------------------- //
// ----------- CONNEXION ----------- //
// --------------------------------- //
export const actionLogin = async (userEmail, userPassword) => {

    return async (dispatch) => {
     
        let responseAuth = null

        // ---- VERIFICATION D'UN COMPTE EXISTANT ---- //
        try {
            responseAuth = await loginFirebase(userEmail, userPassword);        //console.log("responseAuth",responseAuth);

        } catch (error) {
            throw error;
        }

        // ----- CREATION DES VARIABLES ----- //
        const userIdAuth    = responseAuth.localId;
        const userTokenAuth = responseAuth.idToken;

        //TRANSFORMATION DU TEMPS RESTANT DU TOKEN
        const timeExpireTokenMilisec    = parseInt(responseAuth.expiresIn)*1000;
        const timeExpireTokenDate       = new Date().getTime() + timeExpireTokenMilisec;
        const dateTokenExpire           = new Date(timeExpireTokenDate).toISOString();

        // ----- REDUX DISPATCH ----- //
        dispatch(actionAuthUser(userIdAuth, userTokenAuth));

        // ------- SAVE DATA ASYNCSTORAGE-------- // 
        await saveUserDataAuthAsyncStorage(userEmail,userTokenAuth, userIdAuth, dateTokenExpire)
    }
};
//
//
//
//
//
// ----------------------------------- //
// ----------- DECONNEXION ----------- //
// ----------------------------------- //
export const actionLogout = async () => {

    return {
        type : LOGOUT_USER
    }
}
//
//
//
//
//
// 
// -------------------------------------- //
// ----------- STOCKAGE REDUX ----------- //
// ------------------------------------- //
const actionAuthUser = (userIdAuth, userTokenAuth) => {

    return {
        type            : AUTH_USER,
        userIdAuth      : userIdAuth,
        userTokenAuth   : userTokenAuth,
    }
}
//
//
//
//
//
// --------------------------------------------- //
// ----------- STOCKAGE ASYNCSTORAGE ----------- //
// -------------------------------------------- //
const saveUserDataAuthAsyncStorage = async (userEmail,userIdAuth, userToken,userTokenDate ) => {

    //ENREGISTREMENT DES DONNEES DANS ASYNCSTORAGE
    await storeData(ASYNCSTORAGE_USER_DATA.EMAIL                ,userEmail      )
    await storeData(ASYNCSTORAGE_USER_DATA.FIREBASE_TOKEN       ,userIdAuth     )
    await storeData(ASYNCSTORAGE_USER_DATA.FIREBASE_USER_ID     ,userToken      )
    await storeData(ASYNCSTORAGE_USER_DATA.FIREBASE_TOKEN_DATE  ,userTokenDate  )
}

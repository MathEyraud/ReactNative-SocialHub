import * as React from 'react';
import { AUTH_USER, LOGOUT_USER } from "../constants";
import { loginFirebase, registerFirebase } from '../../api/firebase/firebaseAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeData } from '../../utils/AsyncStorage/storage';
import ASYNCSTORAGE_USER_DATA from '../../utils/AsyncStorage/userData'

// --------------------------------- //
// ---------- INSCRIPTION ---------- //
// --------------------------------- //
export const actionSignup = async (emailUser, passwordUser) => {
        
    return async (dispatch) => {
        
        // --------------------- //
        // ----- DATA SEND ----- // 
        // --------------------- //
        let response = null

        try {
            response = await registerFirebase(emailUser, passwordUser);

        } catch (error) {
            throw error;
        }
                
        // -------------------------- //
        // ----- REDUX DISPATCH ----- // 
        // -------------------------- //
        dispatch(actionAuthUser(response.localId, response.idToken))

        // -------------------------- //
        // ------- SAVE DATA -------- // 
        // -------------------------- //
        const timeExpireTokenMilisec = parseInt(response.expiresIn)*1000;
        const timeExpireTokenDate = new Date().getTime() + timeExpireTokenMilisec;
        const dateTokenExpire = new Date(timeExpireTokenDate).toISOString();

        saveUserDataFirebase(
            response.localId, 
            response.idToken,
            dateTokenExpire,
        )
        
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
export const actionLogin = async (emailUser, passwordUser) => {

    return async (dispatch) => {

        // --------------------- //
        // ----- DATA SEND ----- // 
        // --------------------- //
        let response = null

        try {
            response = await loginFirebase(emailUser, passwordUser);

        } catch (error) {
            throw error;
        }

        // -------------------------- //
        // ----- REDUX DISPATCH ----- // 
        // -------------------------- //
        dispatch(actionAuthUser(response.localId, response.idToken));

        // -------------------------- //
        // ------- SAVE DATA -------- // 
        // -------------------------- //
        const timeExpireTokenMilisec = parseInt(response.expiresIn)*1000;
        const timeExpireTokenDate = new Date().getTime() + timeExpireTokenMilisec;
        const dateTokenExpire = new Date(timeExpireTokenDate).toISOString();

        saveUserDataFirebase(
            response.localId, 
            response.idToken,
            dateTokenExpire,
        )
        
    }
};
//
//
//
//
//
const actionAuthUser = (userId, token) => {

    return {
        type    : AUTH_USER,
        userId  : userId,
        token   : token,
    }
}
//
//
//
//
//
const saveUserDataFirebase = async (token, userId, dateTokenExpire) => {
    
    await storeData(ASYNCSTORAGE_USER_DATA.FIREBASE_TOKEN       ,token          )
    await storeData(ASYNCSTORAGE_USER_DATA.FIREBASE_USER_ID     ,userId         )
    await storeData(ASYNCSTORAGE_USER_DATA.FIREBASE_TOKEN_DATE  ,dateTokenExpire)
}
//
//
//
//
//
export const actionLogout = () => {

    return {
        type : LOGOUT_USER
    }
}
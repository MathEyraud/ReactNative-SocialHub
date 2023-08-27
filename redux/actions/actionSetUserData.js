import * as React from 'react';
import { SET_USER_DATA } from "../constants";
import { sendUserPersonnalData } from '../../api/firebase/firebaseAuth';
import { storeData } from '../../utils/AsyncStorage/storage';
import ASYNCSTORAGE_USER_DATA from '../../utils/AsyncStorage/userData'
import { Alert } from 'react-native';


export const setUserData = async (userFirstName, userLastName, userPhoto) => {

    return async (dispatch) => {

        try {
            const response = await sendUserPersonnalData(
                userFirstName, 
                userLastName,
                userPhoto,
            );

            const userId = response.name    

            dispatch(actionSetUserData(userId, userFirstName, userLastName, userPhoto))

            await storeData(ASYNCSTORAGE_USER_DATA.FIRST_NAME,userFirstName)
            await storeData(ASYNCSTORAGE_USER_DATA.LAST_NAME,userLastName)
            await storeData(ASYNCSTORAGE_USER_DATA.PROFILE_PHOTO,userPhoto)

        } catch (error) {
            Alert.alert("Erreur", error)
        }
        
    }
};

export const actionSetUserData = (userId, userFirstName, userlastName, userPhoto) => {
        
    return {
        
        type : SET_USER_DATA,

        userId          : userId,
        userFirstName   : userFirstName,
        userLastName    : userlastName,
        userPhoto       : userPhoto,
        
    }
};

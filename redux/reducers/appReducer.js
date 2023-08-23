import USERS_DATA from "../../data/usersData"
import { createSlice } from "@reduxjs/toolkit"
import { SET_FAVORITE_USER, SET_FIELDS_SETTINGS } from "../constants"

const initialState = {
    users: USERS_DATA,
    favoriteUsers:[],
    selectedFieldsSettings:USERS_DATA,
}

export default userReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case SET_FAVORITE_USER:

            const selectedUser = state.favoriteUsers.findIndex( user => user.id === action.userId);

            //Si déja en favori on enlève l'utilisateur
            if(selectedUser >= 0){
                const newSelectedUsers = [...state.favoriteUsers];  //On fait une copie du state
                newSelectedUsers.splice(selectedUser,1)               //On enlève l'utilisateur de la copie     
                return {...state, favoriteUsers : newSelectedUsers}
            
            //sinon 
            }else{
                const user = state.users.find(user => user.id === action.userId);
                return {...state, favoriteUsers : state.favoriteUsers.concat(user)}
            }

        case SET_FIELDS_SETTINGS:

            const selectedFieldsSettings = action.settings;

            const selectedUsersByFields = state.users.filter(user => {

                if(selectedFieldsSettings.electronique && user.field ===  'Electronique'){
                    return true
                }
                if(selectedFieldsSettings.IA && user.field ===  'IA'){
                    return true
                }
                if(selectedFieldsSettings.informatique && user.field ===  'Informatique'){
                    return true
                }
                if(selectedFieldsSettings.telecommunication && user.field ===  'Telecommunication'){
                    return true
                }
                if(selectedFieldsSettings.civil && user.field ===  'Civil'){
                    return true
                }
                if(selectedFieldsSettings.mecanique && user.field ===  'Mecanique'){
                    return true
                }

            })

            return {...state, selectedFieldsSettings : selectedUsersByFields}
        
        default:
            return state
    }
} 
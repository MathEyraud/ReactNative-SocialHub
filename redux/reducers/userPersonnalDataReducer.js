import { AUTH_USER, LOGOUT_USER, SET_USER_DATA } from "../constants"

const initialState = {
    token           : null,
    userId          : null,
    userFirstName   : null,
    userLastName    : null,
    userPhoto       : null,
}

export default userPersonnalDataReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case AUTH_USER:

            return {
                token           : action.token,
                userId          : action.userId,
            }

        case SET_USER_DATA :

            return {
                userId          : action.userId,
                userFirstName   : action.userFirstName,
                userLastName    : action.userLastName,
                userPhoto       : action.userPhoto,
            }
        
        case LOGOUT_USER:

            return initialState;
        
        default:
            
            return state
    }
} 
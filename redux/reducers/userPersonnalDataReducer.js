import { AUTH_USER, LOGOUT_USER, SET_USER_DATA, SET_USER_NEW_PORFILE } from "../constants"

const initialState = {
    userTokenAuth   : null,
    userIdAuth      : null,

    userEmail       : null,
    userFirstName   : null,
    userLastName    : null,
    userPhoto       : null,
}

export default userPersonnalDataReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case AUTH_USER:

            return {
                userTokenAuth   : action.userTokenAuth,
                userIdAuth      : action.userIdAuth,
            }

        case SET_USER_DATA :

            return {
                userEmail       : action.userEmail,
                userFirstName   : action.userFirstName,
                userLastName    : action.userLastName,
                userPhoto       : action.userPhoto,
            }

        case SET_USER_NEW_PORFILE :

            return {
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
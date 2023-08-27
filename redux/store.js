import { configureStore } from '@reduxjs/toolkit'

import usersReducer             from './reducers/appReducer'
import userPersonnalDataReducer from './reducers/userPersonnalDataReducer'

export default store = configureStore({

    reducer: {
        users               : usersReducer,
        userPersonnalData   : userPersonnalDataReducer,
    }, 

})
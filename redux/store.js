import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/appReducer'

export default store = configureStore({

    reducer: {
        users : userReducer,
    }
    
})
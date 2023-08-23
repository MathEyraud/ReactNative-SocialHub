import { SET_FIELDS_SETTINGS } from "../constants";

export const setFieldsSettings = (savedSettings) => {
    
    return {
        type : SET_FIELDS_SETTINGS,
        settings : savedSettings,
    }
}
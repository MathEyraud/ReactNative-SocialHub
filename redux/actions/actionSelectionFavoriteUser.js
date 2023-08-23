import { SET_FAVORITE_USER } from "../constants";

export const setFavoriteUser = (id) => {
    return {
        type : SET_FAVORITE_USER,
        userId : id,
    }
}
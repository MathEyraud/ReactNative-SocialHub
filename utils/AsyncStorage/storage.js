import AsyncStorage from '@react-native-async-storage/async-storage';
import ASYNCSTORAGE_USER_DATA from './userData'
//
//
//
//
//
// ------------------------------ //
// ----- STOCKER UNE DONNEE ----- //
// ------------------------------ //
export const storeData = async (key, value) => {

  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));

  } catch (error) {
    console.error('Error storing data:', error);
  }
};
//
//
//
//
//
// -------------------------------- //
// ----- RECUPERER UNE DONNEE ----- //
// -------------------------------- //
export const getData = async (key) => {

  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
        return JSON.parse(value);
    }

  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};
//
//
//
//
//
// -------------------------------- //
// ----- SUPPRIMER UNE DONNEE ----- //
// -------------------------------- //
export const removeData = async (key) => {

  try {
    await AsyncStorage.removeItem(key);

  } catch (error) {
    console.error('Error removing data:', error);
  }
};
//
//
//
//
//
// ----------------------- //
// ----- DECONNEXION ----- //
// ----------------------- //
export const removeAllUserData = async () => {

  try {
    await AsyncStorage.removeItem(ASYNCSTORAGE_USER_DATA.FIRST_NAME         );
    await AsyncStorage.removeItem(ASYNCSTORAGE_USER_DATA.LAST_NAME          );
    await AsyncStorage.removeItem(ASYNCSTORAGE_USER_DATA.PROFILE_PHOTO      );
    await AsyncStorage.removeItem(ASYNCSTORAGE_USER_DATA.EMAIL              );

    await AsyncStorage.removeItem(ASYNCSTORAGE_USER_DATA.FIREBASE_TOKEN     );
    await AsyncStorage.removeItem(ASYNCSTORAGE_USER_DATA.FIREBASE_USER_ID   );
    await AsyncStorage.removeItem(ASYNCSTORAGE_USER_DATA.FIREBASE_TOKEN_DATE);

  } catch(error) {
    console.error('Error removing data:', error);
  }

  console.log('Done.')
};
//
//
//
//
//
// -------------------------------------- //
// ----- EFFACER TOUTES LES DONNEES ----- //
// -------------------------------------- //
export const removeAllData = async () => {

  try {
    await AsyncStorage.clear()

  } catch(error) {
    console.error('Error removing data:', error);
  }

  console.log('Done.')
};
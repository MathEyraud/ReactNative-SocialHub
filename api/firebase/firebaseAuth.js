import { deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"; 
import ASYNCSTORAGE_USER_DATA from '../../utils/AsyncStorage/userData'
import { db } from "./firebaseConfig";


// ------------------------------------------------ //
//                      CONSTANTES                  //
// ------------------------------------------------ //
const APIKEYFIREBASE  = "AIzaSyAxGOFNiJcJHQx1jCCCA8V2go9u66Wwulw"
const projectID       = "professional-portfolio-fcc10"
//
//
//
//
//
// ------------------------------------------------ //
//                 CREATION DE COMPTE               //
// ------------------------------------------------ //
// Fonction d'inscription
export const registerFirebase = async (email, password) => {

  const urlApiFirebase = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + APIKEYFIREBASE

  const response = await fetch(urlApiFirebase, 
  {
    method : 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
      returnSecureToken:true,
    })
  })

  if (response.ok) {
    const responseData = await response.json();         //console.log('Réponse réussie :', responseData);
    return responseData

  } else {
    const responseError = await response.json();        //console.log("responseError :",responseError);
    const errorMessage = responseError.error.message;   //console.log("errorMessage :",errorMessage);

    let customMessage = "Il y a eu un problème lors de votre inscription !";

    if( errorMessage === 'EMAIL_EXISTS'){
      customMessage = "L'adresse mail est déjà utilisée par un autre compte !"

    }else if (errorMessage === 'OPERATION_NOT_ALLOWED') {
      customMessage = "La connexion par mot de passe est désactivée."
      
    }else if (errorMessage === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
      customMessage = "Nous avons bloqué toutes les demandes provenant de cet appareil en raison d'une activité inhabituelle. Réessayez plus tard."         
    
    }else if (errorMessage === 'INVALID_EMAIL') {
      customMessage = "Merci de renseigner une adresse mail valide !"     

    }else if (errorMessage === 'WEAK_PASSWORD') {
      customMessage = "Merci de renseigner un mot de passe avec au moins 6 caractères !"         
    }
    
    throw new Error(customMessage)
  }
};
//
//
//
//
//
// ------------------------------------------------- //
//                 CONNEXION AU COMPTE               //
// ------------------------------------------------- //
// Fonction d'inscription
export const loginFirebase = async (email, password) => {

  const urlApiFirebase = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + APIKEYFIREBASE

  const response = await fetch(urlApiFirebase, 
    {
      method : 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken:true,
      })
    })
  
    if (response.ok) {
      const responseData = await response.json();         //console.log('Réponse réussie :', responseData);
      return responseData
  
    } else {
      const responseError = await response.json();        //console.log("responseError :",responseError);
      const errorMessage = responseError.error.message;   //console.log("errorMessage :",errorMessage);

      let customMessage = "Il y a eu un problème lors de votre connexion !";

      if( errorMessage === 'EMAIL_NOT_FOUND'){
        customMessage = "Il n'y a pas d'enregistrement d'utilisateur correspondant à cet identifiant. L'utilisateur peut avoir été supprimé."

      }else if (errorMessage === 'INVALID_PASSWORD') {
        customMessage = "Le mot de passe est invalide ou l'utilisateur n'a pas de mot de passe."
        
      }else if (errorMessage === 'USER_DISABLED') {
        customMessage = "Le compte utilisateur a été désactivé par un administrateur."
        
      } else if (errorMessage === 'INVALID_EMAIL') {
        customMessage = "Merci de renseigner une adresse mail valide !"     

      } //console.log("customMessage :",customMessage);
      console.log("errorMessage",errorMessage);
      
      throw new Error(customMessage)
    }
};
//
//
//
//
//
// ------------------------------------------------- //
//                 CREATION DE PROFIL                //
// ------------------------------------------------- //
// ENVOI DES DONNEES DANS FIRESTORE
export const createProfileFirebase = async (userEmail, userId, userFirstName, userLastName, userProfileImage) => {
  
  try {

    await setDoc(doc(db, "users", userId), {
      [ASYNCSTORAGE_USER_DATA.EMAIL         ] : { stringValue: userEmail        },
      [ASYNCSTORAGE_USER_DATA.FIRST_NAME    ] : { stringValue: userFirstName    },
      [ASYNCSTORAGE_USER_DATA.LAST_NAME     ] : { stringValue: userLastName     },
      [ASYNCSTORAGE_USER_DATA.PROFILE_PHOTO ] : { stringValue: userProfileImage },
    });

    console.log("Création de profil : OK");

  } catch (error) {

    console.error("Erreur lors de la création de votre profil:", error);
    throw error;
  }

};
//
//
//
//
//
// ------------------------------------------------- //
//                    MAJ DE PROFIL                  //
// ------------------------------------------------- //
// ENVOI DES DONNEES DANS FIRESTORE
export const modificationProfileFirebase = async (
  userId,
  {
    userFirstName,
    userLastName,
    userPhoto,
    userAccountFacebook,
    userAccountSnapchat,
    userAccountInstagram,
    userAccountTwitter,
    userAccountLinkedIn,
  } = {}
  ) => {

  try {

    // Créer un objet pour stocker les données à mettre à jour
    const updateData = {}; 

    // Vérifier chaque donnée et l'ajouter à l'objet si elle est présente
    if (userFirstName) {
      updateData[ASYNCSTORAGE_USER_DATA.FIRST_NAME] = { stringValue: userFirstName };
    }

    if (userLastName) {
      updateData[ASYNCSTORAGE_USER_DATA.LAST_NAME] = { stringValue: userLastName };
    }
    
    if (userPhoto) {
      updateData[ASYNCSTORAGE_USER_DATA.PROFILE_PHOTO] = { stringValue: userPhoto };
    }

    if (userAccountFacebook) {
      updateData[ASYNCSTORAGE_USER_DATA.URL_PROFILE_ACCOUNT_FACEBOOK ] = { stringValue: userAccountFacebook };
    }

    if (userAccountSnapchat) {
      updateData[ASYNCSTORAGE_USER_DATA.URL_PROFILE_ACCOUNT_SNAPCHAT ] = { stringValue: userAccountSnapchat };
    }

    if (userAccountInstagram) {
      updateData[ASYNCSTORAGE_USER_DATA.URL_PROFILE_ACCOUNT_INSTAGRAM] = { stringValue: userAccountInstagram };
    }

    if (userAccountTwitter) {
      updateData[ASYNCSTORAGE_USER_DATA.URL_PROFILE_ACCOUNT_TWITTER  ] = { stringValue: userAccountTwitter };
    }
    
    if (userAccountLinkedIn) {
      updateData[ASYNCSTORAGE_USER_DATA.URL_PROFILE_ACCOUNT_LINKEDIN ] = { stringValue: userAccountLinkedIn };
    }

    // Vérifier si des données doivent être mises à jour
    if (Object.keys(updateData).length === 0) {
      console.error("Erreur lors de la modification de votre profil:", error);
      throw error;
    }

    // Effectuer la mise à jour seulement si des données doivent être mises à jour
    await updateDoc(doc(db, "users", userId), updateData);

    console.log("Modification de profil : OK");

  } catch (error) {

    console.error("Erreur lors de la modification de votre profil:", error);
    throw error;
  }

};
//
//
//
//
//
// ------------------------------------------------- //
//               SUPPRESSION DE PROFIL               //
// ------------------------------------------------- //
// ENVOI DES DONNEES DANS FIRESTORE
export const deleteProfileFirebase = async (userId) => {
  
  try {

    await deleteDoc(doc(db, "users", userId));

    console.log("Suppression du profil : OK");

  } catch (error) {

    console.error("Erreur lors de la suppression de votre profil:", error);
    throw error;
  }

};
//
//
//
//
//
// ------------------------------------------------- //
//                 LECTURE DU PROFIL                 //
// ------------------------------------------------- //
// ENVOI DES DONNEES DANS FIRESTORE
export const getProfileFirebase = async (userId) => {

  console.log(" ----- getProfileFirebase ----- ",);
  
  try {
    const docRef = doc(db, "users", userId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data();      

    } else {
      console.log("No such document!");
    }
    
  } catch (error) {
    console.error("Error getting profile:", error);
    throw error;
  }

};
//
//
//
//
//
// ----------------------------------------------------*-------- //
//                 RECUPERATION DES DATA FIREBASE                //
// ------------------------------------------------------------- //
// Fonction d'inscription
export const getUserDataFromFirebase = async (userId) => {

  const urlApiFirebase = `https://professional-portfolio-fcc10-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`;

  const response = await fetch(urlApiFirebase); //console.log("response",response);
  const userData = await response.json();       //console.log("userData",userData);

  if( userData[ASYNCSTORAGE_USER_DATA.FIRST_NAME] !== (null || undefined) &&
      userData[ASYNCSTORAGE_USER_DATA.LAST_NAME] !== (null || undefined) ){
    await storeData(ASYNCSTORAGE_USER_DATA.FIRST_NAME   ,userData[ASYNCSTORAGE_USER_DATA.FIRST_NAME   ])
    await storeData(ASYNCSTORAGE_USER_DATA.LAST_NAME    ,userData[ASYNCSTORAGE_USER_DATA.LAST_NAME    ])
    await storeData(ASYNCSTORAGE_USER_DATA.PROFILE_PHOTO,userData[ASYNCSTORAGE_USER_DATA.PROFILE_PHOTO])  

  }else{
    return false
  }

  
};
//
//
//
//
//
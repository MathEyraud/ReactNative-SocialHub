// ------------------------------------------------ //
//                      CONSTANTES                  //
// ------------------------------------------------ //
const APIKEYFIREBASE = "AIzaSyAxGOFNiJcJHQx1jCCCA8V2go9u66Wwulw"
import ASYNCSTORAGE_USER_DATA from '../../utils/AsyncStorage/userData'
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
        
      } //console.log("customMessage :",customMessage);
      
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
// Fonction d'inscription
export const sendUserPersonnalData = async (userFirstName, userLastName, userProfileImage) => {

  const urlApiFirebase = "https://professional-portfolio-fcc10-default-rtdb.europe-west1.firebasedatabase.app/users.json"

  const response = await fetch(urlApiFirebase, 
    {
      method : 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        [ASYNCSTORAGE_USER_DATA.FIRST_NAME]     : userFirstName,
        [ASYNCSTORAGE_USER_DATA.LAST_NAME]      : userLastName,
        [ASYNCSTORAGE_USER_DATA.PROFILE_PHOTO]  : userProfileImage,
      })
    })
  
    if (response.ok) {
      const responseData = await response.json();         //console.log('Réponse réussie :', responseData);
      return responseData
  
    } else {
      const responseError = await response.json();        //console.log("responseError :",responseError);
      const errorMessage = responseError.error.message;   //console.log("errorMessage :",errorMessage);
      
      throw new Error(errorMessage)
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
export const getUserData = async (userId) => {

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
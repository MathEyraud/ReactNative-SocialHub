import { CardStyleInterpolators } from '@react-navigation/stack';

const ModalAnimation = {

    presentation: 'modal',
    //presentation: 'transparentModal',
    
    gestureEnabled: false,
    gestureDirection: 'vertical',

    transitionSpec: {

        open: {
            animation: 'timing',
            config: {
                duration: 500,
            },
        },

        close: {
            animation: 'timing',
            config: {
                duration: 500,
            },
        },
    },
    
    cardStyle: {
        backgroundColor: 'red',
        width: '80%',
    },
        
    // Crée un effet de contraste pour séparer les deux écrans
    cardOverlayEnabled: true,

    //Effet qui permet d'avoir l'écran superposant le précédent
    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS
};

export default ModalAnimation
  
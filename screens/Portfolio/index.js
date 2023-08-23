import { View, Image, ScrollView, Alert } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect } from 'react'

import { setFavoriteUser } from '../../redux/actions/actionSelectionFavoriteUser'
import { useDispatch, useSelector } from 'react-redux'

import { styles } from './style'
import fonts from '../../theme/fonts';
import { getContrastColor } from '../../utils/contrast';

import TouchableImage   from '../../components/TouchableImage';
import TextCustom       from '../../components/Text/TextCustom';
import TextTitleCustom  from '../../components/Text/TextTitleCustom';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ButtonHeaderCustom from '../../components/ButtonHeaderCustom';

export default function PortfolioScreen({route, navigation}) {

    // ---------------------------------------------- //
    // ---------- RECUPERATION DES DONNEES ---------- //
    // ---------------------------------------------- //
    const data              = route.params;

    const userId            = data.id
    const firstName         = data.firstName      
    const lastName          = data.lastName      
    const description       = data.description      
    const country           = data.country   
    const job               = data.job     
    const fieldJob          = data.field  
    const favColor          = data.favColor  
    const urlProfileImage   = data.urlProfileImage

    const projets            = data.projets

    // -------------------------------- //
    // ---------- NAVIGATION ---------- //
    // -------------------------------- //
    const onPressPhoto= (photo) => {
        navigation.navigate('Photo', {photo, colorTextHeader, favColor})
    }
    //
    //
    //
    //
    //
    // --------------------------------------------------- //
    // ---------- GESTION DE L'AJOUT EN FAVORIS ---------- //
    // --------------------------------------------------- //
    //Vérifier si l'utilisateur est déjà en favori (ou pas) 
    const actualUserIsFavorite = useSelector(
        state => state.users.favoriteUsers.some(user => user.id === userId)
    );  
    
    const dispatch = useDispatch();

    //Gestion de l'appuie sur le coeur (Ajout favori)
    const handleDispatch = useCallback(() => {

        console.log("---- actualUserIsFavorite",actualUserIsFavorite);

        //Fonction qui va chercher la bonne action du reducer
        dispatch(setFavoriteUser(userId))

        if(actualUserIsFavorite === false){
            Alert.alert(
                "Utilisateur enregistré",
                "L'utilisateur est disponible dans vos favoris !",
                [{text : "OK"}]
            )

        }else{
            Alert.alert(
                "Utilisateur supprimé",
                "L'utilisateur n'est plus dans vos favoris !",
                [{text : "OK"}]
            )
        }
        

    },[actualUserIsFavorite])

    
    //
    //
    //
    //
    // -------------------------------------------- //
    // ---------- MODIFICATION DU HEADER ---------- //
    // -------------------------------------------- //
    const colorTextHeader = getContrastColor(favColor)

    useLayoutEffect(() => {

        navigation.setOptions({

            headerTitle: 'Portfolio de ' + firstName,
            headerTitleStyle: {
                color: colorTextHeader,
                fontFamily:fonts.PrimaryBold,
                fontSize: 25, 
            },
            headerStyle : {
                backgroundColor : favColor
            },
            headerTintColor: colorTextHeader,
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={ButtonHeaderCustom}>
                    <Item
                        title="like" 
                        iconName={actualUserIsFavorite ? "heart" : "heart-outline"} 
                        iconSize={30}
                        onPress={handleDispatch} 
                        color={colorTextHeader}
                    />
                </HeaderButtons>
            ),
        });

    }, [actualUserIsFavorite]);
    //
    //
    //
    //
    //
    // ------------------------------- //
    // ---------- AFFICHAGE ---------- //
    // ------------------------------- //
    return (

        <ScrollView style={styles.containerScreen}>

            <View style={[styles.containerPhoto, {backgroundColor:favColor}]}>

                <Image 
                    source={{uri : urlProfileImage}} 
                    style={[styles.styleImage, {borderColor:colorTextHeader}]}
                />

                <TextCustom style={{color:colorTextHeader}}>{job} - {fieldJob}</TextCustom>

            </View>

            <View style={styles.containerBio}>
                <TextTitleCustom>Bio :</TextTitleCustom>
                <TextCustom>{description}</TextCustom>
            </View>

            <View>
                { 
                    projets.map(projets=> (
                        <TouchableImage
                            key={projets.id}
                            urlImage={projets.url}
                            onPress={() => onPressPhoto(projets)}
                            pressColor={favColor}
                            titleImage={projets.title}
                        />
                    ))
                }
            </View>
            
        </ScrollView>

    )
};
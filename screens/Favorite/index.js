import { Text, View, Button, FlatList } from 'react-native'
import React from 'react'

import { styles } from './styles'
import TextCustom from '../../components/Text/TextCustom'
import { useSelector } from 'react-redux'
import NoData from '../../components/NoData'
import ProfilesList from '../../components/ProfilesList'

export default function FavoriteScreen({navigation}) {

    // -------------------------------- //
    // ---------- NAVIGATION ---------- //
    // -------------------------------- //
    const handleNavigateToPortfolio = (item) => {
        navigation.navigate('Portfolio',item)
    }
    //
    //
    //
    //
    //
    // -------------------------------- //
    // ---------- XXXXXXXXXX ---------- //
    // -------------------------------- //
    const favoriteUsers = useSelector(state => state.users.favoriteUsers);
    //
    //
    //
    //
    //
    // ------------------------------- //
    // ---------- AFFICHAGE ---------- //
    // ------------------------------- //
    if(favoriteUsers.length === 0){
        return (
            <View style={styles.containerScreenNoData}>
                <NoData/>
            </View>
        )

    }else{
        return (

            <View style={styles.containerScreen}>

                <FlatList
                    data={favoriteUsers}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <ProfilesList
                            name={item.firstName}
                            country={item.country}
                            urlImage={item.urlProfileImage}
                            pressButton={() => handleNavigateToPortfolio(item)}
                        />
                    )}
                />

            </View>
        )
    }
};
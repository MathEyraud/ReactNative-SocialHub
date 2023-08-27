import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import styles from './style';
import colors from '../../theme/colors';
import TextTitleCustom from '../Text/TextTitleCustom';

/* {"assets": [{
    "assetId": null, 
    "base64": null, 
    "duration": null, 
    "exif": null, 
    "height": 648, 
    "rotation": null, 
    "type": "image", 
    "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540eyraudmathieu%252Fprofessional-portfolio/ImagePicker/a25508cb-ba7b-432e-9d41-2653350e3d68.png", 
    "width": 864}], 
    "canceled": false, 
    "cancelled": false} 
*/

const InputPhoto = ({ 
  title,  
  setUserPhoto, 
  iconeSize,
  backgroundColor,
  colorIcone,
  }) => {

  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  // --------------------------------------------------------------------- //
  //                     GESTIONS DE L'AJOUT DE LA PHOTO                   //
  // --------------------------------------------------------------------- //
  const handleImageSelect = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    
    
    if (!result.canceled) {
      setSelectedImageUrl(result.assets[0].uri)
      setUserPhoto(result.assets[0].uri);
    }
  };
  //
  //
  //
  //
  //
  // --------------------------------------------------------------------- //
  //                 FONCTION DE SUPPRESSION DE LA PHOTO                   //
  // --------------------------------------------------------------------- //
  const handleDeleteImage = async () => {
    setSelectedImageUrl(null);
  };
  //
  //
  //
  //
  //
  // --------------------------------------------------------------------- //
  //                                 AFFICHAGE                             //
  // --------------------------------------------------------------------- //
  return (

    <View style={styles.container}>
      <Pressable 
        style={({pressed}) => [
          {backgroundColor: pressed ? backgroundColor + 'A0'  : backgroundColor},
          styles.container,
        ]}
        onPress={handleImageSelect}
      >

        {selectedImageUrl ? (
          <>
            <View style={styles.containerIconeBin}>
              <TouchableOpacity style={styles.iconeBin} onPress={() => handleDeleteImage()}>
                <Ionicons name="close" size={iconeSize} color={colors.warning} />
              </TouchableOpacity>
            </View>
            <Image source={{ uri: selectedImageUrl }} style={styles.image} />
          </>
          
          ) : (

          <>
            <Ionicons name="camera" size={iconeSize} color={colorIcone} />
            <TextTitleCustom style={[styles.labelTitle,{color:colorIcone}]}>{title}</TextTitleCustom>
          </>
        )}
      </Pressable>
    </View>
  );
};

export default InputPhoto;

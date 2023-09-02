import { Dimensions } from 'react-native';

const getScreenDimensions = () => {
  return Dimensions.get('window');
};

export default getScreenDimensions;

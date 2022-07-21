import React from 'react'
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

interface BackButtonIconProps {
  navigation: any
}
 
const BackButtonIcon: React.FC<BackButtonIconProps> = ({ navigation }) => {
  const handleClick = () => {
    console.log('ICON CLICKED')
    navigation.goBack()
  }
  return ( 
    <View style={{ zIndex: 10 }}>
      <Icon name={'arrow-back'} raised size={14} onPress={handleClick} tvParallaxProperties={undefined}/>
    </View>
   );
}
 
export default BackButtonIcon;
import React from 'react'
import { Platform, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BackButtonIconProps {
  navigation: any
}
 
const BackButtonIcon: React.FC<BackButtonIconProps> = ({ navigation }) => {
  const handleClick = () => {
    console.log('ICON CLICKED')
    navigation.goBack()
  }
  const insets = useSafeAreaInsets()
  return ( 
    <View style={[{ zIndex: 10 }, (Platform.OS === 'ios') && ({ paddingTop: insets.top })]}>
      <Icon name={'arrow-back'} raised size={14} onPress={handleClick} tvParallaxProperties={undefined}/>
    </View>
   );
}
 
export default BackButtonIcon;
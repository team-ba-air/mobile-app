import React from 'react'
import { Platform, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { heightPixel, widthPixel } from 'styles/sizes';

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
    <View style={[
      { zIndex: 10 }, 
      (Platform.OS === 'ios') && ({ paddingTop: insets.top }), 
      (Platform.OS === 'android' && ({ paddingLeft: widthPixel(4) }))
    ]}>
      <Icon name={'arrow-back'} raised size={16} onPress={handleClick} tvParallaxProperties={undefined}/>
    </View>
   );
}
 
export default BackButtonIcon;
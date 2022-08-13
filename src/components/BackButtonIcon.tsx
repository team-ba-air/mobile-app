import { NavigationProp } from '@react-navigation/native';
import React from 'react'
import { Platform, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthPixel } from 'styles/sizes';
import { SCREENS } from '../navigations/constants'

interface BackButtonIconProps {
  navigation: NavigationProp<any>
}
 
const BackButtonIcon: React.FC<BackButtonIconProps> = ({ navigation }) => {
  const handleClick = () => {
    console.log('ICON CLICKED')
    navigation.goBack()
  }
  const insets = useSafeAreaInsets()
  const routes = navigation.getState().routes
  const latestRoutes = routes[routes.length - 1].name

  if (latestRoutes !== SCREENS.reservation.bengkelFormReservation) return null

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
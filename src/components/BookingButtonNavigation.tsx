import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { NavigationProp } from '@react-navigation/native';
import { SCREENS } from 'navigations/constants';
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';

interface BookingButtonNavigationProps {
  navigation: NavigationProp<any>
}
 
const BookingButtonNavigation: React.FC<BookingButtonNavigationProps> = ({ navigation }) => {
  return ( 
    <TouchableOpacity 
      style={{
        width: widthPixel(60),
        height: heightPixel(60),
        backgroundColor: Color.blue[7],
        borderRadius: 100,
        transform: [
          { translateY: heightPixel(-16), }
        ]
      }}
      onPress={() => navigation.navigate(SCREENS.reservation.serviceReservation, { data: '' })}
    >
      <View style={{ marginTop: heightPixel(6) }}>
        <Icon type='material' name='event' color={Color.blue[1]} size={36} tvParallaxProperties={undefined} />
        <Text style={{ fontSize: fontPixel(10), color: Color.blue[1], alignSelf: 'center' }}>Booking</Text>
      </View>
    </TouchableOpacity>
  );
}
 
export default BookingButtonNavigation;
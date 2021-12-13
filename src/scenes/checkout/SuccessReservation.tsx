import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React from 'react'
import { View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { fontPixel, heightPixel, Sizing, widthPixel } from 'styles/sizes';

interface SuccessReservationProps {
  navigation: any
}
 
const SuccessReservation: React.FC<SuccessReservationProps> = ({ navigation }) => {
  return ( 
    <AppContainer style={{ display: 'flex', justifyContent: 'space-between'}}>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
        <Image style={{
          width: widthPixel(120),
          height: heightPixel(120),
        }} source={require('@assets/success_reservation.webp')} />
        <Text style={{ fontSize: fontPixel(Sizing.text.subheading[20]), fontWeight: 'bold', marginTop: 16 }}>Reservasi Anda telah dibuat</Text>
        <Text style={{ fontSize: fontPixel(Sizing.text.body[16]), textAlign: 'center', marginTop: 16 }}>Jangan lupa untuk datang ke Bengkel sesuai waktu yang Anda pilih!</Text>
      </View>
      <View>
        <CustomButton onPress={() => navigation.navigate(SCREENS.app.home)} title='Kembali Ke Home' />
      </View>
    </AppContainer>
   );
}
 
export default SuccessReservation;
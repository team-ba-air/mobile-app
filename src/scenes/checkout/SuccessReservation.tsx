import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React from 'react'
import { View } from 'react-native';
import { Text } from 'react-native-elements';

interface SuccessReservationProps {
  navigation: any
}
 
const SuccessReservation: React.FC<SuccessReservationProps> = ({ navigation }) => {
  return ( 
    <AppContainer style={{ display: 'flex', justifyContent: 'space-between'}}>
      <View>
        <Text>Reservasi Anda telah dibuat</Text>
        <Text>Jangan lupa untuk datang ke Bengkel sesuai waktu yang Anda pilih!</Text>
      </View>
      <View>
        <CustomButton onPress={() => navigation.navigate(SCREENS.app.home)} title='Kembali Ke Home' />
      </View>
    </AppContainer>
   );
}
 
export default SuccessReservation;
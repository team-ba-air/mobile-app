import { Route } from '@react-navigation/routers';
import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import React from 'react'
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Sizing } from 'styles/sizes';
import AuthorizedChips from './components/AuthorizedChips';
import BengkelHeader from './components/BengkelHeader';
import ReservationForm from './components/ReservationForm';
import { BengkelItem } from './constants';

interface BengkelFormReservationProps {
  route: Route<string, ParamBengkel>
}

interface ParamBengkel {
  data: BengkelItem
}
 
const BengkelFormReservation: React.FC<BengkelFormReservationProps> = ({ route }) => {
  const { data } = route.params
  return ( 
    <AppContainer>
      <BengkelHeader data={data} />
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90%' }}>
        <ScrollView>
          <ReservationForm />
        </ScrollView>
        <CustomButton style={{ bottom: 0 }} title='Checkout' />
      </View>
    </AppContainer>
  );
}
 
export default BengkelFormReservation;
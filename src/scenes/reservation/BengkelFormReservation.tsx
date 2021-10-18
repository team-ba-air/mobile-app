import { Route } from '@react-navigation/routers';
import AppContainer from 'components/AppContainer';
import React from 'react'
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { Sizing } from 'styles/sizes';
import AuthorizedChips from './components/AuthorizedChips';
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
      <View>
        <Text style={{ fontSize: Sizing.text.body[16], fontWeight: 'bold' }}>{data.name}, {data.location}</Text>
        { data.isAuthorized && (
          <AuthorizedChips />
        )}
      </View>
    </AppContainer>
  );
}
 
export default BengkelFormReservation;
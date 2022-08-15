import { NavigationProp, Route } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import { SCREENS } from 'navigations/constants';
import { PublicAPIResponse } from 'network/types';
import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useQuery } from 'react-query';
import { AdditionalComponentItem } from 'scenes/home/constants';
import { ReservationForm } from 'scenes/reservation/constants';
import { PaymentMethodItem, PaymentMethodSelectionItem } from '../constants';
import getPaymentMethod from '../service/getPaymentMethod';
import PaymentMethodComponent from './components/PaymentMethodComponent';

interface SelectPaymentScreenProps {
  route: Route<string, ParamSelectPayment>
  navigation: NavigationProp<any, any>
}

interface ParamSelectPayment {
  id: string
  servicePrice: number
  additionalComponent?: AdditionalComponentItem[]
  status?: number
}
 
const SelectPaymentScreen: React.FC<SelectPaymentScreenProps> = ({ route, navigation }) => {
  const { additionalComponent, status, servicePrice, id } = route.params

  const onSelectPayment = (item: PaymentMethodSelectionItem) => {
    navigation.navigate(SCREENS.reservation.paymentDetail, { additionalComponent, paymentMethod: item, status, servicePrice, id })
  }

  const {
    data: paymentMethodListResponse,
  } = useQuery<PublicAPIResponse<PaymentMethodItem[]>>(
    ['getPaymentMethod'],
    () => getPaymentMethod(),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  const paymentMethodList = paymentMethodListResponse?.body ?? []

  return ( 
    <AppContainer refreshDisable>
      <FlatList 
        data={paymentMethodList}
        renderItem={(info: ListRenderItemInfo<PaymentMethodItem>) => (
          <PaymentMethodComponent data={info.item} onSelect={onSelectPayment} />
        )}
      />
    </AppContainer>
  );
}
 
export default SelectPaymentScreen;
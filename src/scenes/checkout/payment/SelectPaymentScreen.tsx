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
  additionalComponent: AdditionalComponentItem[]
  status?: number
}

const dummyPayment: PaymentMethodItem[] = [
  {
    method: 'Transfer Virtual Account',
    item: [
      {
        id: '1',
        name: 'BCA Virtual Account',
        image: '',
        notes: ['Notes 1', 'Notes 2'],
        target: '',
        active: false,
      },
      {
        id: '2',
        name: 'BNI Virtual Account',
        image: '',
        notes: ['Notes 1', 'Notes 2', 'Notes 3'],
        target: '',
        active: false,
      }
    ]
  },
  {
    method: 'Tunai/Cash',
    item: [
      {
        id: '3',
        name: 'Bayar Langsung di Bengkel',
        image: '',
        notes: ['Anda dapat melakukan pembayaran di bengkel dengan metode pembayaran yang tersedia di bengkel.'],
        active: true,
      }
    ]
  }
]
 
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
import { NavigationProp, Route } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import { SCREENS } from 'navigations/constants';
import { PublicAPIResponse } from 'network/types';
import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useQuery } from 'react-query';
import { ReservationForm } from 'scenes/reservation/constants';
import { PaymentMethodItem, PaymentMethodSelectionItem } from '../constants';
import getPaymentMethod from '../service/getPaymentMethod';
import PaymentMethodComponent from './components/PaymentMethodComponent';

interface SelectPaymentScreenProps {
  route: Route<string, ReservationForm>
  navigation: NavigationProp<any, any>
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
      },
      {
        id: '2',
        name: 'BNI Virtual Account',
        image: '',
        notes: ['Notes 1', 'Notes 2', 'Notes 3'],
        target: '',
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
        notes: [],
      }
    ]
  }
]
 
const SelectPaymentScreen: React.FC<SelectPaymentScreenProps> = ({ route, navigation }) => {
  const onSelectPayment = (item: PaymentMethodSelectionItem) => {
    const data: ReservationForm = {
      ...route.params,
      payment: item
    }
    
    navigation.navigate(SCREENS.reservation.paymentDetail, { data })
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

  return ( 
    <AppContainer>
      <FlatList 
        data={dummyPayment}
        renderItem={(info: ListRenderItemInfo<PaymentMethodItem>) => (
          <PaymentMethodComponent data={info.item} onSelect={onSelectPayment} />
        )}
      />
    </AppContainer>
  );
}
 
export default SelectPaymentScreen;
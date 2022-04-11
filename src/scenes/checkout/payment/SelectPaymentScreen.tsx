import { NavigationProp } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import { SCREENS } from 'navigations/constants';
import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { PaymentMethodItem } from '../constants';
import PaymentMethodComponent from './components/PaymentMethodComponent';

interface SelectPaymentScreenProps {
  navigation: NavigationProp<any, any>
}

const dummyPayment: PaymentMethodItem[] = [
  {
    method: 'Transfer Virtual Account',
    item: [
      {
        name: 'BCA Virtual Account',
        imageUrl: '',
      },
      {
        name: 'BNI Virtual Account',
        imageUrl: '',
      }
    ]
  },
  {
    method: 'Tunai/Cash',
    item: [
      {
        name: 'Bayar Langsung di Bengkel',
        imageUrl: '',
      }
    ]
  }
]
 
const SelectPaymentScreen: React.FC<SelectPaymentScreenProps> = ({ navigation }) => {
  const onSelectPayment = () => {
    navigation.navigate(SCREENS.reservation.paymentDetail)
  }

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
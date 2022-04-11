import AppContainer from 'components/AppContainer';
import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { PaymentMethodItem } from '../constants';
import PaymentMethodComponent from './components/PaymentMethodComponent';

interface SelectPaymentScreenProps {
    
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
 
const SelectPaymentScreen: React.FC<SelectPaymentScreenProps> = () => {
  return ( 
    <AppContainer>
      <FlatList 
        data={dummyPayment}
        renderItem={(info: ListRenderItemInfo<PaymentMethodItem>) => (
          <PaymentMethodComponent data={info.item} />
        )}
      />
    </AppContainer>
  );
}
 
export default SelectPaymentScreen;
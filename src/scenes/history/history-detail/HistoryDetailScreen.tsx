import { NavigationProp } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import React, { useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import { HistoryDetailItem } from '../constants';
import HistoryStatusComponent from './components/HistoryStatusComponent';
import InfoServiceComponent from './components/InfoServiceComponent';
import NotesComponent from './components/NotesComponent';
import PaymentDetailComponent from './components/PaymentDetailComponent';

interface HistoryDetailScreenProps {
  navigation: NavigationProp<any>
}

const sampleData: HistoryDetailItem = {
  id: '1',
  booking_number: '1232132ASDASD',
  status: 5,
  car: {
    id: '',
    brand: 'Toyota',
    type: 'Yaris',
    license_plate: 'B 2000 S',
  },
  shop: {
    id: '',
    name: 'Auto 2000, Jakarta Utara',
  },
  service: {
    id: '',
    name: 'Servis Reguler 20.000 KM',
    description: '',
    price: 400000,
  },
  datetime: new Date(),
  notes: 'Kebetulan daerah saya lumayan banyak debu, AC saya jadi agak kurang dingin sih',
  payment_method: 'string',
  additional_component: [
    {
      id: '',
      name: 'V-Belt',
      priority: 'IMPORTANT',
      price: 150000,
    }
  ],
  requested_additional_component_notes: '',
}
 
const HistoryDetailScreen: React.FC<HistoryDetailScreenProps> = ({ navigation }) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" }})
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined })
  }, [navigation]);

  return ( 
    <AppContainer style={{ backgroundColor: Color.gray[1], padding: 0 }} refreshDisable>
      <ScrollView>
        <HistoryStatusComponent bookingNumber={sampleData.booking_number} status={sampleData.status} />
        <InfoServiceComponent 
          car={sampleData.car} 
          shop={sampleData.shop} 
          service={sampleData.service} 
          notes={sampleData.notes} 
          datetime={sampleData.datetime} 
        />
        <PaymentDetailComponent servicePrice={sampleData.service.price} additionalComponent={sampleData.additional_component} />
        <NotesComponent notes={sampleData.requested_additional_component_notes} />
      </ScrollView>
      <View style={{ paddingVertical: heightPixel(16), paddingHorizontal: widthPixel(20), backgroundColor: 'white', marginTop: heightPixel(4) }}>
        <CustomButton type='primary' title='Beri Ulasan'/>
        <Text style={{ fontSize: fontPixel(11), marginTop: heightPixel(12), alignSelf: 'center' }}>
          <Text style={{ color: Color.gray.secondary }}>Perlu bantuan?</Text>
          <Text style={{ color: Color.blue[8] }}> Hubungi Tim Otoku </Text>
        </Text>
      </View>
    </AppContainer>
  );
}
 
export default HistoryDetailScreen;
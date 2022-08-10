import { NavigationProp, Route } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import { PublicAPIResponse } from 'network/types';
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useQuery } from 'react-query';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import BottomSheetReview from '../components/BottomSheetReview';
import { HistoryDetailItem, HistoryItem } from '../constants';
import getHistoryDetail from '../service/getHistoryDetail';
import HistoryStatusComponent from './components/HistoryStatusComponent';
import InfoServiceComponent from './components/InfoServiceComponent';
import NotesComponent from './components/NotesComponent';
import PaymentDetailComponent from './components/PaymentDetailComponent';

interface HistoryDetailScreenProps {
  navigation: NavigationProp<any>
  route: Route<any, ParamHistoryDetail>
}

interface ParamHistoryDetail {
  data: HistoryItem
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
    contact: '',
  },
  service: {
    id: '',
    name: 'Servis Reguler 20.000 KM',
    description: '',
    price: 400000,
  },
  datetime: new Date(),
  notes: 'Kebetulan daerah saya lumayan banyak debu, AC saya jadi agak kurang dingin sih',
  payment_method: {
    id: '',
    name: 'Bayar di Bengkel',
    image: '',
    notes: [],
    active: true,
  },
  additional_component: [
    {
      id: '',
      name: 'V-Belt',
      priority: 'IMPORTANT',
      price: 150000,
    }
  ],
  requested_additional_component_notes: '',
  // review: {
  //   date: new Date(),
  //   rating: 5,
  //   review: 'a',
  // },
  review: null
}
 
const HistoryDetailScreen: React.FC<HistoryDetailScreenProps> = ({ navigation, route }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false)

  const { data } = route.params

  const {
    data: historyDetailResponse,
    refetch,
  } = useQuery<PublicAPIResponse<HistoryDetailItem>>(
    ['getHistoryDetail', data],
    () => getHistoryDetail({ id: data.id }),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" }})
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined })
  }, [navigation]);

  const mapHistoryDetailItem = (data: HistoryDetailItem): HistoryItem => {
    return {
      id: data.id,
      status: data.status,
      car: data.car,
      shop: data.shop,
      service: data.service,
      datetime: data.datetime,
      additional_component: data.additional_component,
      review: data.review
    }
  }

  const handleClose = () => {
    console.log('Review History Detail')
    setIsOpen(false)
  }

  const handleSuccess = () => {
    setVisible(true)
  }

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
        <PaymentDetailComponent paymentMethod={sampleData.payment_method} servicePrice={sampleData.service?.price ?? 0} additionalComponent={sampleData.additional_component} />
        <NotesComponent notes={sampleData.requested_additional_component_notes} />
      </ScrollView>
      <View style={{ paddingVertical: heightPixel(16), paddingHorizontal: widthPixel(20), backgroundColor: 'white', marginTop: heightPixel(4) }}>
        {sampleData.review === null && (
          <CustomButton style={{ marginBottom: heightPixel(12) }} type='primary' title='Beri Ulasan' onPress={() => setIsOpen(true)} />
        )}
        
        <Text style={{ fontSize: fontPixel(11), alignSelf: 'center' }}>
          <Text style={{ color: Color.gray.secondary }}>Perlu bantuan?</Text>
          <Text style={{ color: Color.blue[8] }}> Hubungi Tim Otoku </Text>
        </Text>
      </View>

      <BottomSheetReview 
        onSuccess={handleSuccess}
        onClose={handleClose} 
        data={mapHistoryDetailItem(sampleData)} 
        isOpen={isOpen} 
      />

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={4000}
        style={{ backgroundColor: '#27AE60' }}
        wrapperStyle={{ alignSelf: 'center' }}
        theme={{
          colors: {
            surface: 'white'
          }
        }}
      >
        Terima kasih, ulasan berhasil diberikan!
      </Snackbar>
    </AppContainer>
  );
}
 
export default HistoryDetailScreen;
import { NavigationProp, Route } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import { PublicAPIResponse } from 'network/types';
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import { ReservationDetailItem } from '../constants';
import getProgressServiceDetail from '../service/getProgressServiceDetail';
import BookingDetail from './components/BookingDetail';
import ProgressStatus from './components/ProgressStatus';
import ServiceStatusStepIndicator from './components/ServiceStatusStepIndicator';
import TabProgress from './components/TabProgress';

interface ProgressServiceScreenProps {
  route: Route<any, ParamProgress>
  navigation: NavigationProp<any>
}

interface ParamProgress {
  data: string
}

const sampleDataProgress: ReservationDetailItem = {
  id: '1',
  booking_number: '9182397dfiwhbf8weg8',
  info_booking: {
    car: {
      id: '',
      brand: '',
      type: 'Yaris',
      license_plate: 'B 2000 S',
    },
    shop: {
      id: '',
      name: 'Auto 2000, Jakarta Utara',
    },
    service: {
      id: '',
      name: 'Servis Dasar 10000 KM',
      description: '',
      price: 15000,
    },
    datetime: new Date('2022-06-14T11:27:39.404Z'),
    notes: '',
  },
  status: 5, // 0, 1, 2, 3, 4
  progress: [
    {
      step: 0,
      time: null,
    },
    {
      step: 1,
      time: null,
    },
    {
      step: 2,
      time: null,
    },
    {
      step: 3,
      time: null,
    },
    {
      step: 4,
      time: null,
    }
  ],
  service_assistant: 'Michael Hans',
  additional_component: [
    // {
    //   id: '',
    //   name: 'V-Belt',
    //   priority: 'IMPORTANT', // IMPORTANT or RECOMMENDED
    //   price: 10000,
    // },
    // {
    //   id: '',
    //   name: 'Filter AC',
    //   priority: 'IMPORTANT',
    //   price: 10000,
    // },
    // {
    //   id: '',
    //   name: 'Filter AC',
    //   priority: 'IMPORTANT',
    //   price: 10000,
    // },
    // {
    //   id: '',
    //   name: 'Filter AC',
    //   priority: 'IMPORTANT',
    //   price: 10000,
    // },
  ],
  requested_additional_component: [
    {
      id: '',
      name: '',
      priority: 'IMPORTANT',
      price: 10000,
    },
  ],
  requested_additional_component_notes: '',
}
 
const ProgressServiceScreen: React.FC<ProgressServiceScreenProps> = ({ navigation, route }) => {
  const { data } = route.params

  const [index, setIndex] = useState(0);

  const {
    data: progressServiceDetailResponse,
  } = useQuery<PublicAPIResponse<ReservationDetailItem>>(
    ['getProgressServiceDetail', data],
    () => getProgressServiceDetail({ id: data }),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  const progressServiceDetail = progressServiceDetailResponse?.body

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" }})
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined })
  }, [navigation]);

  return ( 
    <AppContainer style={{ paddingHorizontal: 0 }} refreshDisable>
      <View style={{ borderWidth: 1, borderColor: Color.gray[2], borderRadius: 4, paddingVertical: heightPixel(12), paddingHorizontal: widthPixel(16), marginHorizontal: widthPixel(16) }}>
        <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Nomor Booking</Text>
        <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{sampleDataProgress.booking_number}</Text>
      </View>
      <TabProgress index={index} setIndex={setIndex}/>
      <ScrollView contentContainerStyle={{ height: '100%', display: 'flex', justifyContent: 'space-between' }}>
          {index === 0 ?
          (
            <ProgressStatus data={sampleDataProgress} navigation={navigation} />
          ) : 
            <BookingDetail data={sampleDataProgress} navigation={navigation} />
          }
        </ScrollView>
    </AppContainer>
  );
}
 
export default ProgressServiceScreen;
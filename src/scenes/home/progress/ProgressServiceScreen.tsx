import { NavigationProp, Route } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import NavbarApp from 'components/NavbarApp';
import { PublicAPIResponse } from 'network/types';
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import { ReservationDetailItem } from '../constants';
import getProgressServiceDetail from '../service/getProgressServiceDetail';
import BookingDetail from './components/BookingDetail';
import FinishedProgressComponent from './components/FinishedProgressComponent';
import ProgressStatus from './components/ProgressStatus';
import TabProgress from './components/TabProgress';

interface ProgressServiceScreenProps {
  route: Route<any, ParamProgress>
  navigation: NavigationProp<any>
}

interface ParamProgress {
  data: string
}
 
const ProgressServiceScreen: React.FC<ProgressServiceScreenProps> = ({ navigation, route }) => {
  const { data } = route.params

  const [index, setIndex] = useState(0);

  const {
    data: progressServiceDetailResponse,
    refetch: refetchProgressServiceDetail,
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
    if (progressServiceDetail) {
      if (progressServiceDetail.status >= 4) {
        navigation.setOptions({ 
          header: ({ navigation: navigationHeader }) => <NavbarApp navigation={navigationHeader} title={'Servis Selesai'} type='secondary' />
        })
      } else {
        navigation.setOptions({ 
          header: ({ navigation: navigationHeader }) => <NavbarApp navigation={navigationHeader} title={'Progres Servis'} type='secondary' />
        })
      }
    }
  }, [progressServiceDetail])

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" }})
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined })
  }, [navigation]);

  const handleRefresh = () => {
    refetchProgressServiceDetail()
  }

  return ( 
    <AppContainer style={{ padding: 0, backgroundColor: Color.gray[1], }} refreshBackground={'white'} onRefresh={handleRefresh}>
      {(progressServiceDetail && progressServiceDetail.status < 4) ? (
        <>
          <View style={{ backgroundColor: 'white', paddingTop: heightPixel(20) }}>
            <View style={{ borderWidth: 1, borderColor: Color.gray[2], borderRadius: 4, paddingVertical: heightPixel(12), paddingHorizontal: widthPixel(16), marginHorizontal: widthPixel(20) }}>
              <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Nomor Booking</Text>
              <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{progressServiceDetail.booking_number}</Text>
            </View>
          </View>
          <TabProgress index={index} setIndex={setIndex}/>
          <ScrollView contentContainerStyle={{ height: '95%', display: 'flex', justifyContent: 'space-between', backgroundColor: 'white' }}>
            {index === 0 ?
            (
              <ProgressStatus data={progressServiceDetail} navigation={navigation} />
            ) : 
              <BookingDetail data={progressServiceDetail} navigation={navigation} />
            }
          </ScrollView>
        </>
      ) : (progressServiceDetail) && (
        <FinishedProgressComponent navigation={navigation} data={progressServiceDetail} />
      )}
    </AppContainer>
  );
}
 
export default ProgressServiceScreen;
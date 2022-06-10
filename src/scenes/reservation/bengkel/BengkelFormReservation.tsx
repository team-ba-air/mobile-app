import { yupResolver } from '@hookform/resolvers/yup';
import { Route } from '@react-navigation/routers';
import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Icon, Tab, TabView, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Color } from 'styles/colors';
import { heightPixel, SCREEN_WIDTH, Sizing, widthPixel } from 'styles/sizes';
import BengkelHeader from './components/BengkelHeader';
import ReservationFormComponent from './components/ReservationFormComponent';
import { BengkelDetailItem, BengkelItem, ReservationForm, ReviewItem } from '../constants';
import { reservationFormSchema } from '../schema/reservationFormSchema';
import TabBengkel from './components/TabBengkel';
import { NavigationProp } from '@react-navigation/native';
import ReviewItemComponent from './components/ReviewItemComponent';
import ReviewComponent from './components/ReviewComponent';
import { PublicAPIResponse } from 'network/types';
import getShopDetail from '../service/getShopDetail';
import { useQuery } from 'react-query';

interface BengkelFormReservationProps {
  route: Route<string, ParamBengkel>
  navigation: NavigationProp<any>
}

interface ParamBengkel {
  data: BengkelItem
}

 
const BengkelFormReservation: React.FC<BengkelFormReservationProps> = ({ route, navigation }) => {
  const { data } = route.params

  const formInitialValues = {
    car: '',
    service: '',
    date: new Date(),
    hour: '',
    notes: '',
  }

  const formMethods = useForm<ReservationForm>({
    resolver: yupResolver(reservationFormSchema),
    defaultValues: formInitialValues,
    reValidateMode: 'onChange',
  })

  const {
    handleSubmit: handleFormSubmit,
  } = formMethods

  const onSubmit = useCallback((data: ReservationForm) => {
    const reservationData: ReservationForm = {
      ...data,
      shop: shopDetailResponse?.body,
    }
    navigation.navigate(SCREENS.reservation.checkout, { data })
  }, [])

  const {
    data: shopDetailResponse,
  } = useQuery<PublicAPIResponse<BengkelDetailItem>>(
    ['getShopDetail', data],
    () => getShopDetail({ id: data.id }),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  console.log(shopDetailResponse)

  const [index, setIndex] = React.useState(0);

  return ( 
    <AppContainer style={{ padding: 0, alignItems: 'flex-start' }}>
      <View style={{  zIndex: 10, elevation: 10 }}>
        <Icon name={'arrow-back'} raised size={14} onPress={() => navigation.goBack()} tvParallaxProperties={undefined}/>
      </View>

      <ScrollView style={{ overflow: 'scroll', ...StyleSheet.absoluteFillObject }}>
        <BengkelHeader data={shopDetailResponse?.body} />
        <TabBengkel index={index} setIndex={setIndex} />
        <View style={{ paddingHorizontal: widthPixel(20) }}>
          {index === 0 ?
          (
            <ScrollView 
              nestedScrollEnabled 
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <FormProvider {...formMethods}>
                <ReservationFormComponent serviceOptions={shopDetailResponse?.body?.serviceAvailable} />
              </FormProvider>
              <CustomButton 
                onPress={handleFormSubmit(onSubmit)} 
                style={{ bottom: 0, marginTop: heightPixel(16), marginBottom: heightPixel(16) }} 
                title='Checkout' 
              />
            </ScrollView>
          ) : 
            <ReviewComponent />
          }
        </View>
      </ScrollView>
      
    </AppContainer>
  );
}
 
export default BengkelFormReservation;
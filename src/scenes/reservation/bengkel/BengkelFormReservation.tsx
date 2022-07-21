import { yupResolver } from '@hookform/resolvers/yup';
import { Route } from '@react-navigation/routers';
import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React, { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPixel, SCREEN_HEIGHT, widthPixel } from 'styles/sizes';
import BengkelHeader from './components/BengkelHeader';
import ReservationFormComponent from './components/ReservationFormComponent';
import { BengkelDetailItem, BengkelItem, ReservationForm, ReviewItem, ServiceItem } from '../constants';
import { reservationFormSchema } from '../schema/reservationFormSchema';
import TabBengkel from './components/TabBengkel';
import { NavigationProp } from '@react-navigation/native';
import ReviewComponent from './components/ReviewComponent';
import { PublicAPIResponse } from 'network/types';
import getShopDetail from '../service/getShopDetail';
import { useQuery } from 'react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VehicleItem } from 'scenes/vehicle/constants';

interface BengkelFormReservationProps {
  route: Route<string, ParamBengkel>
  navigation: NavigationProp<any>
}

interface ParamBengkel {
  data: {
    shop: BengkelItem
    car: VehicleItem
    service: ServiceItem
  }
}

 
const BengkelFormReservation: React.FC<BengkelFormReservationProps> = ({ route, navigation }) => {
  const { data } = route.params
  const insets = useSafeAreaInsets()

  const valueCar = `${data.car.id}|${data.car.brand}|${data.car.type}|${data.car.plat}`

  const formInitialValues: ReservationForm = {
    car: valueCar,
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
    setValue,
  } = formMethods

  const onSubmit = useCallback((data: ReservationForm) => {
    const reservationData: ReservationForm = {
      ...data,
      shop: shopDetailResponse?.body,
    }
    navigation.navigate(SCREENS.reservation.checkout, { data: reservationData })
  }, [])

  const {
    data: shopDetailResponse,
  } = useQuery<PublicAPIResponse<BengkelDetailItem>>(
    ['getShopDetail', data],
    () => getShopDetail({ id: data.shop.id }),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  useEffect(() => {
    if (shopDetailResponse) {
      setValue('shop', shopDetailResponse.body)
    }
  }, [shopDetailResponse])

  const shopDetail = shopDetailResponse?.body
  console.log(`Shop Detail: ${shopDetail}`)

  const [index, setIndex] = React.useState(0)

  return ( 
    <AppContainer style={{ padding: 0, zIndex: 1 }}>
      {/* <View style={{  zIndex: 10, elevation: 10, marginTop: insets.top, opacity: 0 }}>
      
      </View> */}
      <ScrollView style={{ zIndex: 1}}>
        <View>
          <BengkelHeader data={shopDetailResponse?.body} />
          <TabBengkel index={index} setIndex={setIndex} />
          <View style={{ display: 'flex', justifyContent: 'space-between' }}>
            {index === 0 ?
            (
              <>
                <FormProvider {...formMethods}>
                  <ReservationFormComponent 
                    serviceOptions={shopDetailResponse?.body?.serviceAvailable ?? []} 
                    car={data.car}
                  />
                </FormProvider>
                <CustomButton 
                  onPress={handleFormSubmit(onSubmit)} 
                  style={{ bottom: 0, marginTop: heightPixel(16), marginBottom: heightPixel(16), paddingHorizontal: widthPixel(20) }} 
                  title='Checkout' 
                />
              </>
            ) : 
              <ReviewComponent />
            }
          </View>

        </View>
      </ScrollView>
      {/* <Icon style={{ zIndex: 10, elevation: 10, position: 'absolute', top: 0 }} name={'arrow-back'} raised size={14} onPress={() => navigation.goBack()} tvParallaxProperties={undefined}/> */}
    </AppContainer>
  );
}
 
export default BengkelFormReservation;
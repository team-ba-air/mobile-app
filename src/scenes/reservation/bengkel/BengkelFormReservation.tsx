import { yupResolver } from '@hookform/resolvers/yup';
import { Route } from '@react-navigation/routers';
import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React, { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPixel, SCREEN_HEIGHT, widthPixel } from 'styles/sizes';
import BengkelHeader from './components/BengkelHeader';
import ReservationFormComponent from './components/ReservationFormComponent';
import { BengkelDetailItem, BengkelItem, ReservationForm, ReviewItem, ServiceItem, ShopReview } from '../constants';
import { reservationFormSchema } from '../schema/reservationFormSchema';
import TabBengkel from './components/TabBengkel';
import { NavigationProp } from '@react-navigation/native';
import ReviewComponent from './components/ReviewComponent';
import { PublicAPIResponse } from 'network/types';
import getShopDetail from '../service/getShopDetail';
import { useQuery } from 'react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VehicleItem } from 'scenes/vehicle/constants';
import { VehicleInfo } from 'scenes/home/constants';
import getShopReview from '../service/getShopReview';

interface BengkelFormReservationProps {
  route: Route<string, ParamBengkel>
  navigation: NavigationProp<any>
}

interface ParamBengkel {
  data: {
    shop: BengkelItem
    car: VehicleInfo
    service: ServiceItem
  }
}

 
const BengkelFormReservation: React.FC<BengkelFormReservationProps> = ({ route, navigation }) => {
  const { data } = route.params

  const [outerScrollEnabled, setOuterScrollEnabled] = useState(true)

  const valueCar = `${data.car.id}|${data.car.brand}|${data.car.type}|${data.car.license_plate}`

  const formInitialValues: ReservationForm = {
    car: valueCar,
    shop: data.shop,
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
    getValues
  } = formMethods

  const onSubmit = useCallback((data: ReservationForm) => {
    navigation.navigate(SCREENS.reservation.checkout, { data: getValues() })
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

  const shopDetail = shopDetailResponse?.body

  const {
    data: shopReviewResponse,
  } = useQuery<PublicAPIResponse<ShopReview>>(
    ['getShopReview', data],
    () => getShopReview({ id: data.shop.id }),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  const shopReview = shopReviewResponse?.body

  const [index, setIndex] = useState(0)

  return ( 
    <AppContainer style={{ padding: 0, display: 'flex' }} refreshDisable scrollEnabled={outerScrollEnabled}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BengkelHeader data={shopDetailResponse?.body} />
        <TabBengkel index={index} setIndex={setIndex} countReview={shopReview?.total_count ?? 0} />
        <View>
          {index === 0 ?
          (
            <>
              <View>
                <FormProvider {...formMethods}>
                  <ReservationFormComponent
                    serviceOptions={shopDetail?.serviceAvailable ?? []} 
                    carTags={shopDetail?.availableForCar ?? []}
                    open={shopDetail?.openTime ?? new Date()}
                    close={shopDetail?.closeTime ?? new Date()}
                  />
                </FormProvider>

              </View>
              <CustomButton 
                onPress={handleFormSubmit(onSubmit)} 
                style={{ bottom: 0, marginTop: heightPixel(16), marginBottom: heightPixel(16), paddingHorizontal: widthPixel(20) }} 
                title='Checkout' 
              />
            </>
          ) : 
            <ReviewComponent shopReview={shopReview} />
          }
        </View>
      </ScrollView>

    </AppContainer>
  );
}
 
export default BengkelFormReservation;
import { yupResolver } from '@hookform/resolvers/yup';
import { Route } from '@react-navigation/routers';
import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Icon, Tab, TabView, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Color } from 'styles/colors';
import { heightPixel, Sizing, widthPixel } from 'styles/sizes';
import BengkelHeader from './components/BengkelHeader';
import ReservationFormComponent from '../components/ReservationFormComponent';
import { BengkelItem, ReservationForm } from '../constants';
import { reservationFormSchema } from '../schema/reservationFormSchema';
import TabBengkel from './components/TabBengkel';
import { NavigationProp } from '@react-navigation/native';

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
    console.log(data)
    navigation.navigate(SCREENS.reservation.checkout, { data })
  }, [])

  const [index, setIndex] = React.useState(0);

  return ( 
    <AppContainer style={{ padding: 0, position: 'relative' }}>
      
      <ScrollView style={{ overflow: 'scroll' }}>
        <BengkelHeader data={data} navigation={navigation} />
        <TabBengkel index={index} setIndex={setIndex} />
        <View style={{ paddingHorizontal: widthPixel(20) }}>
          {index === 0 ?
          (
            <ScrollView nestedScrollEnabled style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <FormProvider {...formMethods}>
                <ReservationFormComponent />
              </FormProvider>
              <CustomButton onPress={handleFormSubmit(onSubmit)} style={{ bottom: 0, marginTop: heightPixel(16), marginBottom: heightPixel(16) }} title='Checkout' />
            </ScrollView>
          ) : 
            <View>
              <Text>Ini review</Text>
            </View>
          }
        </View>
      </ScrollView>
      
    </AppContainer>
  );
}
 
export default BengkelFormReservation;
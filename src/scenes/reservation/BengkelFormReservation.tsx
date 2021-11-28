import { yupResolver } from '@hookform/resolvers/yup';
import { Route } from '@react-navigation/routers';
import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Sizing } from 'styles/sizes';
import AuthorizedChips from './components/AuthorizedChips';
import BengkelHeader from './components/BengkelHeader';
import ReservationFormComponent from './components/ReservationFormComponent';
import { BengkelItem, ReservationForm } from './constants';
import { reservationFormSchema } from './schema/reservationFormSchema';

interface BengkelFormReservationProps {
  route: Route<string, ParamBengkel>
  navigation: any
}

interface ParamBengkel {
  data: BengkelItem
}
 
const BengkelFormReservation: React.FC<BengkelFormReservationProps> = ({ route, navigation }) => {
  const { data } = route.params

  const formInitialValues = {
    car: '',
    service: '',
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

  return ( 
    <AppContainer>
      <BengkelHeader data={data} />
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90%' }}>
        <ScrollView>
          <FormProvider {...formMethods}>
            <ReservationFormComponent />
          </FormProvider>
        </ScrollView>
        <CustomButton onPress={handleFormSubmit(onSubmit)} style={{ bottom: 0 }} title='Checkout' />
      </View>
    </AppContainer>
  );
}
 
export default BengkelFormReservation;
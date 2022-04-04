import { yupResolver } from '@hookform/resolvers/yup';
import { Route } from '@react-navigation/routers';
import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Tab, TabView, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';
import BengkelHeader from './components/BengkelHeader';
import ReservationFormComponent from '../components/ReservationFormComponent';
import { BengkelItem, ReservationForm } from '../constants';
import { reservationFormSchema } from '../schema/reservationFormSchema';
import TabBengkel from './components/TabBengkel';

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
    <AppContainer>
      <BengkelHeader data={data} />
      <TabBengkel index={index} setIndex={setIndex} />
      <View>
        {index === 0 ?
        (
          <ScrollView contentContainerStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90%' }}>
            <FormProvider {...formMethods}>
              <ReservationFormComponent />
            </FormProvider>
            <CustomButton onPress={handleFormSubmit(onSubmit)} style={{ bottom: 0 }} title='Checkout' />
          </ScrollView>
        ) : 
          <ScrollView>
            <Text>Ini review</Text>
          </ScrollView>
        }
      </View>
    </AppContainer>
  );
}
 
export default BengkelFormReservation;
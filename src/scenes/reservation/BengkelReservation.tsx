import { Route } from '@react-navigation/routers'
import AppContainer from 'components/AppContainer'
import { SCREENS } from 'navigations/constants'
import React from 'react'
import { ListRenderItemInfo, View } from 'react-native'
import { Text } from 'react-native-elements'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Sizing } from 'styles/sizes'
import BengkelListItem from './components/BengkelListItem'
import { BengkelItem, ServiceItem } from './constants'

interface BengkelReservationProps {
  route: Route<string, ParamService>
  navigation: any
}

interface ParamService {
  service: ServiceItem
}

const defaultValues: BengkelItem[] = [
  {
    img: '',
    isAuthorized: true,
    isAlmostClosed: true,
    name: 'Auto 2000',
    location: 'Jakarta Utara',
    description: 'Servis mobil khusus Toyota',
    estimatedPickUp: 10,
    rating: 4.5,
    distance: 2.5,
  },
  {
    img: '',
    isAuthorized: false,
    isAlmostClosed: true,
    name: 'Auto 2000',
    location: 'Jakarta Utara',
    description: 'Servis mobil khusus Toyota',
    estimatedPickUp: 10,
    rating: 4.5,
    distance: 2.5,
  }
]
 
const BengkelReservation: React.FC<BengkelReservationProps> = ({ route, navigation }) => {
  const { service } = route.params
  return ( 
    <AppContainer>
      <View>
        <Text style={{ fontSize: Sizing.text.body[16], fontWeight: 'bold' }}>Bengkel yang bisa {service.label}</Text>
      </View>
      <FlatList
        data={defaultValues}
        renderItem={(info: ListRenderItemInfo<BengkelItem>) => (
          <TouchableOpacity onPress={() => navigation.navigate(SCREENS.reservation.bengkelFormReservation, { data: info.item })}>
            <BengkelListItem data={info.item} />
          </TouchableOpacity>
        )}
      />
    </AppContainer>
  )
}
 
export default BengkelReservation
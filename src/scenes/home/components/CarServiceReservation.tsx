import { NavigationProp } from '@react-navigation/native'
import CustomButton from 'components/CustomButton'
import { SCREENS } from 'navigations/constants'
import { PublicAPIResponse } from 'network/types'
import React from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
import { Card, Icon, Image, Button } from 'react-native-elements'
import { useQuery } from 'react-query'
import { VehicleItem } from 'scenes/vehicle/constants'
import { Color } from 'styles/colors'
import { Sizing, fontPixel, widthPixel } from 'styles/sizes'
import getVehicleList from '../service/getVehicleList'

interface CarServiceReservationProps {
  navigation: NavigationProp<any>
}
 
const CarServiceReservation: React.FC<CarServiceReservationProps> = ({ navigation }) => {
  const { data: vehicleListResponse } = useQuery<PublicAPIResponse<VehicleItem[]>>(
    ['getVehicleList'],
    () => getVehicleList(),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  console.log(vehicleListResponse?.body ?? [])

  const goToReservation = (vehicle: VehicleItem) => {
    console.log('Go To Reservation')
    navigation.navigate(SCREENS.reservation.serviceReservation, vehicle)
  }

  const goToDetail = (vehicle: VehicleItem) => {
    console.log('Vehicle ID: ' + vehicle.id)
    navigation.navigate(SCREENS.vehicle.root, {
      screen: SCREENS.vehicle.list,
      params: {
        data: {
          vehicle,
          isOpen: true,
        }
      }
    })
  }

  return ( 
    <>
    <View style={styles.containerCard}>
      <FlatList 
        data={vehicleListResponse?.body ?? []}
        horizontal
        renderItem={(info: ListRenderItemInfo<VehicleItem>) => (
          <View style={styles.card}>
            <View style={styles.carInfo}>
              <View style={styles.carTextContainer}>
                <Text style={styles.carPlatText}>{info.item.brand}</Text>
                <Text style={styles.carTypeText}>{info.item.type}</Text>
                <Text style={styles.carPlatText}>{info.item.plat}</Text>
              </View>
              <Image style={styles.imageCar} source={require('@assets/car_placeholder.png')} resizeMode={'contain'} />
            </View>
            <View style={styles.action}>
              <CustomButton buttonStyle={styles.detail} onPress={() => goToReservation(info.item)} title='Servis' type='primary' />
              <Button buttonStyle={styles.reservation} onPress={() => goToDetail(info.item)} title='Lihat detail' type='clear' />
            </View>
          </View>
        )}
      />
      
      <View style={{ width: '100%', height: '100%', position: 'absolute', top: 0, zIndex: -5 }}>
        <View style={{ flex: 0.5, backgroundColor: Color.blue[8] }}>
        </View>
        <View style={{ flex: 0.4, backgroundColor: Color.gray[0]}}></View>
      </View>
    </View>
    </>
  )
}

export default CarServiceReservation

const styles = StyleSheet.create({
  containerCard: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
  },
  card: {
    width: widthPixel(320),
    borderWidth: 1,
    borderColor: Color.gray[2],
    zIndex: 3,
    position: 'relative',
    backgroundColor: Color.gray[0],
    borderRadius: 12,
    padding: 0,
    margin: 0,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  action: {
    paddingLeft: 16,
    paddingBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    paddingLeft: 32,
    paddingRight: 32,
    backgroundColor: Color.blue[8],
    borderRadius: 12,
  },
  detailText: { 
    color: Color.blue[1], 
    fontSize: Sizing.text.body[14],
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  reservation: {
    marginRight: 16,
    marginBottom: 0,
    paddingTop: 0,
    flex: 1,
  },
  reservationText: {
    color: Color.blue[8],
    fontSize: Sizing.text.body[14],
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  carInfo: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageCar: {
    height: 140,
    width: 240,
    marginRight: 16,
    marginBottom: 8,
    borderBottomLeftRadius: 8,
  },
  carPlatText: {
    fontSize: fontPixel(Sizing.text.body[12]),
  },
  carTypeText: {
    fontSize: fontPixel(Sizing.text.body[16]),
    fontWeight: 'bold',
  },
  carTextContainer: {
    marginLeft: 20,
    marginTop: 20,
  },
})
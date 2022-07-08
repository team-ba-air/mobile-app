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
import { Sizing, fontPixel, widthPixel, SCREEN_WIDTH, heightPixel } from 'styles/sizes'
import getVehicleList from '../service/getVehicleList'
import AddVehicleButton from './AddVehicleButton'

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
    navigation.navigate(SCREENS.reservation.serviceReservation, {
      data: `${vehicle.id}|${vehicle.brand}|${vehicle.type}|${vehicle.plat}`
    })
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

  const vehicleList = vehicleListResponse?.body ?? []

  return ( 
    <>
    <View style={styles.containerCard}>
      {vehicleList.length > 0 ? (
        <FlatList 
          data={vehicleList}
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
                <CustomButton 
                  textStyle={{ fontSize: fontPixel(12) }}
                  buttonStyle={styles.detail} 
                  onPress={() => goToReservation(info.item)} 
                  title='Servis' 
                  type='primary' 
                />
                <Button titleStyle={{ fontSize: fontPixel(12), fontWeight: 'bold' }} buttonStyle={styles.reservation} onPress={() => goToDetail(info.item)} title='Lihat detail' type='clear' />
              </View>
            </View>
          )}
        />
      ) : (
        <View style={styles.card}>
          <View style={styles.carInfo}>
            <View style={styles.carTextContainer}>
              <Text style={{
                fontSize: fontPixel(14),
                color: Color.gray.secondary,
                lineHeight: 21,
              }}>
                Anda belum menambahkan kendaraan
              </Text>
            </View>
            <Image style={styles.imageCar} source={require('@assets/empty_car.webp')} resizeMode={'contain'} />
          </View>
          <View style={{
            paddingHorizontal: widthPixel(16),
            paddingBottom: heightPixel(8),
            display: 'flex',
            width: '100%',
          }}>
            <AddVehicleButton onPress={() => navigation.navigate(SCREENS.vehicle.root, { 
              screen: SCREENS.vehicle.update, 
              params: { car: null } 
            })} />
          </View>
        </View>
      )}

      
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
    paddingHorizontal: widthPixel(16),
    paddingBottom: heightPixel(8),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detail: {
    paddingVertical: heightPixel(4),
    paddingHorizontal: widthPixel(24),
    backgroundColor: Color.blue[8],
    borderRadius: 8,
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
  carInfo: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageCar: {
    height: 120,
    width: 220,
    marginRight: 16,
    marginBottom: 8,
    borderBottomLeftRadius: 8,
    flex: 1,
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
    maxWidth: SCREEN_WIDTH * 0.4
  },
})
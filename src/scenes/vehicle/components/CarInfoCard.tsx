import { SCREENS } from 'navigations/constants'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, Card, Icon, Image } from 'react-native-elements'
import { useMutation } from 'react-query'
import { Color } from 'styles/colors'
import { fontPixel, heightPixel, Sizing, widthPixel } from 'styles/sizes'
import { VehicleItem } from '../constants'
import deleteVehicleById from '../service/deleteVehicleById'

interface CarInfoCardProps {
  car?: VehicleItem,
  navigation: any
}

const CarInfoCard: React.FC<CarInfoCardProps> = ({ car, navigation }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { isLoading: isDeleting, mutateAsync: onDelete } = useMutation(deleteVehicleById, {
    onSuccess: (data) => {
      console.log(data)
    },
  })

  const deleteVehicle = () => {
    onDelete({ id: car?.id ?? '' }).catch(() => {
      // do nothing
    })
  }

  const updateVehicle = () => {
    navigation.navigate(SCREENS.vehicle.update, {
      car
    })
  }

  return ( 
    <Card containerStyle={styles.card}>
      <View style={styles.carInfo}>
        <View style={styles.carTextContainer}>
          <Text style={styles.carPlatText}>{car?.brand}</Text>
          <Text style={styles.carTypeText}>{car?.type}</Text>
          <Text style={styles.carPlatText}>{car?.plat}</Text>
        </View>
        <Card.Image containerStyle={styles.imageCar} source={require('@assets/car_placeholder.png')} />
      </View>
      {isOpen && (
        <View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.attributeHeader}>Tipe</Text>
              <Text>G CVT 7 AB</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.attributeHeader}>VIN</Text>
              <Text>{car?.vin}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.attributeHeader}>Tahun Produksi</Text>
              <Text>{car?.year}</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.attributeHeader}>Kedaluarsa STNK</Text>
              <Text>{car?.expiredDate}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.attributeHeader}>Terakhir Servis</Text>
              <Text>{car?.lastService}</Text>
            </View>
          </View>

          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <TouchableOpacity onPress={deleteVehicle}>
              <Text style={{ 
                fontSize: fontPixel(Sizing.text.body[12]), 
                fontWeight: 'bold',
                color: Color.red[4],
              }}>
                Hapus
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={updateVehicle}>
              <Text style={{ 
                fontSize: fontPixel(Sizing.text.body[12]), 
                fontWeight: 'bold',
                color: Color.blue[7],
              }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.action}>
        <Image 
          style={{ height: heightPixel(16), width: widthPixel(10)}}
          source={require('@assets/icon/ic_arrow_down.webp')} 
          resizeMode={'contain'} 
        />
      </TouchableOpacity>
    </Card>
  )
}

export default CarInfoCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: Color.gray[0],
    borderRadius: 12,
    padding: 0,
    margin: 0,
    marginTop: heightPixel(20),
    marginHorizontal: widthPixel(20),
  },
  action: {
    display: 'flex',
    backgroundColor: Color.blue[1],
    paddingVertical: heightPixel(4),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  reservation: {
    marginRight: 16,
    marginBottom: 12,
    paddingTop: 12,
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
    fontSize: Sizing.text.body[12]
  },
  carTypeText: {
    fontSize: Sizing.text.body[16],
    fontWeight: 'bold',
  },
  carTextContainer: {
    marginLeft: 20,
    marginTop: 20,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: widthPixel(16),
    marginBottom: heightPixel(8),
  },
  column: {
    flex: 1,
  },
  attributeHeader: {
    fontSize: fontPixel(Sizing.text.body[11]),
    color: Color.gray.secondary,
  }
})
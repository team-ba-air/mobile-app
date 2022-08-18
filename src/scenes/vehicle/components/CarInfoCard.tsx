import { SCREENS } from 'navigations/constants'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Card, Image } from 'react-native-elements'
import { Color } from 'styles/colors'
import { fontPixel, heightPixel, Sizing, widthPixel } from 'styles/sizes'
import { getFormatDate } from 'utils/DateUtil'
import { isOnlySpace } from 'utils/TextUtils'
import { VehicleItem } from '../constants'

interface CarInfoCardProps {
  car?: VehicleItem,
  navigation: any
  showSnackbar?: () => void
  showModal?: () => void
  isOpen: boolean
  setIsOpen: (status: boolean) => void
}

const CarInfoCard: React.FC<CarInfoCardProps> = ({ car, navigation, showSnackbar, showModal, isOpen, setIsOpen }) => {
  // const [isOpen, setIsOpen] = useState<boolean>(false)

  const deleteVehicle = () => {
    showModal?.()
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
          {/* <Text style={styles.carPlatText}>{car?.plat}</Text> */}
        </View>
        <Card.Image 
          containerStyle={styles.imageCar} 
          // style={{
          //   width: '80%'
          // }}
          resizeMode={'contain'}
          source={{
            uri: car?.imageUrl,
          }} 
        />
      </View>
      {isOpen && (
        <View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.attributeHeader}>Tahun Produksi</Text>
              <Text>{car?.year}</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.attributeHeader}>VIN</Text>
              <Text>{isOnlySpace(car?.vin ?? '') ? '-' : car?.vin}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.attributeHeader}>Nomor Polisi</Text>
              <Text>{car?.plat}</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.attributeHeader}>Kedaluarsa STNK</Text>
              <Text>{car?.expiredDate ? getFormatDate(car?.expiredDate) : '-'}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.attributeHeader}>Terakhir Servis</Text>
              <Text>{car?.lastService ? getFormatDate(new Date(car?.lastService)) : '-'}</Text>
            </View>
          </View>

          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <TouchableOpacity onPress={deleteVehicle}>
              <Text style={{ 
                fontSize: fontPixel(Sizing.text.body[12]), 
                fontWeight: 'bold',
                color: Color.red[7],
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
    zIndex: 20,
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
    height: '100%',
    width: '60%',
    marginBottom: 8,
    borderBottomLeftRadius: 8,
  },
  carPlatText: {
    fontSize: fontPixel(12),
    fontWeight: 'bold',
  },
  carTypeText: {
    fontSize: fontPixel(24),
    fontWeight: 'bold',
  },
  carTextContainer: {
    marginLeft: widthPixel(20),
    marginTop: heightPixel(20),
    maxWidth: '35%',
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
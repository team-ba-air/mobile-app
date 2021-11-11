import { SCREENS } from 'navigations/constants'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Card, Icon, Image } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Color } from 'styles/colors'
import { Sizing } from 'styles/sizes'

interface CarServiceReservationProps {
  navigation: any
}
 
const CarServiceReservation: React.FC<CarServiceReservationProps> = ({ navigation }) => {
  const goToReservation = () => {
    console.log('Go To Reservation')
    navigation.navigate(SCREENS.reservation.serviceReservation)
  }
  return ( 
    <>
    <View style={styles.containerCard}>
      <Card containerStyle={styles.card}>
        <View style={styles.carInfo}>
          <View style={styles.carTextContainer}>
            <Text style={styles.carPlatText}>Toyota</Text>
            <Text style={styles.carTypeText}>Yaris</Text>
            <Text style={styles.carPlatText}>B 2000 S</Text>
          </View>
          <Card.Image containerStyle={styles.imageCar} source={require('@assets/car_placeholder.png')} />
        </View>
        <View style={styles.action}>
          <Button buttonStyle={styles.detail} onPress={goToReservation} title='Servis' type='solid' />
          <Button buttonStyle={styles.reservation} onPress={goToReservation} title='Lihat detail' type='clear' />
        </View>
      </Card>
      <View style={{ width: '100%', height: '100%', position: 'absolute', top: 0 }}>
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    marginLeft: 16,
    marginBottom: 16,
    paddingVertical: 0,
    paddingLeft: 32,
    paddingRight: 32,
    backgroundColor: Color.blue[8],
    borderRadius: 12,
    flex: 1,
  },
  detailText: { 
    color: Color.blue[1], 
    fontSize: Sizing.text.body[14],
    fontWeight: 'bold',
    alignSelf: 'center',
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
})
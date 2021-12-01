import AppContainer from 'components/AppContainer';
import Dropdown from 'components/Dropdown';
import { SCREENS } from 'navigations/constants';
import React, { useState } from 'react'
import { ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';
import { ServiceItem } from './constants';

interface ServiceReservationProps {
  navigation: any
}

const serviceList: ServiceItem[] = [
  {
    img: 'servis_logbook.png',
    value: 'logbook',
    label: 'Servis Logbook'
  },
  {
    img: 'servis_dasar.png',
    value: 'basic',
    label: 'Servis dasar'
  },
  {
    img: 'servis_ac',
    value: 'AC',
    label: 'Servis AC'
  },
  {
    img: '',
    value: 'clutch',
    label: 'Servis Clutch'
  },
  {
    img: '',
    value: 'oil',
    label: 'Servis oli'
  },
]

const carOptions = [
  {
    data: {
      type: 'Yaris',
      plat: 'B 2012 S',
    },
    value: 'Yaris|B 2012 S',
  }
]

const ServiceReservation: React.FC<ServiceReservationProps> = ({ navigation }) => {
  const [car, setCar] = useState<string>('Yaris|B 2012 S')
  return ( 
    <AppContainer style={{ paddingHorizontal: 0, paddingTop: 0 }}>
      <View style={{ backgroundColor: Color.blue[8], paddingHorizontal: 20, paddingBottom: 16 }}>
        <Dropdown 
          value={car} 
          options={carOptions}
          onSelect={setCar} 
          renderItem={(option: any) => (
            <View>
              <Text>{option.type} {option.plat}</Text>
            </View>
          )} 
          renderSelected={(option: any) => (
            <View>
              <Text style={{ fontSize: Sizing.text.body[12], color: Color.gray[6] }}>Buat mobil</Text>
              <Text style={{ fontSize: Sizing.text.body[14], fontWeight: 'bold' }}>{option.type} {option.plat}</Text>
            </View>
          )}          
        />
      </View>
      <FlatList
        data={serviceList}
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={styles.container}
        renderItem={(item: ListRenderItemInfo<ServiceItem>) => (
          <TouchableWithoutFeedback containerStyle={styles.cardContainer} onPress={() => navigation.navigate(SCREENS.reservation.bengkelReservation, { service: item.item })}>
            <Card containerStyle={styles.card}>
              <Card.Image containerStyle={styles.image} source={require(`@assets/servis_dasar.png`)} resizeMode={'contain'} />
              <View style={styles.label}>
                <Text style={styles.text}>{item.item.label}</Text>
              </View>
            </Card>
          </TouchableWithoutFeedback>
        )}
      />
    </AppContainer>
  );
}
 
export default ServiceReservation;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  cardContainer: {
    flex: 0.5,
  },
  card: {
    padding: 0,
    borderRadius: 8,
    borderWidth: 2,
    resizeMode: 'cover',
  },
  label: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  text: {
    fontSize: Sizing.text.body[14],
    textAlign: 'center',
  }
})
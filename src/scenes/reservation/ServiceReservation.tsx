import AppContainer from 'components/AppContainer';
import Dropdown from 'components/Dropdown';
import { SCREENS } from 'navigations/constants';
import { PublicAPIResponse } from 'network/types';
import React, { useState } from 'react'
import { ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useQuery } from 'react-query';
import { Color } from 'styles/colors';
import { heightPixel, Sizing, widthPixel } from 'styles/sizes';
import { ServiceItem } from './constants';
import getServicesList from './service/getServicesList';

interface ServiceReservationProps {
  navigation: any
}

const serviceList: ServiceItem[] = [
  {
    image: 'servis_logbook.png',
    description: 'logbook',
    name: 'Servis Logbook',
    id: '1',
  },
  {
    image: 'servis_dasar.png',
    description: 'basic',
    name: 'Servis dasar',
    id: '2',
  },
  {
    image: 'servis_ac',
    description: 'AC',
    name: 'Servis AC',
    id: '3',
  },
  {
    image: '',
    description: 'clutch',
    name: 'Servis Clutch',
    id: '4',
  },
  {
    image: '',
    description: 'oil',
    name: 'Servis oli',
    id: '5',
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
  const {
    data: servicesListResponse,
  } = useQuery<PublicAPIResponse<any>>(
    ['getServicesList'],
    () => getServicesList(),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  console.log(servicesListResponse)
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
        data={servicesListResponse?.body ?? []}
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={styles.container}
        renderItem={(item: ListRenderItemInfo<ServiceItem>) => (
          <TouchableWithoutFeedback containerStyle={styles.cardContainer} onPress={() => navigation.navigate(SCREENS.app.maps, { service: item.item })}>
            <Card containerStyle={styles.card}>
              <Card.Image containerStyle={styles.image} source={require(`@assets/servis_dasar.png`)} resizeMode={'contain'} />
              <View style={styles.label}>
                <Text style={styles.text}>{item.item.name}</Text>
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
  },
  label: {
    paddingVertical: heightPixel(8),
    paddingHorizontal: widthPixel(16),
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    height: heightPixel(64),
    width: widthPixel(64),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  text: {
    fontSize: Sizing.text.body[14],
    textAlign: 'center',
  }
})
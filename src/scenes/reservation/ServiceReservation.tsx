import AppContainer from 'components/AppContainer';
import React from 'react'
import { ListRenderItemInfo, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { ServiceItem } from './constants';

interface ServiceReservationProps {
  
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

const ServiceReservation: React.FC<ServiceReservationProps> = () => {
  return ( 
    <AppContainer>
      <View>
        <Text>Buat mobil</Text>
        <Text>Yaris B 2000 S</Text>
      </View>
      <FlatList
        data={serviceList}
        renderItem={(item: ListRenderItemInfo<ServiceItem>) => (
          <Card>
            <Card.Image source={require(`@assets/servis_dasar.png`)} />
            <View>
              <Text>{item.item.label}</Text>
            </View>
          </Card>
        )}
      />
    </AppContainer>
  );
}
 
export default ServiceReservation;
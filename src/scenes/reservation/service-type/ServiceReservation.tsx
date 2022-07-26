import { Route } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import { OptionItem } from 'components/Dropdown';
import { SCREENS } from 'navigations/constants';
import { PublicAPIResponse } from 'network/types';
import React, { useEffect, useState } from 'react'
import { Image, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useQuery } from 'react-query';
import { VehicleItem } from 'scenes/vehicle/constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, Sizing, widthPixel } from 'styles/sizes';
import { ServiceItem } from '../constants';
import getServicesList from '../service/getServicesList';
import getVehicleList from '../service/getVehicleList';
import BottomSheetServiceType from './components/BottomSheetServiceType';
import CarSelectionComponent from './components/CarSelectionComponent';

interface ServiceReservationProps {
  navigation: any
  route: Route<any, ParamCar>
}

interface ParamCar {
  data: VehicleItem
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

const ServiceReservation: React.FC<ServiceReservationProps> = ({ navigation, route }) => {
  const [show, setShow] = useState<boolean>(false)
  const [infoService, setInfoService] = useState<ServiceItem>()
  const [car, setCar] = useState<string>('')

  const { data } = route.params

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

  const {
    data: vehicleListResponse,
  } = useQuery<PublicAPIResponse<OptionItem[]>>(
    ['getVehicleList-option'],
    () => getVehicleList(),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  const serviceList = servicesListResponse?.body ?? []
  const vehicleList = vehicleListResponse?.body ?? []

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" }})
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined })
  }, [navigation]);
  

  useEffect(() => {
    if (data) {
      if (vehicleList.length > 0) {
        const valueCar = `${data.id}|${data.brand}|${data.type}|${data.plat}`
        setCar(valueCar)
      }
    }
  }, [vehicleList])

  const handleClick = (item: ServiceItem) => {
    navigation.navigate(SCREENS.app.maps, { 
      data: {
        car: data,
        service: item,
      }
    })
  }

  return ( 
      <AppContainer style={{ paddingHorizontal: 0, paddingTop: 0 }} refreshDisable>
        <View style={{ ...StyleSheet.absoluteFillObject }}>
          
          <View style={{ paddingHorizontal: widthPixel(20), paddingVertical: heightPixel(16) }}>
            <CarSelectionComponent 
              value={car} 
              options={vehicleList}
              onSelect={setCar} 
              placeholder={'Pilih Mobil Anda'}
              headerComponent={(
                <View style={{ paddingHorizontal: widthPixel(16) }}>
                  <Text style={{ fontSize: fontPixel(16), fontWeight: 'bold' }}>Pilih Kendaraan</Text>
                </View>
              )}
              renderItem={(option: any) => (
                <View>
                  <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{option.brand} {option.type} {option.license_plate}</Text>
                </View>
              )}
              renderSelected={(option: any) => (
                <View>
                  <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{option?.brand} {option?.type} {option?.license_plate}</Text>
                </View>
              )}          
            />
          </View>
          <FlatList
            style={{ paddingHorizontal: widthPixel(20) }}
            data={serviceList}
            horizontal={false}
            numColumns={2}
            columnWrapperStyle={styles.container}
            keyExtractor={(item, idx) => String(idx)}
            renderItem={(item: ListRenderItemInfo<ServiceItem>) => (
              <View style={styles.cardContainer}>
                <View style={styles.card}>
                  <TouchableWithoutFeedback onPress={() => {
                    setInfoService(item.item)
                    setShow(true)
                  }}>
                    <Icon 
                      style={{
                        alignSelf: 'flex-end',
                        marginRight: widthPixel(4),
                        marginTop: heightPixel(4),
                      }}
                      type='material'
                      name='info'
                      color={Color.gray[4]}
                      size={widthPixel(16)} 
                      tvParallaxProperties={undefined}
                    />
                  </TouchableWithoutFeedback>
                  
                  <TouchableWithoutFeedback onPress={() => handleClick(item.item)}>
                    <Image 
                      style={styles.image} 
                      // source={require(`@assets/servis_example.png`)} 
                      source={{
                        uri: item.item.image,
                        width: heightPixel(64),
                        height: widthPixel(64),
                      }}
                      resizeMode={'contain'} 
                    />
                    <View style={styles.label}>
                      <Text style={styles.text}>{item.item.name}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            )}
          />
        </View>
        
        <BottomSheetServiceType visible={show} onChangeVisible={setShow} data={infoService} />
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
    flex: 0.45,
    marginBottom: heightPixel(16),
  },
  card: {
    padding: 0,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Color.gray[2],
    // marginHorizontal: widthPixel(8),
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
    alignSelf: 'center',
  },
  text: {
    fontSize: fontPixel(14),
    textAlign: 'center',
  }
})
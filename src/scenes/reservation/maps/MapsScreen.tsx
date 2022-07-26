import AppContainer from 'components/AppContainer';
import React, { useEffect, useRef, useState } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, MapEvent, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Icon } from 'react-native-elements';
import BottomSheetBengkelList from './components/BottomSheetBengkelList';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { fontPixel, heightPixel, SCREEN_WIDTH, widthPixel } from 'styles/sizes';
import { Color } from 'styles/colors';
import { NavigationProp, Route } from '@react-navigation/native';
import { BengkelItem, ServiceItem } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VehicleItem } from 'scenes/vehicle/constants';
import { openSettingsPermissionLocation, requestPermissionAndroid, requestPermissionIos } from 'utils/PermissionUtils';
import { Modal, Portal } from 'react-native-paper';
import ModalLocationUnavailable from './components/ModalLocationUnavailable';
import { SCREENS } from 'navigations/constants';
import { useQuery } from 'react-query';
import { PublicAPIResponse } from 'network/types';
import getShopList from '../service/getShopList';

interface MapsScreenProps {
  navigation: NavigationProp<any>
  route: Route<any, ParamService>
}

interface ParamService {
  data: {
    car: VehicleItem,
    service: ServiceItem,
  }
}

export type LocationPoint = {
  latitude: number
  longitude: number
}
 
const MapsScreen: React.FC<MapsScreenProps> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets()
  const { data } = route.params
  const map = useRef<MapView>(null)

  const [location, setLocation] = useState<LocationPoint | null>(null)
  const [deviceLocation, setDeviceLocation] = useState<LocationPoint>({
    latitude: -6.89474,
    longitude: 107.610476,
  })
  const [syncWithGps, setSyncWithGps] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestPermissionAndroid(handleGranted, handleDenied)
    } else {
      requestPermissionIos(handleGranted, handleDenied)
    }
  }, [])

  const handleGranted = () => {
    getLocation()
  }

  const handleDenied = () => {
    setModalVisible(true)
  }

  const getLocation = () => {
    if (Platform.OS === 'ios') {
      Geolocation.getCurrentPosition(
        (position) => {
          const dataRegion: Region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }
  
          map.current?.animateToRegion(dataRegion, 1500)
  
          setDeviceLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      Geolocation.watchPosition((position) => {
        const dataRegion: Region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }
      
        map.current?.animateToRegion(dataRegion, 1500)
  
        setDeviceLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      }, (error) => {
        console.log(error.code, error.message);
      }, 
      { enableHighAccuracy: true })
    }
    
  }

  const handlePressMap = (e: MapEvent) => {
    setSyncWithGps(false)
    setLocation({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    })
  }

  useEffect(() => {
    if (syncWithGps) {
      setLocation(deviceLocation)
    }
  }, [deviceLocation, syncWithGps])

  const handlePressGPS = () => {
    setSyncWithGps(true)
  }

  const {
    data: shopListResponse,
    isLoading: isFetchingVehicleList,
  } = useQuery<PublicAPIResponse<BengkelItem[]>>(
    ['getShopList', location],
    () => getShopList({ 
      lat: location?.latitude ?? 0, 
      long: location?.longitude ?? 0, 
      type: data.service.name, 
      typeCar: data.car.brand 
    }),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  const shopList = shopListResponse?.body ?? []

  const animatedPosition = useSharedValue(0)

  const animatedStyleAction = useAnimatedStyle(() => {
    return {
      display: 'flex',
      flexDirection: 'column-reverse',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      height: animatedPosition.value - (Platform.OS === 'android' ? 50 : 100),
      width: '10%',
    }
  })

  const onDismiss = () => {
    setModalVisible(false)
    if (Platform.OS === 'ios') {
      requestPermissionIos(() => {
        // do nothing
      }, navigateHome)
    } else {
      requestPermissionAndroid(() => {
        // do nothing
      }, navigateHome)
    }
  }

  const navigateHome = () => {
    navigation.navigate(SCREENS.app.home)
  }

  const markerShops = shopList.map((value, idx) => (
    <Marker 
      key={idx}
      coordinate={value.location}
      style={{ zIndex: 5 }}
      anchor={{
        x: 0.5,
        y: 0.5,
      }}
      tracksViewChanges={false}
      stopPropagation
    >
      <Icon size={28} color={Color.blue[8]} name='fiber-manual-record' type='material' tvParallaxProperties={undefined} />
      <Callout 
        style={{
          width: 80
        }}
        onPress={() => {
          navigation.navigate(SCREENS.reservation.bengkelFormReservation, { 
            data: {
              shop: value,
              car: data.car,
              service: data.service,
            }
          })
        }}
      >
        <View>
          <Text style={{ textAlign: 'center' }}>{value.name}</Text>
        </View>
      </Callout>
    </Marker>
  ))

  return ( 
    <AppContainer style={{ paddingHorizontal: 0, paddingTop: 0, alignItems: 'flex-end' }} refreshDisable>
      <Portal>
        <Modal visible={modalVisible} onDismiss={onDismiss}>
          <ModalLocationUnavailable
            onGrant={openSettingsPermissionLocation}
          />
        </Modal>
      </Portal>
      <MapView
        ref={map}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -6.89474,
          longitude: 107.610476,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handlePressMap}
      >
        {location && (
          <Marker 
            key='LOCATION'
            coordinate={location}
            style={{ zIndex: 7}}
          />
        )}

        <Marker 
          key='GPS'
          coordinate={deviceLocation}
          style={{ zIndex: 5 }}
          anchor={{
            x: 0.5,
            y: 0.5,
          }}
        >
          <Icon size={28} color={Color.blue[8]} name='gps-fixed' type='material' tvParallaxProperties={undefined} />
        </Marker>
        {markerShops}

      </MapView>
      
      <BottomSheetBengkelList 
        navigation={navigation} 
        animatedPosition={animatedPosition} 
        service={data.service}
        car={data.car} 
        location={location}
        isLoading={isFetchingVehicleList}
        shops={shopList}
      />
      <View style={[styles.containerActionNavigate, Platform.OS === 'ios' && ({
        paddingTop: insets.top,
      })]}>
        <Icon size={16} raised name={'arrow-back'} onPress={() => navigation.goBack()} tvParallaxProperties={undefined} />
      </View>
      <View>
        <Animated.View style={animatedStyleAction}>
          <Icon size={16} raised name={'gps-fixed'} onPress={handlePressGPS} tvParallaxProperties={undefined} />
          
          {location && (
            <Icon size={16} raised name={'location-off'} onPress={() => {
              setLocation(null)
              setSyncWithGps(false)
            }} tvParallaxProperties={undefined}/>
          )}
        </Animated.View>
      </View>
    </AppContainer>
  );
}
 
export default MapsScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  warning: { 
    backgroundColor: Color.red[5], 
    display: 'flex', 
    flexDirection: 'row',
    justifyContent: 'space-around', 
    width: SCREEN_WIDTH,
    paddingVertical: heightPixel(8),
    paddingHorizontal: widthPixel(8),
  },
  containerAction: { 
    display: 'flex', 
    flexDirection: 'column-reverse', 
    justifyContent: 'flex-end', 
    alignItems: 'flex-end',
    backgroundColor: 'blue',
  },
  containerActionNavigate: { 
    left: -SCREEN_WIDTH + widthPixel(50),
  }
 });
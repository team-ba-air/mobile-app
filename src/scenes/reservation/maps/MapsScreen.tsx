import AppContainer from 'components/AppContainer';
import React, { useEffect, useRef, useState } from 'react'
import { PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { MapEvent, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Icon } from 'react-native-elements';
import BottomSheetBengkelList from './components/BottomSheetBengkelList';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { fontPixel, heightPixel, SCREEN_WIDTH, widthPixel } from 'styles/sizes';
import { Color } from 'styles/colors';
import { NavigationProp, Route } from '@react-navigation/native';
import { ServiceItem } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VehicleItem } from 'scenes/vehicle/constants';

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

  useEffect(() => {
    if (Platform.OS === 'android') {
      handlePermissionAndroid()
    } else {
      Geolocation.requestAuthorization("whenInUse").then((value) => {
        console.log(`Value Request Authorization: ${value}`)
        if (value === 'granted') {
          getLocation()
        }
      })
    }
  }, [])

  const handlePermissionAndroid = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Otoku Location Permission",
        message:
          "Otoku needs access to your location " +
          "so you can choose service station based on your location.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }).then(permission => {
        if (permission === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation()
        } else {
          console.log("Location permission denied");
        }
      })
  }

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const dataRegion: Region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }
        
        console.log('UPDATE')
        if (Platform.OS === 'ios') {
          map.current?.animateToRegion(dataRegion, 0.1)
        }

        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  const handlePressMap = (e: MapEvent) => {
    setLocation({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    })
  }

  const handlePressGPS = () => {
    console.log('Get to GPS position')
  }

  const animatedPosition = useSharedValue(0)

  const animatedStyleAction = useAnimatedStyle(() => {
    return {
      display: 'flex',
      flexDirection: 'column-reverse',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      height: animatedPosition.value - 50,
      width: '10%',
      marginBottom: 40,
    }
  })

  return ( 
    <AppContainer style={{ paddingHorizontal: 0, paddingTop: 0, alignItems: 'flex-end' }} refreshDisable>
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
          />
        )}
      </MapView>
      
      <BottomSheetBengkelList 
        navigation={navigation} 
        animatedPosition={animatedPosition} 
        service={data.service}
        car={data.car} 
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
            <Icon size={16} raised name={'location-off'} onPress={() => setLocation(null)} tvParallaxProperties={undefined}/>
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
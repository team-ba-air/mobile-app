import AppContainer from 'components/AppContainer';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { PermissionsAndroid, StyleSheet, Text, View } from 'react-native';
import MapView, { MapEvent, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Icon } from 'react-native-elements';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import BottomSheetBengkelList from './components/BottomSheetBengkelList';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { fontPixel, heightPixel, SCREEN_HEIGHT, SCREEN_WIDTH, widthPixel } from 'styles/sizes';
import { Color } from 'styles/colors';
import { NavigationProp, Route } from '@react-navigation/native';
import { ServiceItem } from '../constants';

interface MapsScreenProps {
  navigation: NavigationProp<any>
  route: Route<any, ParamService>
}

interface ParamService {
  data: ServiceItem
}

export type LocationPoint = {
  latitude: number
  longitude: number
}
 
const MapsScreen: React.FC<MapsScreenProps> = ({ navigation, route }) => {
  const [region, setRegion] = useState<LocationPoint | null>(null)
  const [location, setLocation] = useState<LocationPoint | null>(null)
  const [showWarning, setShowWarning] = useState<boolean>(true)

  console.log(route.params)

  useEffect(() => {
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
  }, [])

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })

        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        console.log(position);
      },
      (error) => {
        // See error code charts in documentation.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  const handleRegionChange = (region: Region, details?: {
    isGesture: boolean;
  } | undefined) => {
    setRegion({
      latitude: region.latitude,
      longitude: region.longitude,
    })
  }

  const handlePressMap = (e: MapEvent) => {
    console.log(e.nativeEvent)
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
    }
  })

  return ( 
    <AppContainer style={{ paddingHorizontal: 0, paddingTop: 0, alignItems: 'flex-end' }} refreshDisable>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onRegionChangeComplete={handleRegionChange}
        region={{
          latitude: region?.latitude ?? 37.78825,
          longitude: region?.longitude ?? -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handlePressMap}
      >
        {location && (
          <Marker 
            coordinate={location}
          />
        )}
      </MapView>
      
      <BottomSheetBengkelList 
        navigation={navigation} 
        animatedPosition={animatedPosition} 
        service={{ img: '', value: '', label: 'Servis Dasar' }} 
      />
      <View style={styles.containerActionNavigate}>
        <Icon size={16} raised name={'arrow-back'} onPress={() => navigation.goBack()} tvParallaxProperties={undefined} />
      </View>
      <View>
        <Animated.View style={animatedStyleAction}>
          <View style={styles.warning}>
            <Text style={{ fontSize: fontPixel(12), color: 'white', paddingHorizontal: widthPixel(4) }}>Lokasi tidak terbaca. Silakan klik pada peta untuk memilih lokasi, atau nyalakan GPS.</Text>
            <Icon size={18} onPress={() => setShowWarning(false)} color={'white'} name={'close'} tvParallaxProperties={undefined}/>
          </View>
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
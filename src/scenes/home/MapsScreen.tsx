import AppContainer from 'components/AppContainer';
import React, { useEffect, useState } from 'react'
import { PermissionsAndroid, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

interface MapsScreenProps {
    
}

export type LocationPoint = {
  latitude: number
  longitude: number
}
 
const MapsScreen: React.FC<MapsScreenProps> = () => {
  const [location, setLocation] = useState<LocationPoint | null>(null)
  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }).then(permission => {
        if (permission === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation()
        } else {
          console.log("Camera permission denied");
        }
      })
  }, [])

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
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
  return ( 
    <AppContainer>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: location?.latitude ?? 37.78825,
          longitude: location?.longitude ?? -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {location && (
          <Marker 
            coordinate={location}
          />
        )}
      </MapView>
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
 });
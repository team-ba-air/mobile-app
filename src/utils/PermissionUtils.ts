import { Linking, PermissionsAndroid, Platform } from "react-native";
import Geolocation from 'react-native-geolocation-service';

const requestPermissionAndroid = (onGranted?: () => void, onDenied?: () => void) => {
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
      onGranted?.()
    } else {
      console.log("Location permission denied");
      onDenied?.()
    }
  })
}

const requestPermissionIos = (onGranted?: () => void, onDenied?: () => void) => {
  Geolocation.requestAuthorization("whenInUse").then((value) => {
    console.log(`Value Request Authorization: ${value}`)
    if (value === 'granted') {
      onGranted?.()
    } else {
      console.log('NOT GRANTED IOS')
      onDenied?.()
    }
  })
}

const openSettingsPermissionLocation = () => {
  if (Platform.OS === 'ios') {
    Linking.openURL('App-Prefs:Privacy&path=LOCATION')
  } else {
    Linking.openSettings()
  }
}

export { requestPermissionAndroid, requestPermissionIos, openSettingsPermissionLocation }
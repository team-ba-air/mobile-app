import { NavigationProp } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import React, { useEffect, useState } from 'react';
import { Platform, SectionList, View } from 'react-native';
import { Color } from 'styles/colors';
import CarServiceReservation from './components/CarServiceReservation';
import InfoLocation from './components/InfoLocation';
import OngoingReservationSection from './components/OngoingReservationSection';
import PopularService from './components/PopularService';
import ReminderServiceComponent from './components/ReminderServiceComponent';
import ServiceList from './components/ServiceList';
import TipsTrick from './components/TipsTrick';

import Geolocation from 'react-native-geolocation-service';
import { openSettingsPermissionLocation, requestPermissionAndroid, requestPermissionIos } from 'utils/PermissionUtils';
import { Modal, Portal } from 'react-native-paper';
import ModalLocationUnavailable from './components/ModalLocationUnavailable';

interface HomeScreenProps {
  navigation: NavigationProp<any>
}

const DATA = [
  {
    title: '',
    data: ['popularService'],
  }, 
  {
    title: '',
    data: ['tipsAndTrick'],
  }
]

interface LocationType {
  lat: number
  lng: number
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [location, setLocation] = useState<LocationType | null>(null)
  const [modalVisible, setModalVisible] = useState(false)

  const renderBasedOnContent = (item: string) => {
    if (item === 'tipsAndTrick') {
      return <TipsTrick />
    } else if(item === 'popularService') {
      return <PopularService />
    }
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestPermissionAndroid(handleGranted, handleDenied)
    } else {
      requestPermissionIos(handleGranted, handleDenied)
    }
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      Geolocation.stopObserving()
    })
  
    return unsubscribe
  }, [navigation])
  

  const handleGranted = () => {
    getLocation()
  }

  const handleDenied = () => {
    setModalVisible(true)
  }

  const onDismiss = () => {
    setModalVisible(false)
  }

  const getLocation = () => {
    if (Platform.OS === 'ios') {
      Geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      Geolocation.watchPosition((position) => {
        console.log(position)
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      }, (error) => {
        console.log(error.code, error.message);
      }, 
      { enableHighAccuracy: true })
    }
    
  }

  const handleRefresh = () => {
    getLocation()
  }

  return (
    <AppContainer 
      style={{
        display: 'flex',
        padding: 0,
      }}
      safeAreaBackground={Color.blue[8]}
      onRefresh={handleRefresh}
    >
      <Portal>
        <Modal visible={modalVisible} onDismiss={onDismiss}>
          <ModalLocationUnavailable
            onGrant={openSettingsPermissionLocation}
          />
        </Modal>
      </Portal>
      <SectionList 
        sections={DATA}
        ListHeaderComponent={
          <>
            <InfoLocation navigation={navigation} location={location} />
            <CarServiceReservation navigation={navigation} />
            <ReminderServiceComponent />
            <ServiceList navigation={navigation} />
            <OngoingReservationSection navigation={navigation} />
          </>
        }
        renderItem={({ item }) => <View>{renderBasedOnContent(item)}</View>}
      />
        
    </AppContainer>
  );
};

export default HomeScreen;


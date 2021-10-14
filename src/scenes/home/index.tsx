import AppContainer from 'components/AppContainer';
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text } from 'react-native';
import CarServiceReservation from './components/CarServiceReservation';
import PopularService from './components/PopularService';
import TipsTrick from './components/TipsTrick';

interface HomeScreenProps {
  navigation: any
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return <AppContainer style={styles.container}>
    <CarServiceReservation navigation={navigation} />
    <PopularService />
    <TipsTrick />
  </AppContainer>;
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 0,
  }
})

import AppContainer from 'components/AppContainer';
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CarServiceReservation from './components/CarServiceReservation';
import PopularService from './components/PopularService';
import TipsTrick from './components/TipsTrick';

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  // useEffect(() => {
  //   StatusBar.setHidden(true, 'fade')
  // }, [])
  return <AppContainer style={styles.container}>
    <CarServiceReservation />
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

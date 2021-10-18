import AppContainer from 'components/AppContainer';
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CarServiceReservation from './components/CarServiceReservation';
import InfoLocation from './components/InfoLocation';
import PopularService from './components/PopularService';
import TipsTrick from './components/TipsTrick';

interface HomeScreenProps {
  navigation: any
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return <AppContainer style={styles.container}>
    <ScrollView>
      <InfoLocation />
      <CarServiceReservation navigation={navigation} />
      <PopularService />
      <TipsTrick />
    </ScrollView>
  </AppContainer>;
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 0,
  }
})

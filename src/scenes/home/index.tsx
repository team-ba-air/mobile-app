import AppContainer from 'components/AppContainer';
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Color } from 'styles/colors';
import CarServiceReservation from './components/CarServiceReservation';
import InfoLocation from './components/InfoLocation';
import OngoingReservationSection from './components/OngoingReservationSection';
import PopularService from './components/PopularService';
import TipsTrick from './components/TipsTrick';

interface HomeScreenProps {
  navigation: any
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return <AppContainer style={styles.container}>
    <StatusBar backgroundColor={Color.blue[8]} />
    <ScrollView>
      <InfoLocation />
      <CarServiceReservation navigation={navigation} />
      <OngoingReservationSection />
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

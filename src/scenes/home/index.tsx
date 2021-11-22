import AppContainer from 'components/AppContainer';
import React, { useEffect } from 'react';
import { SectionList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Color } from 'styles/colors';
import CarServiceReservation from './components/CarServiceReservation';
import InfoLocation from './components/InfoLocation';
import OngoingReservationSection from './components/OngoingReservationSection';
import PopularService from './components/PopularService';
import ServiceList from './components/ServiceList';
import TipsTrick from './components/TipsTrick';

interface HomeScreenProps {
  navigation: any
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

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const renderBasedOnContent = (item: string) => {
    if (item === 'tipsAndTrick') {
      return <TipsTrick />
    } else {
      return <PopularService />
    }
      
  }
  return <AppContainer style={styles.container}>
    <StatusBar backgroundColor={Color.blue[8]} />
    <SectionList 
      sections={DATA}
      ListHeaderComponent={
        <>
        <InfoLocation />
      <CarServiceReservation navigation={navigation} />
      <ServiceList />
      <OngoingReservationSection />
        </>
      }
      renderItem={({ item }) => <View>{renderBasedOnContent(item)}</View>}
    />
      
      {/* <PopularService />
      <TipsTrick /> */}
  </AppContainer>;
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 0,
  }
})

import { NavigationProp } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import React, { useEffect } from 'react';
import { SectionList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Color } from 'styles/colors';
import CarServiceReservation from './components/CarServiceReservation';
import InfoLocation from './components/InfoLocation';
import OngoingReservationSection from './components/OngoingReservationSection';
import PopularService from './components/PopularService';
import ServiceList from './components/ServiceList';
import TipsTrick from './components/TipsTrick';

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

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const renderBasedOnContent = (item: string) => {
    if (item === 'tipsAndTrick') {
      return <TipsTrick />
    } else if(item === 'popularService') {
      return <PopularService />
    }
  }

  return <AppContainer style={styles.container}>
    <StatusBar backgroundColor={Color.blue[8]} />
    <SectionList 
      sections={DATA}
      ListHeaderComponent={
        <>
          <InfoLocation navigation={navigation}/>
          <CarServiceReservation navigation={navigation} />
          <ServiceList />
          <OngoingReservationSection navigation={navigation} />
        </>
      }
      renderItem={({ item }) => <View>{renderBasedOnContent(item)}</View>}
    />
      
  </AppContainer>;
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 0,
  }
})

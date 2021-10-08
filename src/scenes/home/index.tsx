import AppContainer from 'components/AppContainer';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  return <AppContainer style={styles.container}>
    <Text>Welcome to Home</Text>
  </AppContainer>;
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  }
})

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import {SafeAreaView} from 'react-navigation';

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  return <SafeAreaView style={styles.container}>
    <Text>Welcome to Home</Text>
  </SafeAreaView>;
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  }
})

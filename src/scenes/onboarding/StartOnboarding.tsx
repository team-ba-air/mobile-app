import React from 'react'
import { Button, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface StartOnboardingProps {
  navigation: any
}
 
const StartOnboarding: React.FC<StartOnboardingProps> = ({ navigation }) => {
  return ( 
    <SafeAreaView style={styles.container}>
      <Button onPress={() => navigation.navigate('EmailOnboarding')} title={'Mulai'} />
    </SafeAreaView>
  )
}
 
export default StartOnboarding

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 16,
  }
})

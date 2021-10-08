import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import { useGet } from 'network/_common';
import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

interface StartOnboardingProps {
  navigation: any
}

const StartOnboarding: React.FC<StartOnboardingProps> = ({ navigation }) => {
  return ( 
    <AppContainer style={styles.container}>
      <CustomButton type='primary' onPress={() => navigation.navigate(SCREENS.onboarding.email)} title={'Mulai'} />
    </AppContainer>
  )
}
 
export default StartOnboarding

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
})

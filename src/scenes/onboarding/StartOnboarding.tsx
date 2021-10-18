import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React from 'react'
import { StyleSheet } from 'react-native';

interface StartOnboardingProps {
  navigation: any
}

const StartOnboarding: React.FC<StartOnboardingProps> = ({ navigation }) => {
  return ( 
    <AppContainer style={styles.container}>
      <CustomButton type='secondary' onPress={() => navigation.navigate(SCREENS.app.mainApp)} title={'Home'} />
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

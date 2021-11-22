import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';

interface StartOnboardingProps {
  navigation: any
}

const StartOnboarding: React.FC<StartOnboardingProps> = ({ navigation }) => {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: [],
      webClientId: '75808358640-7phfh1dhh5eqtnvt84vebs41m87cp660.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      loginHint: '',
      forceConsentPrompt: true,
    })
  }, [])

  return (
    <AppContainer style={styles.container}>
      <CustomButton type='secondary' onPress={() => navigation.navigate(SCREENS.app.home)} title={'Home'} />
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

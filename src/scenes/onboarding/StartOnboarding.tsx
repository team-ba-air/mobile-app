import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import { GoogleSignin } from 'react-native-google-signin';
import { heightPixel, widthPixel } from 'styles/sizes';

interface StartOnboardingProps {
  navigation: any
}

const StartOnboarding: React.FC<StartOnboardingProps> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(SCREENS.onboarding.email)
    }, 3000)
  }, [])

  return (
    <AppContainer style={styles.container}>
      <Image 
        style={{ height: heightPixel(64), width: widthPixel(244)}}
        source={require('@assets/logo_header.png')} 
        resizeMode={'contain'} 
      />
      {/* <CustomButton type='primary' onPress={() => navigation.navigate(SCREENS.onboarding.email)} title={'Mulai'} /> */}
    </AppContainer>
  )
}
 
export default StartOnboarding

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

import AppContainer from 'components/AppContainer';
import { SCREENS } from 'navigations/constants';
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import { heightPixel, widthPixel } from 'styles/sizes';

interface SplashScreenProps {
  navigation: any
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(SCREENS.welcome.welcomeScreen)
    }, 3000)
  }, [])

  return (
    <AppContainer style={styles.container}>
      <Image 
        style={{ height: heightPixel(64), width: widthPixel(244)}}
        source={require('@assets/logo_header.png')} 
        resizeMode={'contain'} 
      />
    </AppContainer>
  )
}
 
export default SplashScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

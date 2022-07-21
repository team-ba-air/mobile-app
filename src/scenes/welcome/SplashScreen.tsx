import AppContainer from 'components/AppContainer';
import { SCREENS } from 'navigations/constants';
import React, { useEffect } from 'react'
import { StyleSheet, ToastAndroid } from 'react-native';
import { Image } from 'react-native-elements';
import { heightPixel, widthPixel } from 'styles/sizes';
import { getAccessToken } from 'utils/StorageUtils';

interface SplashScreenProps {
  navigation: any
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      getAccessToken().then(token => {
        if (token) {
          navigation.navigate(SCREENS.app.homeMenu)
        } else {
          navigation.navigate(SCREENS.welcome.welcomeScreen)
        }
      }).catch((error) => {
        console.log(error)
        navigation.navigate(SCREENS.welcome.welcomeScreen)
      })

      // Debug purpose
      // navigation.navigate(SCREENS.app.home)
    }, 3000)
  }, [])

  return (
    <AppContainer style={styles.container} refreshDisable>
      <Image 
        style={{ height: heightPixel(64), width: widthPixel(244)}}
        source={require('@assets/icon/ic_logo_text.webp')} 
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

import AppContainer from 'components/AppContainer'
import CustomButton from 'components/CustomButton'
import React from 'react'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import CarouselComponent from './components/CarouselComponent'

interface WelcomeScreenProps {
  
}
 
const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      console.log(userInfo)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (  
    <AppContainer style={{paddingHorizontal: 0}}>
      <CarouselComponent />
      <GoogleSigninButton onPress={signIn} size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} />
      <CustomButton type='primary' title='Login dengan email' />
    </AppContainer>
  )
}
 
export default WelcomeScreen

import AppContainer from 'components/AppContainer'
import CustomButton from 'components/CustomButton'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Icon, Image } from 'react-native-elements'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import { Color } from 'styles/colors'
import { heightPixel, widthPixel } from 'styles/sizes'
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
    <AppContainer style={{ paddingHorizontal: 0 }}>
      <CarouselComponent />
      <CustomButton 
        style={[{ marginHorizontal: 20, marginVertical: 8 }, styles.buttonGoogle]}
        buttonStyle={{ backgroundColor: 'white' }}
        textStyle={{ color: 'black' }}
        icon={<Image source={require('@assets/icon/ic_google.webp')} style={{ width: widthPixel(20), height: heightPixel(20) }} />} 
        type='primary' 
        onPress={signIn}
        title='Lanjut dengan Google' 
      />
      <CustomButton 
        style={{ paddingHorizontal: 20, marginVertical: 8 }}
        icon={<Icon type='font-awesome' size={24} name={'facebook'} color='white' />} 
        type='primary' 
        title='Lanjut dengan Facebook' 
      />
      <CustomButton 
        style={{ paddingHorizontal: 20, marginVertical: 8 }}
        buttonStyle={{ backgroundColor: Color.red[6]}}
        icon={<Icon type='font-awesome' size={20} name={'envelope'} color='white' />} 
        type='primary' 
        title='Lanjut dengan email' 
      />
    </AppContainer>
  )
}
 
export default WelcomeScreen

const styles = StyleSheet.create({
  buttonGoogle: {
    borderColor: Color.gray.secondary, 
    borderWidth: 1, 
    borderStyle: 'solid', 
    borderRadius: 4,
  }
})

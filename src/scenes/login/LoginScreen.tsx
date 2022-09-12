import AppContainer from 'components/AppContainer'
import CustomButton from 'components/CustomButton'
import React from 'react'
import { Platform, StyleSheet, ToastAndroid, Alert } from 'react-native'
import { Icon, Image } from 'react-native-elements'
import { Color } from 'styles/colors'
import { heightPixel, widthPixel } from 'styles/sizes'
import CarouselComponent from './components/CarouselComponent'
import authenticateSSOGoogle from './service/authenticateSSOGoogle'
import { useMutation } from 'react-query'
import { SCREENS } from 'navigations/constants'
import { GraphRequest, GraphRequestManager, AccessToken, LoginButton, LoginManager } from 'react-native-fbsdk'
import authenticateSSOFacebook from './service/authenticateSSOFacebook'
import { saveAccessToken, saveEmail, saveName, savePhoneNumber, savePhoto } from 'utils/StorageUtils'
import { GoogleSignin, User } from '@react-native-google-signin/google-signin'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LoginResponse, PublicAPIResponse } from 'network/types'
import { NavigationProp } from '@react-navigation/native'

interface LoginScreenProps {
  navigation: NavigationProp<any>
}
 
const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      saveInfo(userInfo)
      
      onAuthenticate({
        token: userInfo.idToken ?? '',
      }).catch(err => {
        // navigation.navigate(SCREENS.app.homeMenu)
        if (Platform.OS === 'android') {
          ToastAndroid.show('Error', ToastAndroid.SHORT)
        } else {
          Alert.alert('Error')
        }
        console.log(err)
      })
    } catch (error: any) {
      console.log(error)
    }
  }
  
  const saveInfo = (userInfo: User) => {
    saveName(userInfo.user.name ?? '')
    saveEmail(userInfo.user.email ?? '')
    savePhoto(userInfo.user.photo ?? '')
  }

  const signInWithFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile'])
      .then(result => {
        if (result.isCancelled) {
          console.log('login is cancelled')
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data?.accessToken.toString()
            onAuthenticateFacebook({
              token: accessToken ?? '',
            }).catch(err => {
              console.log(err)
            })
            getInformationFromAccessToken(accessToken)
          })
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const getInformationFromAccessToken = (accessToken: any) => {
    const parameters = {
      fields: {
        string: 'id, first_name',
      },
    };
    const myProfileRequest = new GraphRequest(
      '/me',
      {accessToken, parameters: parameters},
      (error, myProfileInfoResult) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
        // this.setState({myInformation: myProfileInfoResult});
          console.log('result:', myProfileInfoResult);
        }
      },
    );
    new GraphRequestManager().addRequest(myProfileRequest).start();
  };

  const handleLogin = (data: PublicAPIResponse<LoginResponse>) => {
    saveAccessToken(data.body?.access_token ?? '')
    savePhoneNumber(data.body?.phone_number ?? '')
    navigation.navigate(SCREENS.app.mainApp)
  }

  const { isLoading: isAuthenticating, mutateAsync: onAuthenticate } = useMutation(authenticateSSOGoogle, {
    onSuccess: (data) => {
      saveAccessToken(data.body?.access_token ?? '')
      savePhoneNumber(data.body?.phone_number ?? '')
      navigation.navigate(SCREENS.app.mainApp)
    },
  })

  const { isLoading: isAuthenticatingFacebook, mutateAsync: onAuthenticateFacebook } = useMutation(authenticateSSOFacebook, {
    onSuccess: handleLogin,
  })

  return (
    <AppContainer 
      style={[{ 
        paddingHorizontal: 0, 
      }, Platform.OS === 'ios' && ({
        paddingBottom: insets.bottom,
      })]} 
      refreshDisable>
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
        onPress={signInWithFacebook}
        icon={<Icon type='font-awesome' size={24} name={'facebook'} color='white' tvParallaxProperties={undefined} />} 
        type='primary'
        title='Lanjut dengan Facebook' 
      />
      {/* <CustomButton 
        style={{ paddingHorizontal: 20, marginVertical: 8 }}
        buttonStyle={{ backgroundColor: Color.red[6]}}
        icon={<Icon type='font-awesome' size={20} name={'envelope'} color='white' tvParallaxProperties={undefined} />} 
        type='primary' 
        title='Lanjut dengan email' 
        onPress={() => navigation.navigate(SCREENS.onboarding.email)}
      /> */}
    </AppContainer>
  )
}
 
export default LoginScreen

const styles = StyleSheet.create({
  buttonGoogle: {
    borderColor: Color.gray.secondary, 
    borderWidth: 1, 
    borderStyle: 'solid', 
    borderRadius: 4,
  }
})
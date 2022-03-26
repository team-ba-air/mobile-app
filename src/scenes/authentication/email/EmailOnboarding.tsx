import CustomButton from 'components/CustomButton'
import CustomTextInput from 'components/CustomTextInput'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Sizing } from 'styles/sizes'
import AppContainer from 'components/AppContainer'
import { SCREENS } from 'navigations/constants'
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin'
import { useAuthorization } from 'context/hooks/authorization'
import { useMutation } from 'react-query'
import checkEmail from '../service/checkEmail'
import { PublicAPIResponse } from 'network/types'

interface EmailOnboardingProps {
  navigation: any
}

const EmailOnboarding: React.FC<EmailOnboardingProps> = ({ navigation }) => {
  const { isLoading: isAuthenticating, mutateAsync: onCheckEmail } = useMutation(checkEmail, {
    onSuccess: (data: PublicAPIResponse<any>) => {
      console.log(data)
      if (data.data.exist) {
        navigation.navigate(SCREENS.onboarding.otpEmail)
      } else {
        navigation.replace(SCREENS.onboarding.phone)
      } 
    },
  })

  const [email, setEmail] = useState<string>('')

  const onButtonPress = () => {
    // onCheckEmail({ email })
    navigation.navigate(SCREENS.onboarding.otpEmail)
  }

  return ( 
    <AppContainer style={styles.container}>
      <View>
        <Text style={styles.title}>Hai !</Text>
        <Text style={styles.title}>Selamat datang di OTOKU</Text>
        <CustomTextInput size={Sizing.text.body[16]} style={styles.input} placeholder={'Email Anda'} onChange={setEmail} value={email} />
      </View>

      <CustomButton style={styles.button} onPress={onButtonPress} title={'Lanjut'} />
    </AppContainer>
  )
}
 
export default EmailOnboarding

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: Sizing.text.heading[24],
  },
  input: {
    marginTop: 24,
  },
  button: {
    marginTop: 16,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})
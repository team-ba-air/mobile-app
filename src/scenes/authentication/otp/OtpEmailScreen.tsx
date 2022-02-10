import AppContainer from 'components/AppContainer'
import CustomButton from 'components/CustomButton'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import { useMutation } from 'react-query'
import { Sizing } from 'styles/sizes'
import otpEmail from '../service/otpEmail'
import InputOtpComponent from './components/InputOtpComponent'

interface OtpEmailScreenProps {
  
}
 
const OtpEmailScreen: React.FC<OtpEmailScreenProps> = () => {
  const email = 'oto@gmail.com'
  const [value, setValue] = useState('')

  const { isLoading: isSendingOtp, mutateAsync: onSendOtp } = useMutation(otpEmail, {
    onSuccess: (data) => {
      console.log(data)
      // navigation.navigate(SCREENS.app.home)
    },
  })

  useEffect(() => {
    sendOtp()
  }, [])

  const handlePress = () => {

  }

  const sendOtp = () => {
    onSendOtp({ email })
  }

  return ( 
    <AppContainer style={styles.container}>
      <View>
        <Text style={styles.title}>Verifikasi Email</Text>
        <Text>Masukan kode OTP yang kami kirim ke email {email}</Text>
        <InputOtpComponent 
          value={value}
          setValue={setValue}
          resend={sendOtp}
        />
      </View>
      <CustomButton style={styles.button} onPress={handlePress} title={'Lanjut'} />
    </AppContainer>
  )
}
 
export default OtpEmailScreen

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: Sizing.text.heading[24],
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  
})

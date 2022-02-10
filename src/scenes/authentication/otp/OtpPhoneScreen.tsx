import AppContainer from 'components/AppContainer'
import CustomButton from 'components/CustomButton'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import { useMutation } from 'react-query'
import { Sizing } from 'styles/sizes'
import otpPhone from '../service/otpPhone'
import InputOtpComponent from './components/InputOtpComponent'

interface OtpPhoneScreenProps {
  
}
 
const OtpPhoneScreen: React.FC<OtpPhoneScreenProps> = () => {
  const phoneNumber = '08123456789'
  const [value, setValue] = useState('')

  const { isLoading: isSendingOtp, mutateAsync: onSendOtp } = useMutation(otpPhone, {
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
    onSendOtp({ phone_number: phoneNumber })
  }

  return ( 
    <AppContainer style={styles.container}>
      <View>
        <Text style={styles.title}>Verifikasi Phone</Text>
        <Text>Masukan kode OTP yang kami kirim melalui SMS ke nomor telepon {phoneNumber}</Text>
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
 
export default OtpPhoneScreen

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

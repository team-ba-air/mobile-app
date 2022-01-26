import AppContainer from 'components/AppContainer'
import CustomButton from 'components/CustomButton'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import { Sizing } from 'styles/sizes'

interface OtpScreenProps {
  
}
 
const OtpScreen: React.FC<OtpScreenProps> = () => {
  const email = 'oto@gmail.com'

  const handlePress = () => {

  }

  return ( 
    <AppContainer style={styles.container}>
      <View>
        <Text style={styles.title}>Verifikasi Email</Text>
        <Text>Masukan kode OTP yang kami kirim ke email {email}</Text>
      </View>
      <CustomButton style={styles.button} onPress={handlePress} title={'Lanjut'} />
    </AppContainer>
  )
}
 
export default OtpScreen

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

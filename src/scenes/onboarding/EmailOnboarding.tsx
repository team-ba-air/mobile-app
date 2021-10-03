import CustomTextInput from 'components/CustomTextInput'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

interface EmailOnboardingProps {
  
}
 
const EmailOnboarding: React.FC<EmailOnboardingProps> = () => {
  const [email, setEmail] = useState<string>('')
  return ( 
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hai !</Text>
      <Text style={styles.title}>Selamat datang di OTOFIX</Text>

      <CustomTextInput style={styles.input} placeholder={'Email Anda'} onChange={setEmail} value={email} />
    </SafeAreaView>
   )
}
 
export default EmailOnboarding

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  input: {
    marginTop: 24,
  }
})

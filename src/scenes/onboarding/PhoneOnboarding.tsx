import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import CustomTextInput from 'components/CustomTextInput';
import { SCREENS } from 'navigations/constants';
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Sizing } from 'styles/sizes';

interface PhoneOnboardingProps {
  navigation: any
}
 
const PhoneOnboarding: React.FC<PhoneOnboardingProps> = ({ navigation }) => {
  const [phone, setPhone] = useState<string>('')

  return ( 
    <AppContainer style={styles.container}>
      <View>
        <Text style={styles.title}>Nomor Telepon Anda</Text>
        <CustomTextInput style={{ marginTop: 16 }} placeholder={'Nomor Telepon'} onChange={setPhone} value={phone} />
      </View>
      <CustomButton style={styles.button} onPress={() => navigation.replace(SCREENS.onboarding.name)} title={'Lanjut'} />
    </AppContainer>
   );
}
 
export default PhoneOnboarding;

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

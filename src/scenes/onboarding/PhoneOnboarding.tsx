import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import CustomTextInput from 'components/CustomTextInput';
import { SCREENS } from 'navigations/constants';
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';

interface PhoneOnboardingProps {
  navigation: any
}
 
const PhoneOnboarding: React.FC<PhoneOnboardingProps> = ({ navigation }) => {
  const [phone, setPhone] = useState<string>('')

  return ( 
    <AppContainer>
      <CustomTextInput placeholder={'Nomor Telepon'} onChange={setPhone} value={phone} />
      <CustomButton style={styles.button} onPress={() => navigation.replace(SCREENS.onboarding.name)} title={'Next'} />
    </AppContainer>
   );
}
 
export default PhoneOnboarding;

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
  }
})

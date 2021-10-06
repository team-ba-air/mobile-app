import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import CustomTextInput from 'components/CustomTextInput';
import { AuthorizationContext } from 'context/AuthorizationProvider';
import { SCREENS } from 'navigations/constants';
import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native';

interface NameOnboardingProps {
  navigation: any
}
 
const NameOnboarding: React.FC<NameOnboardingProps> = ({ navigation }) => {
  const [name, setName] = useState<string>('')
  const { setName: setUserName } = useContext(AuthorizationContext)

  const handlePress = () => {
    setUserName(name)
    navigation.replace(SCREENS.onboarding.welcomingCar)
  }

  return ( 
    <AppContainer>
      <CustomTextInput placeholder={'Nama Anda'} onChange={setName} value={name} />
      <CustomButton style={styles.button} onPress={handlePress} title={'Next'} />
    </AppContainer>
   );
}
 
export default NameOnboarding;

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
  }
})

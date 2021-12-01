import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import CustomTextInput from 'components/CustomTextInput';
import { AuthorizationContext } from 'context/AuthorizationProvider';
import { SCREENS } from 'navigations/constants';
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Sizing } from 'styles/sizes';

interface NameOnboardingProps {
  navigation: any
}
 
const NameOnboarding: React.FC<NameOnboardingProps> = ({ navigation }) => {
  const [name, setName] = useState<string>('')
  const { setUsername } = useContext(AuthorizationContext)

  const handlePress = () => {
    setUsername(name)
    navigation.replace(SCREENS.onboarding.welcomingCar)
  }

  return ( 
    <AppContainer style={styles.container}>
      <View>
        <Text style={styles.title}>Nama Anda</Text>
        <CustomTextInput style={{ marginTop: 16 }} placeholder={'Nama Anda'} onChange={setName} value={name} />
      </View>
      <CustomButton style={styles.button} onPress={handlePress} title={'Lanjut'} />
    </AppContainer>
   );
}
 
export default NameOnboarding;

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

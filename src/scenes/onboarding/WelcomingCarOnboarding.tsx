import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import Dropdown from 'components/Dropdown';
import { AuthorizationContext } from 'context/AuthorizationProvider';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';

interface WelcomingCarOnboardingProps {
  
}


 
const WelcomingCarOnboarding: React.FC<WelcomingCarOnboardingProps> = () => {
  const { name } = useContext(AuthorizationContext)

  return ( 
    <AppContainer backgroundImage={require('assets/bg_welcoming_car.png')} style={styles.container}>
      <View>
        <Text style={styles.title}>Halo</Text>
        <Text style={styles.title}>{name}!</Text>
        <Text style={styles.body}>Ayo masukan informasi mobil Anda!</Text>
      </View>
      <View>
        <CustomButton title={'Tambah Info Mobil'} />
        <CustomButton style={styles.buttonLater} type='secondary' title={'Nanti Dulu'} />
      </View>
    </AppContainer>
  );
}
 
export default WelcomingCarOnboarding;

const styles = StyleSheet.create({
  title: {
    fontSize: Sizing.text.heading[36],
    fontWeight: 'bold',
  },
  body: {
    marginTop: 16,
    fontSize: Sizing.text.body[16],
    fontWeight: 'bold',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  buttonLater: {
    marginTop: 8,
  },
  itemList: {
    borderBottomColor: Color.gray[2],
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: Sizing.text.body[14],
    fontWeight: 'bold',
    borderBottomWidth: 1,
  },
  titleModal: {
    fontSize: Sizing.text.body[16],
    fontWeight: 'bold',
    marginLeft: 16,
    marginRight: 16,
  },
  itemModal: {
    fontSize: Sizing.text.body[14],
    fontWeight: 'bold',
  }
})
import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';
import ProfileAction from './components/ProfileAction';

interface ProfileScreenProps {
  
}
 
const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  return ( 
    <AppContainer style={styles.container}>
      <View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.headerText}>Oto Suroto</Text>
            <Text style={styles.normalText}>otosuroto@gmail.com</Text>
            <Text style={styles.normalText}>0812 3456 7891</Text>
          </View>
          <View>
            <CustomButton buttonStyle={styles.button} textStyle={{ fontSize: Sizing.text.body[12], fontWeight: 'bold' }} title='Detail'/>
          </View>
        </View>

        <ProfileAction />
      </View>
      <View style={styles.containerBottom}>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
          <Image source={require('@assets/logo_header.png')} style={{ width: 100, height: 32, marginBottom: 8 }} resizeMode={'contain'} />
          <Text style={{ color: Color.gray.secondary }}>Ver 1.0.0</Text>
        </View>
        <CustomButton title='Logout' />
      </View>
    </AppContainer>
   );
}
 
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Color.gray[1],
    padding: 0,
  },
  normalText: {
    fontSize: Sizing.text.body[14],
  },
  headerText: {
    fontSize: Sizing.text.body[16],
    fontWeight: 'bold',
  },
  button: { 
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 24, 
    paddingRight: 24, 
    borderRadius: 8 
  },
  infoContainer: { 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Color.gray[0],
    marginBottom: 24,
  },
  containerBottom: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    display: 'flex',
    justifyContent: 'center',
  }
})
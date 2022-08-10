import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, Sizing, widthPixel } from 'styles/sizes';
import { getEmail, getName, getPhoneNumber, getPhoto, removeAccessToken } from 'utils/StorageUtils';
import ProfileAction from './components/ProfileAction';

interface ProfileScreenProps {
  navigation: any
}
 
const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [photo, setPhoto] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() => {
    getName().then(value => setName(value))
    getEmail().then(value => setEmail(value))
    getPhoto().then(value => setPhoto(value))
    getPhoneNumber().then(value => setPhoneNumber(value))
  }, [])

  return ( 
    <AppContainer style={styles.container} refreshDisable>
      <View>
        <View style={styles.infoContainer}>
          <View style={{ maxWidth: '70%'}}>
            <Text style={styles.headerText} numberOfLines={1} ellipsizeMode={'tail'}>{name}</Text>
            <Text style={styles.normalText} numberOfLines={1} ellipsizeMode={'tail'}>{email}</Text>
            {phoneNumber !== '' && (
              <Text style={styles.normalText}>{phoneNumber}</Text>
            )}
          </View>
          {/* <View>
            <CustomButton buttonStyle={styles.button} textStyle={{ fontSize: fontPixel(Sizing.text.body[12]), fontWeight: 'bold' }} title='Detail'/>
          </View> */}
        </View>

        <ProfileAction />
      </View>
      <View style={styles.containerBottom}>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
          <Image source={require('@assets/icon/ic_logo_text.webp')} style={{ width: widthPixel(100), height: heightPixel(32), marginBottom: heightPixel(8) }} resizeMode={'contain'} />
          <Text style={{ color: Color.gray.secondary }}>Ver 1.0.0</Text>
        </View>
        <CustomButton onPress={() => {
          GoogleSignin.signOut()
          removeAccessToken()
          navigation.replace(SCREENS.welcome.loginScreen)
        }} title='Logout' />
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
    fontSize: fontPixel(Sizing.text.body[14]),
  },
  headerText: {
    fontSize: fontPixel(Sizing.text.body[16]),
    fontWeight: 'bold',
  },
  button: { 
    paddingTop: heightPixel(6),
    paddingBottom: heightPixel(6),
    paddingLeft: widthPixel(24), 
    paddingRight: widthPixel(24), 
    borderRadius: 8 
  },
  infoContainer: { 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthPixel(20),
    paddingVertical: heightPixel(20),
    backgroundColor: Color.gray[0],
    marginBottom: heightPixel(24),
  },
  containerBottom: {
    paddingHorizontal: widthPixel(20),
    paddingBottom: heightPixel(24),
    display: 'flex',
    justifyContent: 'center',
  }
})
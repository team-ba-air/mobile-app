import { NavigationProp } from '@react-navigation/native';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';

interface ServiceTypeToolbarProps {
  navigation: NavigationProp<any>
  onPressHelp: () => void
}
 
const ServiceTypeToolbar: React.FC<ServiceTypeToolbarProps> = ({ navigation, onPressHelp }) => {
  return ( 
    <View style={styles.container}>
      <Image
        style={{ width: 16, height: 16 }}
        source={require('@assets/icon/left_arrow.png')} 
        resizeMode={'contain'} 
        onPress={() => navigation.goBack()}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Booking Servis</Text>
      </View>
      <Image
        style={{ width: 16, height: 16 }}
        source={require('@assets/icon/ic_service_type_help.png')} 
        resizeMode={'contain'} 
        onPress={onPressHelp}
      />
    </View>
  );
}
 
export default ServiceTypeToolbar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: Color.blue[8],
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: Sizing.text.body[16],
    color: Color.gray[0],
    fontWeight: 'bold',
  },
  titleContainer: {
    width: '100%',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';

interface NavbarAppProps {
  title?: string
  navigation: any
}
 
const NavbarApp: React.FC<NavbarAppProps> = ({ title, navigation }) => {
  return ( 
    <View style={styles.container}>
      
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
 
export default NavbarApp;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: Color.blue[8],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: Sizing.text.body[16],
    color: Color.gray[0],
    fontWeight: 'bold',
  }
})
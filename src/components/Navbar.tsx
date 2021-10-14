import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Color } from 'styles/colors'

interface NavbarProps {
  
}
 
const Navbar: React.FC<NavbarProps> = () => {
  return ( 
    <View style={styles.container}>
      <Image source={require('assets/logo_header.png')} />
    </View>
   )
}
 
export default Navbar

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Color.gray[0],
  }
})

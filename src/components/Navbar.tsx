import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Color } from 'styles/colors'
import { heightPixel, widthPixel } from 'styles/sizes'

interface NavbarProps {
  
}
 
const Navbar: React.FC<NavbarProps> = () => {
  return ( 
    <View style={styles.container}>
      <Image style={{ width: widthPixel(86), height: heightPixel(26)}} source={require('@assets/icon/ic_logo_text.webp')} />
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

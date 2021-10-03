import React from 'react'
import { Image, Text, View } from 'react-native'

interface NavbarProps {
  
}
 
const Navbar: React.FC<NavbarProps> = () => {
  return ( 
    <View>
      <Image source={require('assets/logo_header.png')} />
    </View>
   )
}
 
export default Navbar

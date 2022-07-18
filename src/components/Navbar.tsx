import React from 'react'
import { Image, Platform, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Color } from 'styles/colors'
import { heightPixel, widthPixel } from 'styles/sizes'

interface NavbarProps {
  
}
 
const Navbar: React.FC<NavbarProps> = () => {
  const insets = useSafeAreaInsets()
  return ( 
    <View style={{
      padding: 20,
      backgroundColor: Color.gray[0],
      paddingTop: Platform.OS === 'ios' ? insets.top : 0,
    }}>
      <Image style={{ width: widthPixel(86), height: heightPixel(26)}} source={require('@assets/icon/ic_logo_text.webp')} />
    </View>
   )
}
 
export default Navbar


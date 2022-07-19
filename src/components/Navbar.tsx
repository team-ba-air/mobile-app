import React from 'react'
import { SafeAreaView } from 'react-native'
import { Image, Platform, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Color } from 'styles/colors'
import { heightPixel, widthPixel } from 'styles/sizes'

interface NavbarProps {
  
}
 
const Navbar: React.FC<NavbarProps> = () => {
  const insets = useSafeAreaInsets()
  return ( 
    <View style={[{
      padding: 20,
      backgroundColor: Color.gray[0],
    }, (Platform.OS === 'ios' && ({
      paddingTop: insets.top,
    }))]}>
      <Image style={{ width: widthPixel(86), height: heightPixel(26)}} source={require('@assets/icon/ic_logo_text.webp')} />
    </View>
   )
}
 
export default Navbar


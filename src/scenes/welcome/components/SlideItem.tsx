import React from 'react'
import { View, Image, Text } from 'react-native'
import { heightPixel, SCREEN_WIDTH, widthPixel } from 'styles/sizes'

interface SlideItemProps {
  image: string
  title: string
  subtitle: string
}
 
const SlideItem: React.FC<SlideItemProps> = ({ image, title, subtitle }) => {
  return ( 
    <View
      style={{
        display: 'flex',
        height: heightPixel(100),
        width: SCREEN_WIDTH,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require('@assets/placeholder_service.png')}
        style={{ width: SCREEN_WIDTH * 0.9, height: 100 }}
      ></Image>
      <Text style={{ fontSize: 24 }}>{title}</Text>
      <Text style={{ fontSize: 18 }}>{subtitle}</Text>
    </View>
   )
}
 
export default SlideItem

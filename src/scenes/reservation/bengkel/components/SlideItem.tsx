import React from 'react'
import { View, Image } from 'react-native'
import { heightPixel, SCREEN_WIDTH } from 'styles/sizes'

interface SlideItemProps {
  image: string
}
 
const SlideItem: React.FC<SlideItemProps> = ({ image }) => {
  return ( 
    <View
      style={{
        display: 'flex',
        height: heightPixel(180),
        width: SCREEN_WIDTH,
      }}
    >
      <View style={{
        alignSelf: 'center',
      }}>
        <Image
          source={{ uri: image }}
          style={{ width: SCREEN_WIDTH * 1, height: heightPixel(180) }}
        />
      </View>
    </View>
   )
}
 
export default SlideItem


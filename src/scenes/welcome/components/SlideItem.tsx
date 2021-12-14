import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { Color } from 'styles/colors'
import { fontPixel, heightPixel, SCREEN_WIDTH, Sizing, widthPixel } from 'styles/sizes'

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
      }}
    >
      <View style={{
        alignSelf: 'center',
      }}>
        <Image
          source={require('@assets/placeholder_service.png')}
          style={{ width: SCREEN_WIDTH * 0.9, height: heightPixel(157) }}
          resizeMode='contain'
        />
      </View>
      <View style={{
        marginTop: 20,
        paddingHorizontal: widthPixel(20),
      }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
   )
}
 
export default SlideItem

const styles = StyleSheet.create({
  title: {
    fontSize: fontPixel(Sizing.text.subheading[18]),
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: fontPixel(Sizing.text.body[14]),
    color: Color.gray.secondary,
  },
})

import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Color } from 'styles/colors'
import { fontPixel, heightPixel, Sizing, widthPixel } from 'styles/sizes'
import { AvailableHourItem } from '../../constants'

interface HourChipsItemProps {
  hour: AvailableHourItem
  value?: string
  onSelect?: (value: string) => void
}
 
const HourChipsItem: React.FC<HourChipsItemProps> = ({ hour, value, onSelect }) => {
  const styleContainer = hour.available ?
    hour.hour === value ? 
        styles.containerSelected 
      : 
        styles.containerUnselected
    : 
      styles.containerUnavailable

  const textColor = hour.available ?
  hour.hour === value ? 
      'white' 
    : 
      Color.blue[8]
  : 
    Color.gray[5]

  return ( 
      <TouchableOpacity onPress={() => {
        if (hour.hour !== value && hour.available) {
          onSelect?.(hour.hour)
        }
      }}>
        <View style={styleContainer}>
          <Text style={[styles.text, { color: textColor }]}>{hour.hour}</Text>
        </View>
      </TouchableOpacity>
  )
}
 
export default HourChipsItem

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingVertical: heightPixel(4),
    paddingHorizontal: widthPixel(8),
  },
  containerSelected: {
    borderRadius: 4,
    paddingVertical: heightPixel(4),
    paddingHorizontal: widthPixel(8),
    marginRight: widthPixel(8),
    backgroundColor: Color.blue[8],
  },
  containerUnselected: {
    borderRadius: 4,
    paddingVertical: heightPixel(4),
    paddingHorizontal: widthPixel(8),
    marginRight: widthPixel(8),
    borderColor: Color.gray[3],
    borderWidth: 1,
  },
  containerUnavailable: {
    borderRadius: 4,
    paddingVertical: heightPixel(4),
    paddingHorizontal: widthPixel(8),
    marginRight: widthPixel(8),
    backgroundColor: Color.gray[4],
  },
  text: {
    color: Color.gray[0],
    fontSize: fontPixel(14),
    fontWeight: 'bold',
  },
  textUnselected: {
    color: Color.blue[8],
    fontSize: fontPixel(14)
  },
})

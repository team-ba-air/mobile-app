import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Color } from 'styles/colors'
import { fontPixel, Sizing } from 'styles/sizes'
import { AvailableHourItem } from '../constants'

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

  return ( 
    <TouchableOpacity onPress={() => {
      if (hour.hour !== value && hour.available) {
        onSelect?.(hour.hour)
      }
    }}>
      <View style={styleContainer}>
        <Text style={styles.text}>{hour.hour}</Text>
      </View>
    </TouchableOpacity>
  )
}
 
export default HourChipsItem

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  containerSelected: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    backgroundColor: Color.red[7],
  },
  containerUnselected: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    backgroundColor: Color.red[4],
  },
  containerUnavailable: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    backgroundColor: Color.gray[4],
  },
  text: {
    color: Color.gray[0],
    fontSize: fontPixel(Sizing.text.body[14]),
    fontWeight: 'bold',
  },
})

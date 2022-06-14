import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel, widthPixel } from 'styles/sizes';
import { getFormatHour } from 'utils/DateUtil'

interface StatusDetailComponentProps {
  label: string
  time: Date | null
  position: number
  currentPosition: number
  stepStatus: string
}
 
const StatusDetailComponent: React.FC<StatusDetailComponentProps> = ({ label, time, position, currentPosition, stepStatus }) => {
  console.log(position)
  console.log(label)
  return ( 
    <View style={styles.statusDetail}>
      <View style={styles.statusDetailStatus}>
        <Text style={{ 
          fontSize: fontPixel(12), 
          fontWeight: position === currentPosition ? 'bold' : 'normal', 
          color: position <= currentPosition ? 'black' : Color.gray[6] }}
        >
          {position === 4 && stepStatus === 'finished' ? 'Servis Selesai' : label}
        </Text>
      </View>
      <View style={styles.statusDetailTime}>
        <Text style={{ fontSize: fontPixel(8), color: position === currentPosition ? 'black' : Color.gray[6] }}>
          {time && `${getFormatHour(time)} WIB`}
        </Text>
      </View>
    </View>
  );
}
 
export default StatusDetailComponent;

const styles = StyleSheet.create({
  statusDetail: {
    marginLeft: widthPixel(8),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    height: 50,
    alignItems: 'center',
  },
  statusDetailStatus: {
    flex: 3,
  },
  statusDetailTime: {
    flex: 1,
  }
})
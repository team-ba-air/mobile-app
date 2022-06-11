import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { getFormatHour } from 'utils/DateUtil'

interface StatusDetailComponentProps {
  label: string
  time: Date | null
}
 
const StatusDetailComponent: React.FC<StatusDetailComponentProps> = ({ label, time }) => {
  console.log(time)
  return ( 
    <View style={styles.statusDetail}>
      <View style={styles.statusDetailStatus}>
        <Text>
          {label}
        </Text>
      </View>
      <View style={styles.statusDetailTime}>
        <Text>{time && getFormatHour(time)}</Text>
      </View>
    </View>
  );
}
 
export default StatusDetailComponent;

const styles = StyleSheet.create({
  statusDetail: {
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
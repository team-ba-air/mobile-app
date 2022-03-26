import AppContainer from 'components/AppContainer'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Color } from 'styles/colors'
import VehicleList from './components/VehicleList'

interface VehicleScreenProps {
  navigation: any
}
 
const VehicleScreen: React.FC<VehicleScreenProps> = ({ navigation }) => {
  return (
    <AppContainer style={styles.container}>
      <VehicleList navigation={navigation} />
    </AppContainer>
  )
}
 
export default VehicleScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 0,
    backgroundColor: Color.gray[1],
  }
})

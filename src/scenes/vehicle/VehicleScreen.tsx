import AppContainer from 'components/AppContainer'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Color } from 'styles/colors'
import VehicleList from './components/VehicleList'

interface VehicleScreenProps {}
 
const VehicleScreen: React.FC<VehicleScreenProps> = () => {
  return (
    <AppContainer style={styles.container}>
      <VehicleList />
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

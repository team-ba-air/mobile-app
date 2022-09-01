import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import VehicleScreen from "scenes/vehicle/VehicleScreen";
import NavbarApp from 'components/NavbarApp';
import VehicleFormScreen from 'scenes/vehicle/form/VehicleFormScreen';

const Stack = createStackNavigator();

const VehicleNavigator: React.FC<any> = () => {
  return (
    <Stack.Navigator initialRouteName='VehicleList'>
      <Stack.Screen options={{ header: ({ navigation }) => <NavbarApp navigation={navigation} title={'Mobil Saya'} disableBack /> }} name='VehicleList' component={VehicleScreen} />
      <Stack.Screen options={{ header: ({ navigation }) => <NavbarApp navigation={navigation} title={'Info Mobil'} type='secondary' /> }}  name='UpdateVehicle' component={VehicleFormScreen} />
    </Stack.Navigator>
  )
}

export default VehicleNavigator
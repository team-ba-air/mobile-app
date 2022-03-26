import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import UpdateVehicleScreen from "scenes/vehicle/UpdateVehicleScreen";
import VehicleScreen from "scenes/vehicle/VehicleScreen";
import NavbarApp from 'components/NavbarApp';

const Stack = createStackNavigator();

const VehicleNavigator: React.FC<any> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ header: ({ navigation }) => <NavbarApp navigation={navigation} title={'Mobil Saya'}/> }} name='Vehicle' component={VehicleScreen} />
      <Stack.Screen options={{ header: ({ navigation }) => <NavbarApp navigation={navigation} title={'Info Mobil'}/> }}  name='UpdateVehicle' component={UpdateVehicleScreen} />
    </Stack.Navigator>
  )
}

export default VehicleNavigator
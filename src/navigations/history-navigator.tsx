import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import HistoryScreen from "scenes/history/HistoryScreen";
import HistoryDetailScreen from 'scenes/history/history-detail/HistoryDetailScreen';
import NavbarApp from 'components/NavbarApp';

const Stack = createStackNavigator()
 
const HistoryNavigator: React.FC<any> = () => {
  return ( 
    <Stack.Navigator>
      <Stack.Screen 
        options={{
          header: ({ navigation }) => <NavbarApp navigation={navigation} title={'Riwayat Servis'} disableBack />
        }}
        name='HistoryList' 
        component={HistoryScreen} />
      
      <Stack.Screen 
        options={{
          header: ({ navigation }) => <NavbarApp navigation={navigation} title={'Detail Riwayat'} type='secondary' />
        }}
        name='HistoryDetail' 
        component={HistoryDetailScreen} />
    </Stack.Navigator>
  );
}
 
export default HistoryNavigator;
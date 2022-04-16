import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import HistoryScreen from "scenes/history/HistoryScreen";
import HistoryDetailScreen from 'scenes/history/history-detail/HistoryDetailScreen';

const Stack = createStackNavigator()
 
const HistoryNavigator: React.FC<any> = () => {
  return ( 
    <Stack.Navigator>
      <Stack.Screen 
        options={{
          headerShown: false,
        }}
        name='History' 
        component={HistoryScreen} />
      
      <Stack.Screen 
        options={{
          headerShown: false,
        }}
        name='HistoryDetail' 
        component={HistoryDetailScreen} />
    </Stack.Navigator>
  );
}
 
export default HistoryNavigator;
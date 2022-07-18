import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from 'scenes/profile/ProfileScreen';
import { Icon } from 'react-native-elements';
import VehicleNavigator from './vehicle-navigator';
import ReservationNavigator from './reservation-navigator';
import HistoryNavigator from './history-navigator';
import { Color } from 'styles/colors';
import BookingButtonNavigation from 'components/BookingButtonNavigation';
import BookingContainer from 'scenes/home/BookingContainer';
import NavbarApp from 'components/NavbarApp';

const BottomNavigator = createBottomTabNavigator()

const AppNavigator = (props: any) => {
  const { navigation } = props
  return <BottomNavigator.Navigator
    screenOptions={{ unmountOnBlur: true }}
  >
      <BottomNavigator.Screen 
        options={{ 
          headerShown: false, 
          tabBarIcon: ({ focused }) => <Icon type='material' name='home' size={24} color={focused ? Color.blue[7] : Color.gray[7]} tvParallaxProperties={undefined} />,
          tabBarLabel: 'Home',
        }} 
        name='HomeTab' 
        component={ReservationNavigator} 
      />
      <BottomNavigator.Screen 
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <Icon type='material' name='drive-eta' size={24} color={focused ? Color.blue[7] : Color.gray[7]} tvParallaxProperties={undefined} />,
          tabBarLabel: 'Mobil',
        }}
        name='Vehicle' 
        component={VehicleNavigator} 
      />
      <BottomNavigator.Screen 
        options={{
          tabBarButton: (props) => <BookingButtonNavigation navigation={navigation} />,
        }}
        name='Booking' 
        component={BookingContainer} 
      />
      <BottomNavigator.Screen 
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <Icon type='material' name='article' size={24} color={focused ? Color.blue[7] : Color.gray[7]} tvParallaxProperties={undefined} />,
          tabBarLabel: 'History',
        }}
        name='History' 
        component={HistoryNavigator} 
      />
      <BottomNavigator.Screen 
        options={{ 
          header: ({ navigation }) => <NavbarApp navigation={navigation} title={'Profil'} disableBack />,
          tabBarIcon: ({ focused }) => <Icon type='material' name='person' size={24} color={focused ? Color.blue[7] : Color.gray[7]} tvParallaxProperties={undefined} />,
          tabBarLabel: 'Profil',
        }} 
        name='Profile'
        component={ProfileScreen}
      />
    </BottomNavigator.Navigator>
}

export default AppNavigator
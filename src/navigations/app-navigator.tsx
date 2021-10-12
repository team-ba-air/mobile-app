import Navbar from "components/Navbar"
import React from "react"
import { createStackNavigator } from "react-navigation-stack"
import HomeScreen from "scenes/home"
import LoginScreen from "scenes/login"

const AppNavigatorConfig = {
  initialRouteName: 'Login',
  header: null,
}

const getNavbar = () => {
  return {
    headerTitle: () => <Navbar />
  }
}

const RouteConfigs = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: getNavbar
  },
}

const AppNavigator = createStackNavigator(RouteConfigs, AppNavigatorConfig)

export default AppNavigator
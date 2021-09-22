import { createStackNavigator } from "react-navigation-stack"
import HomeScreen from "scenes/home"
import LoginScreen from "scenes/login"

const AppNavigatorConfig = {
  initialRouteName: 'Login',
  header: null,
}

const RouteConfigs = {
  Home: {
    screen: HomeScreen,
  },
  Login: {
    screen: LoginScreen,
  }
}

const AppNavigator = createStackNavigator(RouteConfigs, AppNavigatorConfig)

export default AppNavigator
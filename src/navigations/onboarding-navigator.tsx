import Navbar from "components/Navbar"
import React from "react"
import { createStackNavigator } from "react-navigation-stack"
import EmailOnboarding from "scenes/onboarding/EmailOnboarding"
import StartOnboarding from "scenes/onboarding/StartOnboarding"

const OnboardingNavigatorConfig = {
  initialRouteName: 'StartOnboarding',
  header: null,
}

const getNavbar = () => {
  return {
    headerTitle: () => <Navbar />
  }
}

const RouteConfigs = {
  StartOnboarding: {
    screen: StartOnboarding,
    navigationOptions: getNavbar,
  },
  EmailOnboarding: {
    screen: EmailOnboarding,
    navigationOptions: getNavbar,
  }
}

const OnboardingNavigator = createStackNavigator(RouteConfigs, OnboardingNavigatorConfig)

export default OnboardingNavigator
import Navbar from "components/Navbar"
import React from "react"
import { createStackNavigator } from "react-navigation-stack"
import EmailOnboarding from "scenes/onboarding/EmailOnboarding"
import NameOnboarding from "scenes/onboarding/NameOnboarding"
import PhoneOnboarding from "scenes/onboarding/PhoneOnboarding"
import StartOnboarding from "scenes/onboarding/StartOnboarding"
import WelcomingCarOnboarding from "scenes/onboarding/WelcomingCarOnboarding"

const OnboardingNavigatorConfig  = {
  initialRouteName: 'StartOnboarding',
  header: null,
}

const getNavbar = () => {
  return {
    headerTitle: () => <Navbar />,
    headerLeft: null,
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
  },
  PhoneOnboarding: {
    screen: PhoneOnboarding,
    navigationOptions: getNavbar,
  },
  NameOnboarding: {
    screen: NameOnboarding,
    navigationOptions: getNavbar,
  },
  WelcomingCarOnboarding: {
    screen: WelcomingCarOnboarding,
    navigationOptions: getNavbar,
  }
}

const OnboardingNavigator = createStackNavigator(RouteConfigs, OnboardingNavigatorConfig)

export default OnboardingNavigator
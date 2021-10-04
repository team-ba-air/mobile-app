import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AppNavigator from "./app-navigator";
import OnboardingNavigator from "./onboarding-navigator";

const RootNavigator = createSwitchNavigator(
  {
    Onboarding: OnboardingNavigator,
    App: AppNavigator,
  },
  {
    initialRouteName: 'Onboarding',
  }
)

export default createAppContainer(RootNavigator)
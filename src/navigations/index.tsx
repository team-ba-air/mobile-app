import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AppNavigator from "./app-navigator";
import BottomNavigator from "./bottom-navigator";
import OnboardingNavigator from "./onboarding-navigator";
import ReservationNavigator from "./reservation-navigator";

const RootNavigator = createSwitchNavigator(
  {
    Onboarding: OnboardingNavigator,
    App: BottomNavigator,
    Reservation: ReservationNavigator,
  },
  {
    initialRouteName: 'Onboarding',
  }
)

export default createAppContainer(RootNavigator)
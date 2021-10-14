import { createStackNavigator } from "react-navigation-stack"
import ServiceReservation from "scenes/reservation/ServiceReservation"

const ReservationNavigatorConfig = {
  initialRouteName: 'ServiceReservation',
  header: null,
}

const RouteConfigs = {
  ServiceReservation: {
    screen: ServiceReservation,
  },
}

const ReservationNavigator = createStackNavigator(RouteConfigs, ReservationNavigatorConfig)

export default ReservationNavigator
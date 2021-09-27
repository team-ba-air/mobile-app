/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'utils/mock-api'

AppRegistry.registerComponent(appName, () => App);

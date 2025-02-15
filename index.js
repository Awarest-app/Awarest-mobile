/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {messaging} from './src/firebase/setting'

messaging.setBackgroundMessageHandler(async remoteMessage => {
  
});
AppRegistry.registerComponent(appName, () => App);

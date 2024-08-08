import Constants from 'expo-constants';

// load extra config from the app.json file
const extra = Constants.manifest?.extra ?? {};

export default {
  // use 10.0.2.2 for Android to connect to host machine
  // apiUrl: 'http://10.0.2.2:8080/',
  // apiUrl: 'http://localhost:8082/',
  apiUrl: 'https://api.ilaadeeg.com/',
  // leave blank if using Keycloak
  oktaClientId: '',
  // use fixtures instead of real API requests
  useFixtures: false,
  // debug mode
  debugMode: __DEV__,
  extra,
  useReactotron: __DEV__

};

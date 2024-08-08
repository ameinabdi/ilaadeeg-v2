import './i18n';
import * as React from 'react';
import { Provider } from 'react-redux';
import createStore from './app/shared/reducers';
import * as SplashScreen from 'expo-splash-screen';
import { Colors, FontList } from './app/shared/themes/index';
import * as Font from 'expo-font';
import DebugConfig from './app/config/app-config';
import NavContainer from './app/navigation/nav-container';
import Toast from 'react-native-toast-message';
import toastConfig from './app/config/toast-config';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import messaging from '@react-native-firebase/messaging';
import moment from 'moment';
import { StatusBar } from 'react-native';
import colors from './app/shared/themes/colors';

const store = createStore();

function App(props) {
  moment.locale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s:  'seconds',
      ss: '%ss',
      m:  'a minute',
      mm: '%dm',
      h:  'an hour',
      hh: '%dh',
      d:  'a day',
      dd: '%dd',
      M:  'a month',
      MM: '%dM',
      y:  'a year',
      yy: '%dY'
    }
  });
  // prevent the splashscreen from disappearing until the redux store is completely ready (hidden in nav-container.js)
      React.useEffect(() => {
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            // do something with the message
        });
        // Register background handler
        messaging().setBackgroundMessageHandler(async remoteMessage => {
          console.log('Message handled in the background!', remoteMessage);
        });
        return unsubscribe;
       }, []);

  return  (
      <ApplicationProvider {...eva} theme={eva.light}>
         <StatusBar
        animated={true}
        backgroundColor={colors.primary}
        barStyle={colors.primary}
        hidden={false}
      />
        <Provider store={store}>
          <NavContainer  {...props}/>
          <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
        </Provider>
      </ApplicationProvider>
  ) ;
}
export default DebugConfig.useReactotron ? console.tron.overlay(App) : App;

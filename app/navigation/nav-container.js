import * as React from 'react';
import { AppState, Text, useWindowDimensions, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useReduxDevToolsExtension } from '@react-navigation/devtools';
import { connect } from 'react-redux';
import '../../i18n';
import {useTranslation} from 'react-i18next';

// import screens
import BusDetailScreen from '../modules/entities/buses/bus-detail-screen';
import ProfileScreen from '../modules/account/profile/profile-screen';
import ParcelScreen from '../modules/entities/parcel/parcel-screen';
import MyTabs from './tab-nav';
import PinScreen from '../modules/pin/pin-screen';
import SetupPinScreen from '../modules/pin/setup-pin-screen';
import EditProfileScreen from '../modules/account/profile/Edit-profile-screen';
import PrivacyScreen from '../modules/privacy/privacy-screen';
import TermCondationScreen from '../modules/term-condition/term-condition-screen';
import ChatScreen from '../modules/chat/chat-screen';
import BusinessDetailScreen from '../modules/entities/business/business-detail-screen';
import BookingListScreen from '../modules/entities/booking/booking-screen';
import BookingDetailScreen from '../modules/entities/booking/booking-detail-screen';
import CategoryScreen from '../modules/entities/category/category-screen';
import ProductCategory from '../modules/entities/category/product-category-screen-list';

import LoginScreen from '../modules/login/login-screen';
import VerificationScreen from '../modules/login/verification-screen';
import RegisterScreen from '../modules/login/register-screen'
import BusScreen from '../modules/entities/buses/bus-list.screen'
import PaymentCheckOutScreen from '../modules/entities/Payment/checkout-screen';
import updateCheckerScreen from '../shared/components/update-checker/update-check-screen'
import SupportScreen from '../modules/support/support-screen';
import TransactionDetailScreen from '../modules/entities/transaction/transaction-detail-screen';
import ProductDetailScreen from '../modules/entities/product/product-detail-screen';
import ProductViewScreen from '../modules/entities/product/product-view-screen';
import ImageViewer from '../modules/entities/product/image-view';
import PostEditScreen from '../modules/entities/post/post-edit-screen'
import LanguageScreen from '../modules/langauge/language-screen';
import CouponDetailScreen from '../modules/entities/coupon/coupon-detail-screen';

import WorkerListScreen from '../modules/entities/worker/worker-list-screen';
import WorkerDetail from '../modules/entities/worker/worker-detail-screen';
import ProductEditScreen from '../modules/entities/product/product-edit-screen'
import IntroScreen from '../modules/intro/app-intro';
import AccountActions from '../shared/reducers/account.reducer';
import EntityStackScreen, { getEntityRoutes } from './entity-stack';
import StorybookScreen from '../../storybook';
import DrawerContent from './drawer/drawer-content';
import { isReadyRef, navigationRef } from './nav-ref';
import NotFound from './not-found-screen';
import { ModalScreen } from './modal-screen';
import { DrawerButton } from './drawer/drawer-button';
import LoadingComponent from '../shared/components/loading/loadin-component';
import PostScreen from '../modules/entities/post/post-list-screen';
import AuthScreen from '../modules/auth/auth-screen';

export const drawerScreens = [
  {
    name: 'Intro',
    route: 'intro',
    component: IntroScreen,
    auth: null,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
  },
  {
    name: 'AuthScreen',
    route: 'AuthScreen',
    component: AuthScreen,
    auth: null,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
  },
  {
    name: 'Guest',
    component: MyTabs,
    auth: false,
     options: {
      headerShown: false,
    },
  },
  {
    name: 'Home',
    component: MyTabs,
    auth: true,
     options: {
      headerShown: false,
    },
  },
  
  {
    name: 'Register',
    component: RegisterScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  
  {
    name: 'PinScreen',
    component: PinScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'SetupPinScreen',
    component: SetupPinScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'postScreen',
    component: PostScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'EditProfileScreen',
    component: EditProfileScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'TransactionDetailScreen',
    component: TransactionDetailScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'CategoryScreen',
    component: CategoryScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: false,
  },
  {
    name: 'CategoryScreen',
    component: CategoryScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'ProductCategory',
    component: ProductCategory,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: false,
  },
  {
    name: 'ProductCategory',
    component: ProductCategory,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'BusinessDetailScreen',
    component: BusinessDetailScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: false,
  },
  {
    name: 'BusinessDetailScreen',
    component: BusinessDetailScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'PostEditScreen',
    component: PostEditScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'ProductEditScreen',
    component: ProductEditScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'ProductViewScreen',
    component: ProductViewScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'ProductDetailScreen',
    component: ProductDetailScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: false,
  },
  {
    name: 'ProductDetailScreen',
    component: ProductDetailScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'LanguageScreen',
    component: LanguageScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'CouponDetailScreen',
    component: CouponDetailScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: false,
  },
  {
    name: 'CouponDetailScreen',
    component: CouponDetailScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'BusDetail',
    component: BusDetailScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'WorkerDetail',
    component: WorkerDetail,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: false,
  },
  {
    name: 'WorkerDetail',
    component: WorkerDetail,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'BookingListScreen',
    component: BookingListScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'BookingDetailScreen',
    component: BookingDetailScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'ImageViewer',
    component: ImageViewer,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: false,
  },
  {
    name: 'ImageViewer',
    component: ImageViewer,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'WorkerListScreen',
    component: WorkerListScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: false,
  },
  {
    name: 'WorkerListScreen',
    component: WorkerListScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'Profile',
    component: ProfileScreen,
    auth: true,
    options: {
      headerShown: false,
      swipeEnabled: false
    }
  },

  {
    name: 'UpdateChecker',
    component: updateCheckerScreen,
    auth: true,
    options: {
      headerShown: false,
      swipeEnabled: false
    }
  },
  {
    name: 'SupportScreen',
    component: SupportScreen,
    auth: true,
    options: {
      headerShown: false,
      swipeEnabled: false
    }
  },
  {
    name: 'PrivacyScreen',
    component: PrivacyScreen,
    auth: true,
    options: {
      headerShown: false,
      swipeEnabled: false
    }
  },
  {
    name: 'TermCondationScreen',
    component: TermCondationScreen,
    auth: true,
    options: {
      headerShown: false,
      swipeEnabled: false
    }
  },
  {
    name: 'ChatScreen',
    component: ChatScreen,
    auth: true,
    options: {
      headerShown: false,
      swipeEnabled: false
    }
  },

  {
    name: 'UpdateChecker',
    component: updateCheckerScreen,
    auth: false,
    options: {
      headerShown: false,
      swipeEnabled: false
    }
  },
  {
    name: 'SupportScreen',
    component: SupportScreen,
    auth: false,
    options: {
      headerShown: false,
      swipeEnabled: false
    }
  },
  {
    name: 'PrivacyScreen',
    component: PrivacyScreen,
    auth: false,
    options: {
      headerShown: false,
      swipeEnabled: false
    }
  },
  {
    name: 'TermCondationScreen',
    component: TermCondationScreen,
    auth: false,
    options: {
      headerShown: false,
      swipeEnabled: false
    }
  },
  {
    name: 'ChatScreen',
    component: ChatScreen,
    auth: false,
    options: {
      headerShown: false,
      swipeEnabled: false
    }
  },
  {
    name: 'Parcel',
    component: ParcelScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'Bus',
    component: BusScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
    auth: true,
  },
  {
    name: 'PaymentCheckOutScreen',
    route: 'paymentCheckOutScreen',
    component: PaymentCheckOutScreen,
    auth: true,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
  },
  {
    name: 'EntityStack',
    isStack: true,
    component: EntityStackScreen,
    options: {
      title: 'Entities',
      headerShown: false,
    },
    auth: true,
  },
];
if (__DEV__) {
  drawerScreens.push({
    name: 'Storybook',
    route: 'storybook',
    component: StorybookScreen,
    auth: false,
  });
}
export const getDrawerRoutes = () => {
  const routes = {};
  drawerScreens.forEach((screen) => {
    if (screen.route) {
      routes[screen.name] = screen.route;
    }
  });
  return routes;
};


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const getScreens = (props) => {
  const isAuthed = props.account !== null;
  return drawerScreens.map((screen, index) => {
    if (screen.auth === null || screen.auth === undefined) {
      return <Drawer.Screen name={screen.name} component={screen.component} options={screen.options} key={index} />;
    } else if (screen.auth === isAuthed) {
      return <Drawer.Screen name={screen.name} component={screen.component} options={screen.options} key={index} />;
    }
    return null;
  });
};

function NavContainer(props) {
  const { loaded, getAccount,language } = props;
  const lastAppState = 'active';
  const {t, i18n} = useTranslation();
  React.useEffect(() => {
    i18n
      .changeLanguage(language)
      .then((success) =>success )
      .catch(err => err);
  }, [language]);
  React.useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (loaded) {
    }
  }, [loaded]);

  React.useEffect(() => {
    const handleChange = (nextAppState) => {
      if (lastAppState.match(/inactive|background/) && nextAppState === 'active') {
        getAccount();
      }
    };
    AppState.addEventListener('change', handleChange);
    return () => AppState.removeEventListener('change', handleChange);
  }, [getAccount]);

  useReduxDevToolsExtension(navigationRef);

  const dimensions = useWindowDimensions();
  return !loaded ? (
    <LoadingComponent />
  ) : (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {() => (
            <Drawer.Navigator
              drawerContent={(p) => <DrawerContent {...p} />}
              initialRouteName={drawerScreens[0].name}
              drawerType={'front'}
              screenOptions={{ headerShown: true, headerLeft: DrawerButton }}>
              {getScreens(props)}
            </Drawer.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Verification" component={VerificationScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="ModalScreen"
          component={ModalScreen}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
            }),
          }}
        />
        <Stack.Screen name="NotFound" component={NotFound} options={{ title: 'Oops!' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    loaded: state.appState.rehydrationComplete,
    account: state.account.account,
    language:state.account.language

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAccount: () => dispatch(AccountActions.accountRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);

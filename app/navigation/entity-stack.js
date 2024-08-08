import * as React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { DrawerButton } from './drawer/drawer-button';
import { navigate, goBackOrIfParamsOrDefault } from './nav-ref';

// import screens
import EntitiesScreen from '../modules/entities/entities-screen';
import BookingScreen from '../modules/entities/booking/booking-screen';
import BookingDetailScreen from '../modules/entities/booking/booking-detail-screen';
import BookingEditScreen from '../modules/entities/booking/booking-edit-screen';

import DebtDetailScreen from '../modules/entities/debt/debt-detail-screen';
import DebtEditScreen from '../modules/entities/debt/debt-edit-screen';

import CustomerAccount from '../modules/entities/customer-account/customer-account-screen';
import CustomerAccountDetail from '../modules/entities/customer-account/customer-account-detail-screen';
import CustomerAccountEdit from '../modules/entities/customer-account/customer-account-edit-screen';
// jhipster-react-native-navigation-import-needle

export const entityScreens = [
  {
    name: 'Entities',
    route: '',
    component: EntitiesScreen,
    options: {
      headerLeft: DrawerButton,
    },
  },
  {
    name: 'Booking',
    route: 'booking',
    component: BookingScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
  },
  {
    name: 'BookingDetail',
    route: 'booking/detail',
    component: BookingDetailScreen,
    options: { title: 'View Ticket', headerLeft: () => <HeaderBackButton onPress={() => navigate('Booking')} /> },
  },
  {
    name: 'BookingEdit',
    route: 'booking/edit',
    component: BookingEditScreen,
    options: {
      title: 'Edit Booking',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('BookingDetail', 'Booking')} />,
    },
  },
  
  {
    name: 'DebtDetail',
    route: 'debt/detail',
    component: DebtDetailScreen,
    options: {  
      swipeEnable: false,
      headerShown: false,
    },
  },
  {
    name: 'DebtEdit',
    route: 'debt/edit',
    component: DebtEditScreen,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
  },

  {
    name: 'CustomerAccount',
    route: 'CustomerAccount',
    component: CustomerAccount,
    options: {
      swipeEnable: false,
      headerShown: false,
    },
  },
  {
    name: 'CustomerAccountDetail',
    route: 'CustomerAccount/detail',
    component: CustomerAccountDetail,
    options: { title: 'View  Account', headerLeft: () => <HeaderBackButton onPress={() => navigate('CustomerAccountDetail')} /> },
  },
  {
    name: 'CustomerAccountEdit',
    route: 'CustomerAccount/edit',
    component: CustomerAccountEdit,
    options: {
      title: 'Edit  Account',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('CustomerAccountDetail', 'CustomerAccount')} />,
    },
  },
  // jhipster-react-native-navigation-declaration-needle
];

export const getEntityRoutes = () => {
  const routes = {};
  entityScreens.forEach((screen) => {
    routes[screen.name] = screen.route;
  });
  return routes;
};

const EntityStack = createStackNavigator();

export default function EntityStackScreen() {
  return (
    <EntityStack.Navigator>
      {entityScreens.map((screen, index) => {
        return <EntityStack.Screen name={screen.name} component={screen.component} key={index} options={screen.options} />;
      })}
    </EntityStack.Navigator>
  );
}

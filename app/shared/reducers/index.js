import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import configureStore from './create-store';
import rootSaga from '../sagas';
import ReduxPersist from '../../config/redux-persist';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  appState: require('./app-state.reducer').reducer,
  users: require('./user.reducer').reducer,
  bookings: require('../../modules/entities/booking/booking.reducer').reducer,
  // jhipster-react-native-redux-store-import-needle
  authInfo: require('./auth-info.reducer').reducer,
  account: require('./account.reducer').reducer,
  login: require('../../modules/login/login.reducer').reducer,
  home: require('../../modules/home/home-reducer').reducer,
  bus: require('../../modules/entities/buses/bus-reducer').reducer,
  payment:require('../../modules/entities/Payment/payment-reducer').reducer,
  parcel:require('../../modules/entities/parcel/parcel.reducer').reducer,
  events:require('../../modules/entities/event/event.reducer').reducer,
  customerAccount:require('../../modules/entities/customer-account/customer-account.reducer').reducer,
  transaction:require('../../modules/entities/transaction/transaction-reducer').reducer,
  profile:require('../../modules/account/profile/Profile.reducer').reducer,
  debts: require('../../modules/entities/debt/debt.reducer').reducer,
  products: require('../../modules/entities/product/product.reducer').reducer,
  business: require('../../modules/entities/business/business.reducer').reducer,
  order: require('../../modules/entities/order/order.reducer').reducer,
  feedbacks: require('../../modules/entities/feedback/feedback.reducer').reducer,
  workers: require('../../modules/entities/worker/worker.reducer').reducer,
  searchs: require('../../modules/entities/search/search.reducer').reducer,
  posts: require('../../modules/entities/post/post.reducer').reducer,
  category: require('../../modules/entities/category/category.reducer').reducer,

});

export default () => {
  let finalReducers = reducers;
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig;
    finalReducers = persistReducer(persistConfig, reducers);
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./index').reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('../sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }

  return store;
};

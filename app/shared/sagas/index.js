import { takeLatest, all } from 'redux-saga/effects';
import API from '../services/api';
import FixtureAPI from '../services/fixture-api';
import AppConfig from '../../config/app-config';

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer';
import { AuthInfoTypes } from '../reducers/auth-info.reducer';
import { LoginTypes } from '../../modules/login/login.reducer';
import { AccountTypes } from '../../shared/reducers/account.reducer';
import { UserTypes } from '../../shared/reducers/user.reducer';
import { HomeTypes } from '../../modules/home/home-reducer';
import { BusTypes } from '../../modules/entities/buses/bus-reducer';
import { PaymentTypes } from '../../modules/entities/Payment/payment-reducer';
import { TransactionTypes } from '../../modules/entities/transaction/transaction-reducer';

import { BookingTypes } from '../../modules/entities/booking/booking.reducer';
import { ParcelTypes } from '../../modules/entities/parcel/parcel.reducer';
import { EventTypes } from '../../modules/entities/event/event.reducer';
import { CustomerAccountTypes } from '../../modules/entities/customer-account/customer-account.reducer';
import { ProfileTypes } from '../../modules/account/profile/Profile.reducer';
import { DebtTypes } from '../../modules/entities/debt/debt.reducer';
import { ProductTypes } from '../../modules/entities/product/product.reducer';
import { BusinessTypes } from '../../modules/entities/business/business.reducer';
import { OrderTypes } from '../../modules/entities/order/order.reducer'
import { FeedbackTypes } from '../../modules/entities/feedback/feedback.reducer'
import { WorkerTypes } from '../../modules/entities/worker/worker.reducer'
import { SearchTypes } from '../../modules/entities/search/search.reducer'
import { PostTypes } from '../../modules/entities/post/post.reducer'
import { CategoryTypes } from '../../modules/entities/category/category.reducer'

// jhipster-react-native-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga';
import { getAuthInfo } from './auth-info.saga';
import { login, logout,signupSocail, loginLoad,verification,registerCustomer,updateTelephone,ResendCode } from '../../modules/login/login.sagas';
import { getAccount, updateAccount ,setUpPin} from '../../shared/sagas/account.sagas';
import UserSagas from '../../shared/sagas/user.sagas';
import BookingSagas from '../../modules/entities/booking/booking.sagas';
import BusinessSagas from '../../modules/entities/business/business.sagas';
import CategorySagas from '../../modules/entities/category/category.sagas';

import ProductSagas from '../../modules/entities/product/product.sagas';
import PostSagas from '../../modules/entities/post/post.sagas';


import { Services, createTransaction, getVersion, getProduct } from '../../modules/home/home-saga';
import { getAllBuses,getBus } from '../../modules/entities/buses/bus-saga';
import { checkOutPayment, PaymentSetup } from '../../modules/entities/Payment/payment-saga';
import { getParcel } from '../../modules/entities/parcel/parcel.sagas';
import { getEventSetup } from '../../modules/entities/event/event.sagas';
import CustomerAccountSagas from '../../modules/entities/customer-account/customer-account.sagas';
import { getAllTransactions,getTransaction } from '../../modules/entities/transaction/transaction-saga';
import { updateProfile, deleteProfile } from '../../modules/account/profile/profile.saga';
import DebtSagas from '../../modules/entities/debt/debt.sagas';
import {
  getOrder,
  getOrders,
  updateOrder,
  completeOrder,
  deleteOrder,
  searchOrders,
  saveCustomerOrders,
  getAllCustomerOrders,
} from '../../modules/entities/order/order.sagas'
import FeedbackSagas from '../../modules/entities/feedback/feedback.sagas'
import WorkerSagas from '../../modules/entities/worker/worker.sagas'
import SearchSagas from '../../modules/entities/search/search.sagas'

// jhipster-react-native-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = AppConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(AuthInfoTypes.AUTH_INFO_REQUEST, getAuthInfo, api),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.SIGNUP_SOCAIL_REQUEST, signupSocail, api),

    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),
    takeLatest(LoginTypes.VERIFICATION_REQUEST, verification, api),
    takeLatest(LoginTypes.REGISTER_REQUEST, registerCustomer, api),
    takeLatest(LoginTypes.UPDATE_TELEPHONE_REQUEST, updateTelephone, api),
    takeLatest(LoginTypes.RESEND_CODE_REQUEST, ResendCode, api),
    takeLatest(ProfileTypes.PROFILE_UPDATE_REQUEST, updateProfile, api),
    takeLatest(ProfileTypes.PROFILE_DELETE_REQUEST, deleteProfile, api),


    takeLatest(HomeTypes.SERVICE_REQUEST, Services, api),
    takeLatest(HomeTypes.CREATE_TRANSACTION_REQUEST, createTransaction, api),
    takeLatest(HomeTypes.HOME_PRODUCT_REQUEST, getProduct, api),
    takeLatest(HomeTypes.VERSION_REQUEST, getVersion, api),

    takeLatest(TransactionTypes.TRANSACTION_ALL_REQUEST, getAllTransactions, api),
    takeLatest(TransactionTypes.TRANSACTION_REQUEST, getTransaction, api),


    takeLatest(BusTypes.BUS_ALL_REQUEST, getAllBuses, api),
    takeLatest(BusTypes.BUS_REQUEST, getBus, api),

    takeLatest(PaymentTypes.CHECK_OUT_REQUEST, checkOutPayment, api),
    takeLatest(PaymentTypes.PAYMENT_SETUP_REQUEST, PaymentSetup, api),
    takeLatest(ParcelTypes.PARCEL_REQUEST, getParcel, api),

    takeLatest(EventTypes.EVENT_SETUP_REQUEST, getEventSetup, api),


    takeLatest(BookingTypes.BOOKING_REQUEST, BookingSagas.getBooking, api),
    takeLatest(BookingTypes.BOOKING_ALL_REQUEST, BookingSagas.getAllBookings, api),
    takeLatest(BookingTypes.BOOKING_UPDATE_REQUEST, BookingSagas.updateBooking, api),
    takeLatest(BookingTypes.BOOKING_DELETE_REQUEST, BookingSagas.deleteBooking, api),
    takeLatest(BookingTypes.BOOKING_SEARCH_REQUEST, BookingSagas.searchBookings, api),

    takeLatest(ProductTypes.PRODUCT_REQUEST, ProductSagas.getProduct, api),
    takeLatest(ProductTypes.PRODUCT_ALL_REQUEST, ProductSagas.getAllProducts, api),
    takeLatest(ProductTypes.PRODUCT_UPDATE_REQUEST, ProductSagas.updateProduct, api),
    takeLatest(ProductTypes.PRODUCT_DELETE_REQUEST, ProductSagas.deleteProduct, api),
    takeLatest(ProductTypes.PRODUCT_SEARCH_REQUEST, ProductSagas.searchProducts, api),
    takeLatest(ProductTypes.PRODUCT_SETUP_REQUEST, ProductSagas.getProductSetup, api),
    takeLatest(ProductTypes.UPLOAD_REQUEST, ProductSagas.uploadImage, api),
    takeLatest(ProductTypes.REPORT_REQUEST, ProductSagas.report, api),
    takeLatest(ProductTypes.PRODUCT_SOLD_REQUEST, ProductSagas.soldProduct, api),

    takeLatest(CategoryTypes.CATEGORY_ALL_REQUEST, CategorySagas.getAllCategorys, api),

    takeLatest(PostTypes.POST_REQUEST, PostSagas.getPost, api),
    takeLatest(PostTypes.POST_ALL_REQUEST, PostSagas.getAllPosts, api),

    takeLatest(OrderTypes.ORDER_REQUEST, getOrder, api),
    takeLatest(OrderTypes.ORDER_ALL_REQUEST, getOrders, api),
    takeLatest(OrderTypes.COMPLETE_ORDER_REQUEST, completeOrder, api),

    takeLatest(OrderTypes.ORDER_UPDATE_REQUEST, updateOrder, api),
    takeLatest(OrderTypes.ORDER_DELETE_REQUEST, deleteOrder, api),
    takeLatest(OrderTypes.ORDER_SEARCH_REQUEST, searchOrders, api),
    takeLatest(OrderTypes.CUSTOMER_ORDER_SAVE, saveCustomerOrders, api),
    takeLatest(OrderTypes.CUSTOMER_ORDER_ALL_REQUEST, getAllCustomerOrders, api),

    takeLatest(FeedbackTypes.FEEDBACK_REQUEST, FeedbackSagas.getFeedback, api),
    takeLatest(FeedbackTypes.FEEDBACK_ALL_REQUEST, FeedbackSagas.getAllFeedbacks, api),
    takeLatest(FeedbackTypes.FEEDBACK_UPDATE_REQUEST, FeedbackSagas.updateFeedback, api),
    takeLatest(FeedbackTypes.FEEDBACK_DELETE_REQUEST, FeedbackSagas.deleteFeedback, api),
    takeLatest(FeedbackTypes.FEEDBACK_SEARCH_REQUEST, FeedbackSagas.searchFeedbacks, api),
    
    takeLatest(WorkerTypes.WORKER_REQUEST, WorkerSagas.getWorker, api),
    takeLatest(WorkerTypes.WORKER_ALL_REQUEST, WorkerSagas.getAllWorkers, api),
    takeLatest(WorkerTypes.WORKER_CATEGORY_ALL_REQUEST, WorkerSagas.getAllWorkerCategories, api),
    takeLatest(WorkerTypes.WORKER_UPDATE_REQUEST, WorkerSagas.updateWorker, api),
    takeLatest(WorkerTypes.WORKER_DELETE_REQUEST, WorkerSagas.deleteWorker, api),
    takeLatest(WorkerTypes.WORKER_SEARCH_REQUEST, WorkerSagas.searchWorkers, api),

    takeLatest(SearchTypes.SEARCH_ALL_REQUEST, SearchSagas.getAllSearchs, api),
    takeLatest(SearchTypes.SEARCH_SEARCH_REQUEST, SearchSagas.searchSearchs, api),


    takeLatest(BusinessTypes.BUSINESS_REQUEST, BusinessSagas.getBusiness, api),
    takeLatest(BusinessTypes.BUSINESS_ALL_REQUEST, BusinessSagas.getAllBusinesss, api),
    takeLatest(BusinessTypes.BUSINESS_UPDATE_REQUEST, BusinessSagas.updateBusiness, api),
    takeLatest(BusinessTypes.BUSINESS_DELETE_REQUEST, BusinessSagas.deleteBusiness, api),
    takeLatest(BusinessTypes.BUSINESS_SEARCH_REQUEST, BusinessSagas.searchBusinesss, api),

    takeLatest(DebtTypes.DEBT_REQUEST, DebtSagas.getDebt, api),
    takeLatest(DebtTypes.DEBT_ALL_REQUEST, DebtSagas.getAllDebts, api),
    takeLatest(DebtTypes.DEBT_UPDATE_REQUEST, DebtSagas.updateDebt, api),
    takeLatest(DebtTypes.DEBT_DELETE_REQUEST, DebtSagas.deleteDebt, api),
    takeLatest(DebtTypes.DEBT_SEARCH_REQUEST, DebtSagas.searchDebts, api),
    takeLatest(DebtTypes.DEBT_UPDATE_HISTORY_REQUEST, DebtSagas.updateDebtHistory, api),
    takeLatest(DebtTypes.DEBT_DELETE_HISTORY_REQUEST, DebtSagas.deleteHistoryDebt, api),
    takeLatest(DebtTypes.DEBT_UPDATE_STATUS_REQUEST, DebtSagas.updateDebtStatus, api),
    takeLatest(DebtTypes.DEBT_UPDATE_STATUS_HISTORY_REQUEST, DebtSagas.updateDebtStatusHistory, api),


    takeLatest(CustomerAccountTypes.CUSTOMER_ACCOUNT_ALL_REQUEST, CustomerAccountSagas.getAllCustomerAccounts, api),
    takeLatest(CustomerAccountTypes.CUSTOMER_ACCOUNT_REQUEST, CustomerAccountSagas.getCustomerAccount, api),
    takeLatest(CustomerAccountTypes.CUSTOMER_ACCOUNT_UPDATE_REQUEST, CustomerAccountSagas.updateCustomerAccounts, api),
    takeLatest(CustomerAccountTypes.CUSTOMER_ACCOUNT_DELETE_REQUEST, CustomerAccountSagas.deleteCustomerAccounts, api),

    // jhipster-react-native-saga-redux-connect-needle

    takeLatest(UserTypes.USER_ALL_REQUEST, UserSagas.getAllUsers, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api),
    takeLatest(AccountTypes.SETUP_PIN_REQUEST, setUpPin, api),

  ]);
}

// a library to wrap and simplify api calls
import apisauce from 'apisauce';
import axios from 'axios';

import AppConfig from '../../config/app-config';

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 1000000,
  });

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth);
  const removeAuthToken = () => api.deleteHeader('Authorization');
  // use an empty Authorization header in the auth-info request to prevent an invalid token from returning 401
  const getOauthInfo = () => api.get('api/auth-info', {}, { headers: { Authorization: undefined } });
  const getOauthIssuerInfo = (issuerUrl) => api.get(`${issuerUrl}/.well-known/openid-configuration`);
  const verifyTelephone = (user) => api.put('api/auth/verify-telephone', user);
  const updateTelephone = (user) => api.put('api/auth/update-telephone/'+user.id, {data:user});
  const ResendCode = (phoneNumber) => api.post('api/auth/send-phone-verification', phoneNumber)
  const updateProfile= (data) => api.put('api/auth/update-customer/'+data.id, { data })
 


  const registerTelephone = (telephone) => api.post('api/auth/register-telephone', telephone);
  const signupSocail = (user) => api.post('api/auth/sign-up-socail', user);
  const register = (customer) => api.put(`api/auth/register-customer/`+customer.id, customer);
  const getServices = (options) => api.get(`api/home-category`, options);
  const getAllbuses = (options) => api.get(`api/available-bus`, {},
  { headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/plain, */*' },
    params:{filter:options.filter}
  }
  )
  const setupPinAccount = (customer) => api.put(`api/auth/setup-pin-customer/`+customer.id, customer);

  const getParcel = (serialNumber) => api.get(`api/parcel/`+serialNumber)
  const getbus = (id,travelDate) => api.get(`api/available-bus/`+id, {travelDate});
  
  const getVersion = (option) => api.get(`api/update-checker/`, {option});

  const forgotPassword = (data) =>
    api.post('api/account/reset-password/init', data, {
      headers: { 'Content-Type': 'text/plain', Accept: 'application/json, text/plain, */*' },
    });
  const getEventSetup = (option) => api.get('api/event-setup');
  const getAccount = () => api.get('api/auth/customer');
  const updateAccount = (account) => api.post('api/account', account);
  const changePassword = (currentPassword, newPassword) =>
    api.post(
      'api/account/change-password',
      { currentPassword, newPassword },
      { headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/plain, */*' } },
    );



  const getUser = (userId) => api.get('api/users/' + userId);
  const getAllUsers = (options) => api.get('api/users', options);
  const createUser = (user) => api.post('api/users', user);
  const updateUser = (user) => api.put('api/users', user);
  const deleteUser = (userId) => api.delete('api/user/' + userId);

  const getBooking = (bookingId) => api.get('api/bookings/' + bookingId);
  const getAllBookings = (options) => api.get('api/booking/'+options.id,);
  const createBooking = (booking) => api.post('api/booking', booking);
  const updateBooking = (booking) => api.put(`api/bookings/${booking.id}`, booking);
  const deleteBooking = (bookingId) => api.delete('api/bookings/' + bookingId);
  const searchBookings = (query) => api.get('api/_search/bookings', { query: query });
  const evcpayment = (data) => api.post(`https://api.waafi.com/asm`, data,
  { headers: { 'Content-Type': 'application/json', authorization:  null} },)
  const getAllCustomerAccounts = (id) => api.get('api/customer-account-list/'+id);
  const getCustomerAccount = (id) => api.get('api/customer-account/'+id);
  const createCustomerAccount = (customerAccount) => api.post('api/create-customer-account', {data:customerAccount});
  const updateCustomerAccount = (account) => api.put(`api/update-customer-account/${account.id}`, {data:account});
  const deleteCustomerAccount = (id) => api.delete('api/customer-account/'+id);
  const getChargeFee = (transaction) => api.post(`api/charge-fee-calculation`, {data:transaction});
  const createTransaction = (transaction) => api.post('api/create-transaction', {data:transaction});
  const getAllTransaction = (options) => api.get(`api/transaction-list-by-customer/`+options.id, {},
  { headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/plain, */*' },
    params:{filter:options.filter}
  }
  )
  const getTransaction = (id,travelDate) => api.get(`api/available-bus/`+id, {travelDate});
  const getDebt = (debtId) => api.get('api/debt/' + debtId);
  const getAllDebts = (options) => api.get('api/debt-by-customer/'+options.id, options);
  const createDebt = (debt) => api.post('api/debt-create', debt);
  const updateDebt = (debt) => api.put(`api/debts/${debt.id}`, debt);
  const deleteDebt = (debtId) => api.delete('api/debt/' + debtId);
  const searchDebts = (query) => api.get('api/_search/debts', { query: query });
  const createHistoryDebt = (debt) => api.post('api/debt-history-create', debt);
  const updateHistoryDebt = (debt) => api.put(`api/debts/${debt.id}`, debt);
  const getAllHistoryDebts = (options) => api.get('api/debt-by-customer/'+options.id, options);
  const deleteHistoryDebt = (debtId) => api.delete('api/debt-history/' + debtId);
  const updateStatusDebt = (id, debt) => api.put(`api/debt-status/${id}`, debt);
  const updateStatusDebtHistory = (id, debt) => api.put(`api/debt-history-status/${id}`, debt);
  const getProduct = (product) => api.get(`api/home-product`, {data:product});
  const getProductDetail = (productId) => api.get(`api/home-product/`+productId);
  const getProductSetup = (product) => api.get(`api/product-setup`, {data:product});
  const reportProduct = (report) => api.post(`api/product-report`, {data:report});


  const getBusiness = (businessId) => api.get('api/business/' + businessId);
  const getAllBusiness = (options) => api.get('api/business', options);
  const createBusiness = (booking) => api.post('api/booking', booking);
  const updateBusiness = (booking) => api.put(`api/bookings/${booking.id}`, booking);
  const deleteBusiness = (bookingId) => api.delete('api/bookings/' + bookingId);
  const searchBusiness = (query) => api.get('api/business',  query );
  

  const getFeedback = (bookingId) => api.get('api/bookings/' + bookingId);
  const getAllFeedbacks = (options) => api.get('api/feedback', options );
  const createFeedback = (feedback) => api.post('api/feedback', {data:feedback});
  const updateFeedback = (feedback) => api.put(`api/feedback/${feedback.id}`, {data:feedback});
  const deleteFeedback = (bookingId) => api.delete('api/bookings/' + bookingId);
  const searchFeedbacks = (query) => api.get('api/_search/bookings', { query: query });

  const getWorker = (bookingId) => api.get('api/employee/' + bookingId);
  const getAllWorkers = (options) => api.get('api/employee', options );
  const getAllWorkerCategories = (options) => api.get('api/employee-category', options );

  const createWorker = (booking) => api.post('api/booking', {data:booking});
  const updateWorker = (booking) => api.put(`api/booking/${booking.id}`, {data:booking});
  const deleteWorker = (bookingId) => api.delete('api/bookings/' + bookingId);
  const searchWorkers = (query) => api.get('api/_search/bookings', { query: query });

  
  const createProduct = (product) => api.post('api/product', {data:product});
  const getAllPosts = (options) => api.get('api/customer-product', options );
  const paymentSetup = (options) => api.get('api/payment-setup', options );
  const createPayment = (payment) => api.post('api/payment', {data:payment});
  const updateProduct = (product) => api.put(`api/product/${product.id}`, {data:product});

  const soldProduct = (product) => api.put(`api/product-status/${product.id}`, {data:product});

  const getAllSearchs = (options) => api.get('api/product', options );
  const searchSearchs = (query) => api.get('api/product',  query );
  const getAllCategorys = (options) => api.get('api/category', options );
  const deleteProduct = (id) => api.delete(`api/product/`+id);
  const fetchFileCredentials= (data )=> api.get(`api/file/credentials`,data)
  const uploadImage =  (url,formData) =>   axios.post(url, formData, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    timeout:122000
  });

  // jhipster-react-native-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createUser,
    updateUser,
    getAllUsers,
    getUser,
    deleteUser,
    verifyTelephone,
    registerTelephone,
    signupSocail,

    getServices,
    evcpayment,
    createProduct,
    getAllPosts,
    paymentSetup,
    createPayment,
    updateProduct, 
    getAllSearchs,
    searchSearchs,
    getAllCategorys,
    deleteProduct,
    reportProduct,
    
    createBusiness,
    updateBusiness,
    getAllBusiness,
    getBusiness,
    deleteBusiness,
    searchBusiness,

    createFeedback,
    updateFeedback,
    getAllFeedbacks,
    getFeedback,
    deleteFeedback,
    searchFeedbacks,

    createWorker,
    updateWorker,
    getAllWorkers,
    getAllWorkerCategories,
    getWorker,
    deleteWorker,
    searchWorkers,

    createBooking,
    updateBooking,
    getAllBookings,
    getBooking,
    deleteBooking,
    searchBookings,
    // jhipster-react-native-api-export-needle
    setAuthToken,
    removeAuthToken,
    getOauthInfo,
    getOauthIssuerInfo,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword,
    getAllbuses,
    getbus,
    updateTelephone,
    ResendCode,
    getParcel,
    getEventSetup,
    setupPinAccount,
    getCustomerAccount,
    getAllCustomerAccounts,
    createCustomerAccount,
    updateCustomerAccount,
    deleteCustomerAccount,
    createTransaction,
    getChargeFee,
    getAllTransaction,
    getTransaction,
    updateProfile,
    uploadImage,
    fetchFileCredentials,
    getVersion,

    createDebt,
    updateDebt,
    getAllDebts,
    getDebt,
    deleteDebt,
    searchDebts,

    createHistoryDebt,
    updateHistoryDebt,
    getAllHistoryDebts,
    deleteHistoryDebt,
    updateStatusDebt,
    updateStatusDebtHistory,
    getProduct,
    getProductDetail,
    getProductSetup,
    soldProduct
  };
};

// let's return back our create method as the default.
export default {
  create,
};

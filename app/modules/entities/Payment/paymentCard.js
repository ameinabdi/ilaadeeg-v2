import React, { useState } from 'react';
import { ScrollView,TouchableOpacity,KeyboardAvoidingView, SafeAreaView,TouchableHighlight,FlatList,TextInput, Text, Image,ImageBackground, View, Platform, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import PaymentActions from './payment-reducer';
import styles from  './paymentCard.style';
import { Button  } from 'native-base';
import Toast from 'react-native-toast-message';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import appConfig from '../../../config/app-config';
import axios from 'axios'; 

 function CheckoutScreen(props) {
    const {confirmPayment, loading} = useState();
    const { fetching,account,paymentType,product,error } = props;

    useDidUpdateEffect(() => {
        if (!fetching && error) {
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Error',
            text2: error,
            visibilityTime: 8000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
            
          });
        }else{
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Success',
                text2: "Successfully Paid",
                visibilityTime: 8000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
                
              });        }
      }, [fetching]);
    const fetchPaymentIntentClientSecret = async () => {
        const response = await axios.post(`${appConfig.apiUrl}api/create-payment-intent`, {
            data:paymentType
          })
        const clientSecret =  response.data
    
        return clientSecret;
      };
    
     const handlePayPress = async () => {
        const billingDetails = {
            email:account.email,
          };
        // Fetch the intent client secret from the backend.
        const clientSecret = await fetchPaymentIntentClientSecret();
        // Confirm the payment with the card details
        const {paymentIntent, error: errorPay} = await confirmPayment(clientSecret, {
            paymentMethodType: 'Card',
            paymentMethodData: {
            billingDetails,
            },
        });
  
      if (errorPay) {
        Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: errorPay.message,
            visibilityTime: 8000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
            
          });
      } else if (paymentIntent) {
        const paymentObject ={
            paymentType:"Card",
            productType:"Product",
            amount:0,
            accountName:account.fullName,
            accountNumber: account?.phoneNumber?.slice(4),
            product:product.id,
            paymentMethodId:paymentType.id,
          }
        checkOutRequest(paymentObject)
      }
    };
  
    
  
    return (
       <View>
        <Button style={styles.button} onPress={handlePayPress}  disabled={loading}>
            <Text style={styles.buttonText} >Pay</Text>
        </Button>
      </View>
    );
  }

  const mapStateToProps = (state) => {
    return {
      // ...redux state to props here
      account: state.account.account,
      fetching: state.payment.fetchingTransaction,
      error: state.payment.errorTransaction,
      paymentSetup: state.payment.paymentSetup,
      errorPayment: state.payment.errorPayment,
      fetchingPayment: state.payment.fetchingPayment,
      fullProduct: state.home.fullproduct,
      success: state.payment.success,
     };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
        getpaymentSetup : (option) => dispatch(PaymentActions.paymentSetupRequest(option)),
        checkOutRequest : (order,payment) => dispatch(PaymentActions.checkOutRequest(order, payment)),
        resetPayment:() => dispatch(PaymentActions.resetPayment()),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen);
  
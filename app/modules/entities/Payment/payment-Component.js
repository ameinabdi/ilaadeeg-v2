import React from 'react';
import { ScrollView,TouchableOpacity,KeyboardAvoidingView, SafeAreaView,TouchableHighlight,FlatList,TextInput, Text, Image,ImageBackground, View, Platform, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Container, Header,Content, Tab,Picker,Textarea, Tabs,Left,Right, ScrollableTab, Body, Button as ButtonNative } from 'native-base';
import {  Colors,Animation,Images } from '../../../shared/themes';
import { useFocusEffect } from '@react-navigation/native';
import styles from './payment-Component.styles';
import Icon from 'react-native-vector-icons/AntDesign'
import { Col, Row, Grid } from "react-native-easy-grid";
import PaymentActions from './payment-reducer';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
// import { CheckBox } from 'react-native-elements'
import moment from 'moment';
import Toast from 'react-native-toast-message';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import { CommonActions } from '@react-navigation/native';
import images from '../../../shared/themes/images';
import {RadioButton } from 'react-native-ui-lib'; //eslint-disable-line
import {     DateTimePicker} from 'react-native-ui-lib';
import LoadingComponent from '../../../shared/components/loading/loadin-component';
import { FormProvider, useForm } from 'react-hook-form'
import CreditCardForm, { Button, FormModel } from 'rn-credit-card'
import {useTranslation} from 'react-i18next';
import PaymentCard from './paymentCard';

function PaymentComponent(props) {
    const [typePayment, setTypePayment] = React.useState(null);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [SuccessModel, setSuccessModel] = React.useState(false);
    const {t, i18n} = useTranslation();

    const [cardNum, setCardNum] = React.useState(null);
    const [expDate, setExpDate] = React.useState(null);
    const formMethods = useForm({
      // to trigger the validation on the blur event
      mode: 'onBlur',
      defaultValues: {
        holderName: '',
        cardNumber: '',
        expiration: '',
        cvv: '',
      },
    })
    const { handleSubmit, formState } = formMethods

    const { route,account,paymentType,product, handleModal,transaction, paymentSetup, getpaymentSetup, fetchingOrder,error, success,checkOutRequest, navigation, order, fetching,resetPayment  } = props;
    const [telephone, setTelephone] = React.useState(account?.phoneNumber.slice(4));

    useFocusEffect(
      React.useCallback(() => {
        setSuccessModel(false)
        if(paymentType?.type === "Free"){
          handlePayFree()
        }
        if(telephone.substring(0,2) === "65"){
          setTypePayment("Edahab")
        }else if(telephone.substring(0,2) === "63"){
          setTypePayment("Zaad")
        } 
       if(telephone.substring(0,2) === "61"){
          setTypePayment("evc")
        }else if(telephone.substring(0,2) === "09"){
          setTypePayment("golis")
        }
        else{
          setTypePayment(null)
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
      }, [setSuccessModel,paymentType,handlePayFree ]),
    );

    useDidUpdateEffect(() => {
      if (!fetching && error) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: error,
          visibilityTime: 8000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          
        });
      }else if(success && transaction){
        handleModal()
        props.navigation.navigate('ProductViewScreen',{productItem:product})
      }
    }, [fetching]);


     onSubmit =(model)=> {
      if(model){
        const paymentObject ={
          paymentType:"Product",
          amount:paymentType?.service?.amount,
          accountName:model?.holderName,
          card: model,
          service:paymentType?.service?.id,
          product:product.id,
          paymentMethodId:paymentType.id,
        }
        checkOutRequest(paymentObject)
      }else{
        const paymentObject ={
          paymentType:"Product",
          amount:paymentType?.service?.amount,
          accountName:account.fullName,
          accountNumber: telephone ? telephone : account?.phoneNumber?.slice(4),
          product:product.id,
          service:paymentType?.service?.id,
          paymentMethodId:paymentType.id,
        }
        checkOutRequest(paymentObject)
      }
    }
  

  const handlePayFree =()=>{
    const paymentObject ={
      paymentType:"Product",
      amount:0,
      accountName:account.fullName,
      accountNumber: telephone ? telephone : account?.phoneNumber?.slice(4),
      product:product.id,
      paymentMethodId:paymentType.id,
      type:'Free'
    }
    checkOutRequest(paymentObject)
  }
 
if(fetching ){
    return (
      <View style={styles.loadingContainer}>
        <LottieView source={Animation.payment}  autoPlay loop  style={styles.animation}/>
        <Text style={styles.modelTitle}>Waiting For Accepting Payment</Text>
      </View>
    )
} 
if(!paymentType ){
 return null
} 
if(SuccessModel){
  return(
    <Container style={styles.container}>
        <View style={styles.successmodelContainer}>
          <LottieView source={Animation.done} autoPlay loop style={styles.animation} />
          <Text style={styles.textSuccess}>{t('screen.payment.successfully')}</Text>
        </View>
    </Container>
  )
}
   
if(paymentType?.type =="Wallet"){
  return(       
    <Container style={styles.container}>
        <KeyboardAvoidingView
          style={styles.wrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
           <View style={styles.row} animation="fadeInUp" delay={300}>
                    <FlatList
                        data={["Zaad","evc","golis", "Edahab"]}
                        style={styles.shipmentContainer}
                        numColumns={3}
                        renderItem={({ item, index}) => (
                            <View style={typePayment  ===  item ? styles.Selectpayment:styles.payment}>
                            <View style={styles.checkView}>
                              {/* <CheckBox
                                checkedIcon={<View style={styles.checkboxItem}><AntDesign name="check" size={10} color={Colors.white} /></View>}
                                uncheckedIcon={<View style={styles.uncheckboxItem}><AntDesign name="close" size={10} color={Colors.primary} /></View>}
                                checked={typePayment  ==  item  ? true : false}
                                // onPress={() => this.setState({shipment: !this.state.shipment})}
                              /> */}
                              </View>
                              <Image source={images[item]} style={typePayment ==  item ? styles.SelectpaymentIcon :styles.paymentIcon}/>
                              <Text style={typePayment ==  item ? styles.SelectpaymentDesc: styles.paymentDesc}>{item.description}</Text>
                              <Text style={typePayment  ==  item  ? styles.SelectpaymentTime: styles.paymentTime}>{item.deliveryTime}</Text>
                            </View>
                        )}
                        extraData={typePayment}

                      />
                    </View>
                <View style={styles.row} animation="fadeInUp" delay={300}>
                        <Text style={styles.rowLabel}>{t('screen.payment.paymentPhone')}</Text>
                        <View style={styles.input}>
                        <Icon name="phone" size={20} color={Colors.primary} style={styles.inputIcon}/>
                        <TextInput
                            ref={(c) => {
                              this.usernameInput = c
                            }}
                            testID="loginScreenUsername"
                            style={styles.textInput}
                            value={telephone}
                            defaultValue={account?.phoneNumber.slice(4)}
                            keyboardType="decimal-pad"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            maxLength={9}
                            onChangeText={(text)=>{
                              setTelephone(text)
                              const cellphone =text;
                              if(cellphone.substring(0,2) === "65" || cellphone.substring(0,2) === "62"){
                                setTypePayment("Edahab")
                              }else if(cellphone.substring(0,2) === "61"){
                                setTypePayment("evc")
                              }else if(cellphone.substring(0,2) === "63"){
                                setTypePayment("Zaad")
                              }else if(cellphone.substring(0,2) === "09"){
                                setTypePayment("golis")
                              }else{
                                setTypePayment(null)
                              }
                            }}
                            underlineColorAndroid="transparent"
                            placeholder="6x xxxxxx"
                          /> 
                        </View>
                      </View>
                      <Text style={styles.paymentText}>{paymentType.accountName}</Text>
            <ButtonNative transparent style={styles.WalletButton} onPress={()=>onSubmit()}>
              <Text style={styles.WalletbuttonText}>{paymentType?.service?.amount} {t('screen.payment.confirmPayment')}</Text>
            </ButtonNative>
        </KeyboardAvoidingView>
    </Container> 
) 
  }
  if(paymentType?.type =="Free"){
  return(
    <Container style={styles.container}>
        <View style={styles.successmodelContainer}>
          <LottieView source={Animation.done} autoPlay loop style={styles.animation} />
          <Text style={styles.textSuccess}>{t('screen.payment.successfully')}</Text>
          <ButtonNative transparent style={styles.WalletButton} onPress={()=>{
           handleModal()
           props.navigation.navigate('ProductViewScreen',{productItem:product})
          }}>
              <Text style={styles.WalletbuttonText}>{paymentType?.service?.amount}Go Back</Text>
          </ButtonNative>
        </View>
    </Container>
  )
  }
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
      transaction: state.payment.transaction,

     };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getpaymentSetup : (option) => dispatch(PaymentActions.paymentSetupRequest(option)),
        checkOutRequest : (order,payment) => dispatch(PaymentActions.checkOutRequest(order, payment)),
        resetPayment:() => dispatch(PaymentActions.resetPayment()),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PaymentComponent);
  
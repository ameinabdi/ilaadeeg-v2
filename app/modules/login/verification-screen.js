import React from 'react';
import { StatusBar,SafeAreaView, ScrollView, TouchableOpacity,Image,  Text, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Card, CardItem, Body, Form,Button, Item, Picker,Input, Container,Header, Left, Right } from 'native-base';
import { Images,Animation,Colors }  from '../../shared/themes'
import Icon from 'react-native-vector-icons/AntDesign';
import { createAnimatableComponent, View } from 'react-native-animatable';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LoginActions from './login.reducer';
import LottieView from 'lottie-react-native';
import styles from './verification-screen.style';
import Modal from "react-native-modal";
import PhoneInput from "react-native-phone-number-input";
import LoadingComponent from '../../shared/components/loading/loadin-component';
import { useDidUpdateEffect } from '../../shared/util/use-did-update-effect';
import Toast from 'react-native-toast-message';
import ModelLoadingComponent from '../../shared/components/loading/model-loading-component';
import '../../../i18n';
import {useTranslation} from 'react-i18next';
import OTPTextInput from 'react-native-otp-textinput';


function verificationScreen(props) {
  const { navigation, account, fetching,updating,errorUpdating,accountFetching, updateCustomer,errorResend, fetchingResend, ResendCode,resendOpt, error,updateTelephone, VerifyCustomer, fetchingAccount, fetchingAuthInfo, authInfoError } = props;
  // setup error state for displaying error messages
  const [verificationCode, setVerificationCode] = React.useState(null);
  const [loginError, setLoginError] = React.useState('');
  const [isModalVisible, setModalVisible] =React.useState(false);
  const [value, setValue] = React.useState(account?.phoneNumber?.slice(4));
  const [formattedValue, setFormattedValue] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const {t, i18n} = useTranslation();
  let otpInput = React.useRef(null);

  React.useEffect(() => {
    if (account.verified) {
        if(account.fullName){
            navigation.navigate('Register');
        }
      navigation.navigate('Register');
    }
  }, [account, navigation]);

  useDidUpdateEffect(() => {
    if (!updating) {
      if (errorUpdating) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'error',
          text2: errorUpdating,
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          
        });
      } else if(updateCustomer) {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'success',
          text2: 'successfully Updated Telephone',
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          
        });
      }
      if(!fetchingResend){
        if(errorResend){
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'error',
            text2: errorResend,
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        }else{
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'success',
            text2: 'successfully Sent New OPT Code',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
            
          });
        }
      }
    }
    setShowModal(false)
  }, [updateCustomer, updating,errorResend,fetchingResend, errorUpdating, navigation]);
  
  useDidUpdateEffect(() => {
      if(!fetching){
        if(error){
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'error',
            text2: error,
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        }else{
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'success',
            text2: 'successfully Sent New OPT Code',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
            
          });
        }
      }
    setShowModal(false)
  }, [fetching,error]);
  const Submit = ()=>{
      const customer = {
        telephone:account?.phoneNumber,
        verificationCode:verificationCode
      }
    VerifyCustomer(customer)
    setShowModal(true)

  }
  const handleEditTelephone = () =>{
    setModalVisible(!isModalVisible);

  }
  const resend = () =>{
    ResendCode(account?.phoneNumber)
    setShowModal(true)
  }

  const handleVerify = ()=> {
    if(formattedValue){
      const checkValid = formattedValue.length != 13 ? true :false ;
      if(checkValid){
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'error',
          text2: 'In Valid Telephone Number, Number Must be 9 Digit Start From 6x',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          
        });
      }else{
        const customer = {
          id:account.id,
          telephone:formattedValue
        }
        updateTelephone(customer)
        setModalVisible(!isModalVisible);

      }
    }else{
      setModalVisible(!isModalVisible);
    }
    setShowModal(true)
  }
  // skip the first render but check for API responses and show error if not fetching
  if(fetching || showModal || accountFetching){
    return (
      <ModelLoadingComponent />
    )
  }

  return (
    <>
        <Container>       
        <View  style={styles.header}>
            <Left>
               <Icon name="left" color={Colors.primary} style={styles.backbutton} size={20}  onPress={()=>navigation.navigate('Login')}/>
            </Left>
            <Body />
            <Right/>
        </View>
        <KeyboardAwareScrollView style={styles.wrapper} keyboardShouldPersistTaps={'handled'} >
           <View style={styles.cardView}>
             <CardItem style={styles.carditem}>
               <LottieView source={Animation.verification} autoPlay loop style={styles.animation} />
             </CardItem>
            <CardItem style={styles.carditem}>
               <Text style={styles.title}>{t('screen.verification.subtitle')}
               </Text>
               <Text style={styles.subtitle}>{account?.phoneNumber} 
               <Button style={styles.editButton} transparent onPress={handleEditTelephone}>
                  <Icon name="edit" color={Colors.primary} size={20} />
               </Button>
               </Text> 
            </CardItem>
            <CardItem>
              <Body style={styles.row}>
            <OTPTextInput 
            ref={e => (otpInput = e)} 
            inputCount={4}
            tintColor={Colors.primary}
            offTintColor={Colors.secondary}
            handleTextChange={(text)=>(setVerificationCode(text))}
            containerStyle={styles.underlineStyleHighLighted}
            textInputStyle={styles.underlineStyleBase}
          />
              </Body>
            </CardItem>
             <CardItem>
              
            </CardItem>
           
            </View>
            {
            fetching ?
            <Button block light style={styles.button}>
            <LottieView source={Animation.loadingButton}  autoPlay loop />
          </Button>
            :
            <Button block light style={styles.button} onPress={Submit}>
                  <Text style={styles.buttontext}>{t('screen.verification.verify')}</Text>
                </Button>
            }
            <Text style={styles.text}> 
            {t('screen.verification.footerDescription')}
            </Text>
              <Button transparent   style={styles.resend}onPress={resend}>
                  <Text style={styles.resendtext}>{t('screen.verification.resend')}</Text>
           </Button>

           </KeyboardAwareScrollView>
      </Container>
      <Modal isVisible={isModalVisible} style={styles.model}>
              <View style={styles.modelView}>
                <View style={styles.modelHeader}>
                <Text style={styles.modelTitle}>{t('screen.verification.editTitle')}</Text>
                <Button  onPress={handleEditTelephone} transparent>
                  <Icon name="close" color={Colors.text} size={20} />
                </Button>
                </View>
                {
                  updating ?
                    <LoadingComponent />
                  :
                  <View style={styles.modelContent}>
                  <SafeAreaView style={styles.wrapper}>
                  <PhoneInput
                    defaultValue={value}
                    defaultCode="SO"
                    layout="second"
                    placeholder="6X XXXXXXX"
                    max={9}
                    onChangeText={(text) => {
                      setValue(text);
                    }}
                    onChangeFormattedText={(text) => {
                      setFormattedValue(text);
                    }}
                    withDarkTheme
                    autoFocus
                    containerStyle={styles.phonenumber}
                  />
          {
            fetching ?
            <TouchableOpacity
            style={styles.button}
            disabled
           >
            <LottieView source={Animation.loadingButton}  autoPlay loop />
          </TouchableOpacity>
            :
                  <TouchableOpacity
                    style={styles.modelButton}
                    onPress={handleVerify}
                  >
                    <Text style={styles.modelButtonText}>{t('screen.verification.update')}</Text>
                  </TouchableOpacity>
}
                </SafeAreaView>
                  </View>
                }
               
              </View>
            </Modal>
      </>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    accountFetching: state.account.fetching,

    fetching: state.login.fetchingVerification,
    error: state.login.errorVerification,
    updating: state.login.updating,
    errorUpdating: state.login.errorUpdating,
    updateCustomer: state.login.updateCustomer,
    errorResend:state.login.errorResend,
    fetchingResend:state.login.fetchingResend,
    resendOpt:state.login.resend,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    VerifyCustomer: (customer) => dispatch(LoginActions.verificationRequest(customer)),
    updateTelephone: (customer) => dispatch(LoginActions.updateTelephoneRequest(customer)),
    ResendCode: (phone) => dispatch(LoginActions.resendCodeRequest(phone)),

};
};

export default connect(mapStateToProps, mapDispatchToProps)(verificationScreen);

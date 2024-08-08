import React from 'react';
import { StatusBar,SafeAreaView, ScrollView, TouchableOpacity,  Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Card, CardItem, Body,  Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col } from 'native-base';
import { Images,Animation,Colors }  from '../../shared/themes'
import Icon from 'react-native-vector-icons/AntDesign';
import { createAnimatableComponent, View } from 'react-native-animatable';
import LoginActions from './login.reducer';
import styles from './register-screen.style';
import { useDidUpdateEffect } from '../../shared/util/use-did-update-effect';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import ModelLoadingComponent from '../../shared/components/loading/model-loading-component';
import '../../../i18n';
import {useTranslation} from 'react-i18next';

function RegisterScreen(props) {
  const { navigation, account, fetching, error,finished, VerifyCustomer, RegisterCustomer, fetchingAuthInfo, authInfoError } = props;
  // setup error state for displaying error messages
  const [verificationCode, setVerificationCode] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [email, setemail] = React.useState(null);
  const [showContent, setShowContent] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const {t, i18n} = useTranslation();

  const showDate = (currentMode) => {
    setShow(true);
  };
  const _onDateChange = (e, newDate) => {
    setemail(newDate);
    setShow(false)
  };

  React.useEffect(() => {
     if(account.fullName){
        navigation.navigate('Home');
      }
      setShowModal(true)
  }, [account,showModal, navigation]);

  useDidUpdateEffect(() => {
    if (!fetching) {
      if (error) {
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
      } else if(finished) {
        navigation.navigate('Home');
      }
    }
  }, [fetching, error,finished, navigation]);
  

  const Submit = ()=>{
      const customer = {
       id:account.id,
       fullName: firstName+' '+lastName,
       email:email
      }
      if(firstName == null || lastName == null ){
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'error',
          text2: 'Empty Feild Please Make Sure',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          
        });
      }else{
        RegisterCustomer({id:account.id, data:customer})
        setShowModal(true)
      }
  }

 const dismissBottomToast = () => {
    setShowContent(false)
   }

  // skip the first render but check for API responses and show error if not fetching
  if(fetching && showModal){
    return (
      <ModelLoadingComponent />
    )
  }
  return (
        <>
        <Container>       
        <View style={styles.header}>
            <Left>
               <Icon name="left" color={Colors.primary} style={styles.backbutton} size={20}  onPress={()=>navigation.goBack()}/>
            </Left>
            <Body />
            <Right/>
        </View>
        <Content style={styles.content}>
        
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.subheader}>
              <Text style={styles.title}>{t('screen.createProfile.title')}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.rowLabel}>{t('screen.createProfile.firstName')} </Text>
            <View style={styles.input}>
                <TextInput 
                 style={styles.textInput}
                 placeholder={t('screen.createProfile.firstName')}
                 onChangeText={text => setFirstName(text)}
                 value={firstName}
                 autoCorrect={false}
                />
          </View>
          </View>
           <View style={styles.row} >
            <Text style={styles.rowLabel}>{t('screen.createProfile.lastName')}</Text>
            <View style={styles.input}>
                <TextInput 
                 style={styles.textInput}
                 placeholder={t('screen.createProfile.lastName')}
                 onChangeText={text => setLastName(text)}
                 value={lastName}
                 autoCorrect={false}
                />
            </View>
            </View>
            <View style={styles.row} >
            <Text style={styles.rowLabel}>{t('screen.createProfile.email')} </Text>
            <View style={styles.input}>
                <TextInput 
                 style={styles.textInput}
                 placeholder={t('screen.createProfile.email')}
                 onChangeText={text => setemail(text)}
                 autoCorrect={false}
                 autoCapitalize={false}
                 value={email}
                />
            </View>
             </View>
            <Button block light style={styles.button} onPress={()=>Submit()}>
                  <Text style={styles.buttontext}>{t('screen.createProfile.finished')}</Text>
           </Button>
          
        </SafeAreaView>
        
        </Content>
       
      </Container>
      </>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    fetching: state.login.fetchingRegister,
    error: state.login.errorRegister,
    finished: state.login.finished,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    VerifyCustomer: (customer) => dispatch(LoginActions.verificationRequest(customer)),
    RegisterCustomer: (customer) => dispatch(LoginActions.registerRequest(customer)),

};
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

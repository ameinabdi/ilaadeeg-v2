import React from 'react';
import { Button, StatusBar, SafeAreaView, Image, TouchableOpacity, Text, ActivityIndicator, View, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardItem, Body, Form, Item, Picker, Container, Header, Left, Right, Content, Row, Col } from 'native-base';
import { useDidUpdateEffect } from '../../shared/util/use-did-update-effect';
import styles from './login-screen.styles';
import PhoneInput from "react-native-phone-number-input";
import { Colors, Animation, Images } from '../../shared/themes';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import ModelLoadingComponent from '../../shared/components/loading/model-loading-component';
import messaging from '@react-native-firebase/messaging';
import '../../../i18n';
import { useTranslation } from 'react-i18next';
import LoginActions from './login.reducer'
import Icon from 'react-native-vector-icons/AntDesign';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
// import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';


function LoginScreen(props) {
  const { navigation, account, signUpWithSocail, fetching, error, attemptVerify, fetchingAccount, fetchingAuthInfo, authInfoError } = props;
  const [loginError, setLoginError] = React.useState('');
  const [value, setValue] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("SO");
  const [formattedValue, setFormattedValue] = React.useState("");
  const [valid, setValid] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [ShowMessage, setShowMessage] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const { t, i18n } = useTranslation();
  
  const phoneInput = React.useRef<PhoneInput>(null);
  
 

  React.useEffect(() => {
    getFcmToken();
    if (account !== null) {
      navigation.navigate('Verification');
    }
  }, [account, navigation]);

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      setToken(fcmToken);
    }
  }

  useDidUpdateEffect(() => {
    if (!fetching && error) {
      setLoginError(error);
      setShowModal(false);
    }
  }, [fetching]);

  const handleVerify = () => {
    const checkValid = formattedValue.length <= 9 ? true : false;
    setShowMessage(true);
    if (!token) {
      setValid(checkValid);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'Please Allow Notification',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
    if (checkValid) {
      setValid(checkValid);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'Invalid Telephone Number, Number Must be at least 9 Digits',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    } else {
      setValid(false);
      attemptVerify({ telephone: formattedValue, token });
      setShowModal(true);
    }
  }

//   const getInfoFromToken = (token) => {
//     const PROFILE_REQUEST_PARAMS = {
//       fields: {
//         string: 'id,email,name,first_name,last_name',
//       },
//     };
//     const profileRequest = new GraphRequest(
//       '/me',
//       { token, parameters: PROFILE_REQUEST_PARAMS },
//       (error, result) => {
//         if (error) {
//           Toast.show({
//             type: 'error',
//             position: 'bottom',
//             text1: 'Error',
//             text2: error,
//             visibilityTime: 4000,
//             autoHide: true,
//             topOffset: 30,
//             bottomOffset: 40,
//           });
//         } else {
//           signUpWithSocail({ email: result?.email, fullName: result?.name });
//         }
//       },
//     );
//     new GraphRequestManager().addRequest(profileRequest).start();
//   };

//   const _signInFacebook = async () => {
//     try {

//       const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
//       if (result.isCancelled) {
//         return;
//       }

//       const accessToken = await AccessToken.getCurrentAccessToken();
//       if (!accessToken) {
//         return;
//       }
//       getInfoFromToken(accessToken.accessToken);
//     } catch (error) {
//       Toast.show({
//         type: 'error',
//         position: 'bottom',
//         text1: 'Error',
//         text2: error,
//         visibilityTime: 4000,
//         autoHide: true,
//         topOffset: 30,
//         bottomOffset: 40,
//       });
//     }
//   };
 
//  const signIn = async () => {
//     try {
//       await GoogleSignin.configure({
//         webClientId: '275218892303-i89p1t6r8scr5343f4n4c0d18ve3jk5e.apps.googleusercontent.com', 
//       })

//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       console.tron.log('yeeeee',userInfo)
//       // signUpWithSocail({ email: userInfo?.user?.email, fullName: userInfo?.user?.name });
//     } catch (error) {
//       console.tron.log('error',error)
      
//     }
//   };

  // const _signIn = async () => {

  //   try {
  //     GoogleSignin.configure();

  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();

  //     signUpWithSocail({ email: userInfo?.user?.email, fullName: userInfo?.user?.name });
  //   } catch (error) {
  //     if (error) {
  //       switch (error.code) {
  //         case statusCodes.SIGN_IN_CANCELLED:
  //           break;
  //         case statusCodes.IN_PROGRESS:
  //           break;
  //         case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
  //           break;
  //         default:
  //       }
  //     }
  //   }
  // };

  if (fetching && showModal) {
    return (
      <ModelLoadingComponent />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Left>
          <Icon name="left" color={Colors.primary} style={styles.backbutton} size={20} onPress={() => navigation.goBack()} />
        </Left>
        <Body />
        <Right />
      </View>
      <View style={styles.subheader}>
        <Text style={styles.title}>{t('screen.registration.title')}</Text>
        <Text style={styles.text}>{t('screen.registration.subtitle')}</Text>
      </View>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.phoneContainer}>
          <PhoneInput
            defaultValue={value}
            defaultCode={countryCode}
            onChangeCountry={(country) => {
              setCountryCode(country?.cca2);
            }}
            layout="second"
            placeholder="6X XXXXXXX"
            min={9}
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            countryPickerProps={{ withAlphaFilter: true }}
            autoFocus
            containerStyle={styles.phonenumber}
            textInputStyle={styles.textInputStyle}
          />
          <Text style={styles.hint}>+252 61 XXXXXXX</Text>
        </View>
        {
          fetching ?
            <TouchableOpacity
              style={styles.button}
              disabled
            >
              <LottieView source={Animation.loadingButton} autoPlay loop />
            </TouchableOpacity>
            :
            <TouchableOpacity
              style={styles.button}
              onPress={handleVerify}
            >
              <Text style={styles.buttonText}>{t('screen.registration.continue')}</Text>
            </TouchableOpacity>
        }
        <Text style={styles.textOr}>Or continue with</Text>
   
      </SafeAreaView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    fetchingAuthInfo: state.authInfo.fetching,
    authInfoError: state.authInfo.error,
    fetchingAccount: state.account.fetching,
    fetching: state.login.fetching,
    error: state.login.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptVerify: (telephone) => dispatch(LoginActions.loginRequest(telephone)),
    signUpWithSocail: (telephone) => dispatch(LoginActions.signupSocailRequest(telephone)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

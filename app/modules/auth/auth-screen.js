import React, { useEffect } from 'react'
import { ScrollView, StatusBar,Linking, Image} from 'react-native'
import {Colors,Fonts,  Images,Animation } from '../../shared/themes'
import { Container, Header, Content, Button } from 'native-base';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux'
import LottieView from 'lottie-react-native';
import { createAnimatableComponent,Text, View,  } from 'react-native-animatable';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import '../../../i18n';
import {useTranslation} from 'react-i18next';
import { RadioButton } from 'react-native-ui-lib'; 
import AccountActions from '../../shared/reducers/account.reducer';
import { Picker } from 'react-native-ui-lib'
import _ from 'lodash';
import messaging from '@react-native-firebase/messaging';

// Styles
import styles from './auth-screen-style'
import { TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import images from '../../shared/themes/images';


function AuthScreen(props) {
  const {  account, authToken, language,languageRequest ,navigation } = props;

 const {t, i18n} = useTranslation();
 const [currentLanguage,setLanguage] =React.useState(null);
 

useEffect(() => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  messaging().onNotificationOpenedApp(remoteMessage => {
    navigation.navigate(remoteMessage?.data?.screen, { productId: remoteMessage?.data?.productId });
  });

}, []);

    React.useEffect(() => {
      if(language ){
        i18n
          .changeLanguage(language)
          .then(() => setLanguage(language))
          .catch(err => err);
      }
      }, []);
    React.useEffect(() => {
      if(authToken && account){
        if(account.verified == false){
          navigation.navigate('Verification');
        }else{
          if(account.fullName === null){
           navigation.navigate('Register');
          }else{
            navigation.navigate('Home');

          }
        }
      }
      }, [account, navigation]);

 
  handlePressSignUpScreen = () => {
   navigation.navigate('Login');

  }
  handlePressGuestScreen = () => {
   navigation.navigate('Guest');
  }
  changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => err);
      languageRequest(value)
  };
 




 return (
      <>
      <StatusBar translucent backgroundColor="transparent"/>
      <View style={styles.mainContent}>
        <View style={styles.header}>
          
        </View>
        <View style={styles.content}>
            <Image source={images.logo} style={styles.logo} />
            <Text style={styles.title}>Sign up</Text>
            <Text style={styles.text}>Sign up with different ways</Text>
          <TouchableOpacity style={styles.button}>
            <Image source={images.call} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Signup With Telephone</Text>
          </TouchableOpacity>
          <Text style={styles.textOr}>Or continue with</Text>
          <View style={styles.row}>
          <TouchableOpacity style={styles.socailButton}>
            <Image source={images.google} style={styles.socailButtonIcon} />
            <Text style={styles.buttonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socailButton}>
            <Image source={images.facebook} style={styles.socailButtonIcon} />
            <Text style={styles.buttonText}>Facebook</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
      </>
    )
  }




  const mapStateToProps = (state) => {
    return {
      account: state.account.account,
      fetching: state.login.fetching,
      user: state.login.user,
      authToken: state.login.authToken,
      error: state.login.error,
      language:state.account.language
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch(LoginActions.logoutRequest()),
      languageRequest: (language) => dispatch(AccountActions.languageRequest(language)),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);


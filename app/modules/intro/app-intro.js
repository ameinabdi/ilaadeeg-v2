import React, { useEffect } from 'react'
import { ScrollView, StatusBar,Linking, Image, ImageBackground} from 'react-native'
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
import styles from './app-intro-style'
import { TouchableHighlight } from 'react-native';


function IntoAppScreen(props) {
  const {  account, authToken, language,languageRequest ,navigation } = props;

 const {t, i18n} = useTranslation();
 const [currentLanguage,setLanguage] =React.useState(null);
 const slides = [
  {
    key: '1',
    title: 'ilaadeeg',
    text: t('screen.intro.welcome'),
    image:true,
    animation: Images.wallpaper,
    imageStyle: {
      width: wp('30%'),
      height: wp('30%'),
      resizeMode:'contain',
    },
    colors: '#03c05c',
  },
  {
    key: '2',
    title: 'Sell',
    text: t('screen.intro.sell'),
    image:true,
    animation: Images.wallpaper2,
    imageStyle: {
     width: wp('30%'),
     height: wp('30%'),
     resizeMode:'contain',

    },

    colors:'#0453f3' ,

  },

  {
    key: '3',
    title: 'Buy',
    text: t('screen.intro.buy'),
    image:true,
    animation: Images.wallpaper5,
    imageStyle: {
     width: wp('30%'),
     height: wp('30%'),
     resizeMode:'contain',

    },
    colors: '#F30453',

    button: {
      flex: 1,
      width: 200,
      background: Colors.background
    }
  },
  {
    key: '4',
    title: 'Booking',
    text: t('screen.intro.book'),
    image:true,
    animation: Images.wallpaper4,
    imageStyle: {
     width: wp('30%'),
     height: wp('30%'),
     resizeMode:'contain',

    },
    colors: '#3c04f3', 
    button: {
      flex: 1,
      width: 200,
      background: Colors.background
    }
  },

];

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

  _renderNextButton = () => {
    return (
      <View style={styles.buttonView} animation="fadeInRight"  delay={100}>
        <Button transparent style={styles.button}  onPress={this.handlePressSignUpScreen} >
          <Text style={[styles.buttonText,{color:Colors.primary}]}>{t('screen.intro.GetStarted')}</Text>
        </Button>
        <Button transparent style={styles.buttonGuest}  onPress={()=>Linking.openURL('https://dashboard.ilaadeeg.com/auth/signup')} >
          <Text style={[styles.buttonGuestText]}>{t('screen.intro.registerAsBusiness')}</Text>
        </Button>
      </View>
    );
  }
  _skippingButton = () => {
    return (
      <View >
        <Text>aaa</Text>
      </View>
    );
  }
  _renderDoneButton = () => {
    return (
      <View>
        <Icon name="check" size={30} color={Colors.primary} />
      </View>
    );
  }
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

  const languages = [
    {
      key:1,
      label:'ENGLISH',
      value:'en'
    },
    {
      key:2,
      label:'SOMALI',
      value:'so'
    }
  ]


  _renderItem = (items) => {
    const item = items ? items.item :null
    if(item.image){
      return(
        <View style={styles.content}>
          <View style={styles.headers}>
          <View style={styles.language}>
          <Picker
                    containerStyle={styles.textInputPicker}
                    placeholderTextColor={Colors.white}
                    style={styles.picker}
                    value={currentLanguage}
                     rightIconSource={Images.dropdown}
                    onChange={(value)=>{
                      changeLanguage(value.value)}}
                    renderPicker={type => {
                      if(type){
                        return (
                          <View style={styles.selectPicker}>
                              <Text style={styles.selectTitle}>
                                {type.toUpperCase()}
                              </Text>
                              <Image source={Images.dropdown} style={styles.dropdownIcon}/>
                            </View>
                          );
                      }else{
                        return (
                          <View style={styles.selectPicker}>
                              <Text style={styles.selectTitle}>
                                Language
                              </Text>
                              <Image source={Images.dropdown} style={styles.dropdownIcon}/>
                            </View>
                          );
                      }
                    }}
                    >
                      {_.map(languages, items => (
                      <Picker.Item
                        key={items?.key}
                        value={items}
                        renderItem={(item, props) => (
                          <View
                            style={styles.list}
                          >
                            <View style={styles.listRow}>
                              <Text style={styles.listTitle}>
                              {items?.label.toUpperCase()}
                              </Text>
                            </View>
                          </View>
                        )}
                        getItemLabel={item => item.key}
                      />
                    ))}
          </Picker>
          </View>
          <Button transparent style={styles.buttonSkip}  onPress={this.handlePressGuestScreen} >
           <Text style={[styles.buttonSkipText]}>Skip</Text>
          </Button>
          </View>
         {/* <Image source={item.animation} key={item}  style={styles.imageStyle} /> */}
          <View style={styles.footer}>
          <Text  animation="fadeInRight" delay={700} style={styles.title}>{item.title}</Text>
          <Text  animation="fadeInRight" delay={700} style={styles.text}>{item.text}</Text>
          </View>
        </View>
      )
    }
     return(
      <View style={styles.content} >
       <LottieView source={item.animation} key={item} autoPlay loop style={item.imageStyle} />
        <Text  animation="fadeInRight" delay={700} style={styles.title}>{item.title}</Text>
        <Text  animation="fadeInRight" delay={700} style={styles.text}>{item.text}</Text>
      </View>
    )
  };


 return (
      <ImageBackground source={Images.intro} style={styles.imageBg}>
      {/* <StatusBar translucent backgroundColor="transparent"/> */}
      <View style={styles.mainContent}>
        <AppIntroSlider
         dotStyle={{ backgroundColor: Colors.primary, width:20,height:10 }}
         activeDotStyle={{ backgroundColor: Colors.white, width:20,height:10 }}
         style={styles.background}
         renderItem={this._renderItem} 
         data={slides} 
         renderDoneButton={this._renderNextButton}
         renderNextButton={this._renderNextButton}
         onDone={this._onDone}
         bottomButton
         /> 
      </View>
      </ImageBackground>
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
  export default connect(mapStateToProps, mapDispatchToProps)(IntoAppScreen);


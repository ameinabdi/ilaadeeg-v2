import React from 'react'
import { StatusBar,Image,Linking,  TouchableOpacity,  Text, ActivityIndicator, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import styles from './privacy-screen.styles';
import LottieView from 'lottie-react-native';
import {Animation,Colors, Images} from '../../shared/themes';
import { Card, CardItem, Body,  Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col, Footer } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { WebView } from 'react-native-webview';
import ModelLoadingComponent from '../../shared/components/loading/model-loading-component';
import {useTranslation} from 'react-i18next';

 function PrivacyScreen(props) {
     const { navigation } = props;
     const {t, i18n} = useTranslation();


   const LoadingIndicatorView=()=>{
      return(<ModelLoadingComponent />)
      } 
    return (
     <Container style={styles.container}>       
        <View style={styles.header}>
            <Left>
               <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>navigation.navigate('Home')}/>
            </Left>
            <Body>
              <Text style={styles.title}> {t('screen.privacy.title')}</Text>
            </Body>
            <Right/>
      </View>
         <WebView
            originWhitelist={['*']}
            source={{ uri: 'https://ilaadeeg.com/privacy-policy' }}  
            renderLoading={LoadingIndicatorView}
            startInLoadingState={true}
            style={styles.content}
          />
      </Container>
    )
}

const mapStateToProps = (state) => {
    return {
      account: state.account.account,
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(PrivacyScreen);
  

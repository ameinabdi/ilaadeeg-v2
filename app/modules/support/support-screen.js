import React from 'react'
import { StatusBar,Image,Linking,  TouchableOpacity,  Text, ActivityIndicator, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import styles from './support-screen.styles';
import LottieView from 'lottie-react-native';
import {Animation,Colors, Images} from '../../shared/themes';
import { Card, CardItem, Body,  Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col, Footer } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';

 function SupportScreen(props) {
     const { navigation } = props;
     const {t, i18n} = useTranslation();

    return (
     <Container style={styles.container}>       
        <View  style={styles.header}>
            <Left>
               <Icon name="left" color={Colors.primary} style={styles.backbutton} size={20}  onPress={()=>navigation.goBack()}/>
            </Left>
            <Body />
            <Right/>
        </View>
         <LottieView source={Animation.support} autoPlay loop style={styles.animation} />
         <Text style={styles.title}>{t('screen.support.title')}</Text>
         <View style={styles.footer}>
             <TouchableOpacity style={styles.col} onPress={()=>{Linking.openURL(`tel:+447898768709`)}}>
                 <Image source={Images.call} style={styles.icon} />
                 <Text style={styles.colText}>+44 7898768709</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.col}  onPress={()=>{Linking.openURL(`https://api.whatsapp.com/send/?phone=447898768709&text&type=phone_number&app_absent=0`)}}>
                 <Image source={Images.chat} style={styles.icon} />
                 <Text style={styles.colText}>Chat 24/7</Text>
             </TouchableOpacity>
         </View>
         <View style={styles.footer}>
         <TouchableOpacity style={styles.colLarge} onPress={()=>{Linking.openURL('mailto:starbustransportation@gmail.com?subject=Help me')}}>
                 <Image source={Images.email} style={styles.icon} />
                 <Text style={styles.colText}>support@ilaadeeg.com</Text>
             </TouchableOpacity>
        </View>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(SupportScreen);
  

import React from 'react';
import { ScrollView,TouchableOpacity,Switch,TouchableHighlight,FlatList,TextInput, Text, Image,ImageBackground, View, Platform, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Container, Header,Content, Tab,Picker,Textarea, Tabs,Left,Right, ScrollableTab, Button, Body } from 'native-base';
import {  Colors,Animation,Images } from '../../../shared/themes';
import { useFocusEffect } from '@react-navigation/native';
import styles from './checkout-screen.styles';
import Icon from 'react-native-vector-icons/AntDesign'
import { Col, Row, Grid } from "react-native-easy-grid";
import PaymentActions from './payment-reducer';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {RadioButton } from 'react-native-ui-lib'; //eslint-disable-line
import {     DateTimePicker} from 'react-native-ui-lib';
import PaymentComponent from './payment-Component';
import LoadingComponent from '../../../shared/components/loading/loadin-component';
import {useTranslation} from 'react-i18next';


function PaymentCheckOut(props) {
    const [telephone, setTelephone] = React.useState(null);
    const [successModel, setSuccessModel] = React.useState(false);
    const [paymentType, setPaymentType] = React.useState(null);
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const [cardNum, setCardNum] = React.useState(null);
    const [expDate, setExpDate] = React.useState(null);
    const {t, i18n} = useTranslation();

    const { route,account,fetchingPayment, paymentSetup, getpaymentSetup, fetchingOrder,error, success,checkOutRequest, navigation, order, fetching,resetPayment  } = props;
    const { product } = route.params
    const bus = route

    useFocusEffect(
      React.useCallback(() => {
        getpaymentSetup()
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
      }, [getpaymentSetup ]),
    );
    // useDidUpdateEffect(() => {
    //   if (!fetching && error) {
    //     Toast.show({
    //       type: 'error',
    //       position: 'bottom',
    //       text1: 'Error',
    //       text2: error,
    //       visibilityTime: 8000,
    //       autoHide: true,
    //       topOffset: 30,
    //       bottomOffset: 40,
          
    //     });
    //   }else{
    //     setSuccessModel(true)
    //   }
    // }, [fetching]);
    
   const handlePressBack =()=>{
      navigation.goBack()
   }

  const handlePay =()=>{
     if(!paymentType){
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: "Select Your Payment Method Please",
        visibilityTime: 8000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        
      });
     } else{
      const booking ={
        ...schedule,
        paymentType,
        telephone: telephone ? telephone : account?.phoneNumber?.slice(4),
      }
      checkOutRequest(booking)
     }
      
  }
const handleModal = (data)=>{
  setPaymentType(data)
  setIsModalVisible(!isModalVisible)
  }
const renderContent = ({item, index}, service)=>{
  if(item.type == 'Wallet'){
    return(
      <TouchableOpacity style={styles.header} onPress={()=>{handleModal({...item,service})}}>
       <View style={styles.left}>
       <RadioButton
          selected={false}
          size={15}
          color={Colors.primary}
          borderRadius={100}
        />
        <Text style={styles.leftTitle}>{item.type}</Text>
        </View> 
        <View style={styles.right}>
          <View style={styles.col}>
            <Image source={Images.evc} style={styles.paymentIcon} />
            <Image source={Images.Zaad} style={styles.paymentIcon} />
            <Image source={Images.golis} style={styles.paymentIcon} />
          </View>
          <View style={styles.col}>
            <Image source={Images.Edahab} style={styles.paymentIcon} />
          </View>
        </View>
        
      </TouchableOpacity>
    )
  }else if(item.type == 'Card'){
    return(
      <TouchableOpacity style={styles.header} onPress={()=>{handleModal({...item,service})}}>
       <View style={styles.left}>
       <RadioButton
          selected={false}
          size={15}
          color={Colors.primary}
          borderRadius={100}
        />
        <Text style={styles.leftTitle}>{item.type}</Text>
        </View> 
        <View style={styles.right}>
          <View style={styles.col}>
            <Image source={Images.mastedcard} style={styles.paymentIcon} />
            <Image source={Images.visa} style={styles.paymentIcon} />
          </View>
        </View>
        
      </TouchableOpacity>
    )

  }
  
  }

  

    if(fetchingPayment || !paymentSetup?.ServiceFee){
      return (
        <LoadingComponent />
      )

    }
  
    return (
        <View style={styles.container}>
        <View style={styles.topheader}>
              <Left>
                 <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>props.navigation.navigate('ProductViewScreen',{productItem:product})}/>
              </Left>
              <Body>
                <Text style={styles.tophaederTitle}>{t('screen.payment.title')}</Text>
              </Body>
              <Right/>
        </View>
         <Tabs       
           tabContainerStyle={styles.tabContainer}
           tabBarActiveTextColor={Colors.primary}
          style={styles.menu} tabBarUnderlineStyle={{backgroundColor:Colors.primary}}>
          {
            paymentSetup.ServiceFee?.map((service)=>{
              if(service.type === 'Free'){
                return(
                  <Tab  heading={<View style={styles.service}>
                    <RadioButton
                      selected={false}
                      size={15}
                      color={Colors.primary}
                      borderRadius={100}
                     />
                      <Text style={styles.menuTitle}>{service.name}</Text>
                  </View>}>
                  <View  style={styles.content}>
                    <View style={styles.freecontent}>
                        <LottieView source={Animation.free} autoPlay loop style={styles.freeAnimation} />
                        <Text style={styles.freeTitle}>{service.name}</Text>
                        <Text style={styles.freeText}>{service.description}</Text>
                        <Button style={styles.button} onPress={()=>{handleModal(service)}}>
                          <Text style={styles.buttonText}>{t('screen.payment.subscribeAsFree')}</Text>
                        </Button>
                    </View>
                  </View>
                  </Tab>
                )
              }else if(service.type === 'Charge'){
                return(
                  <Tab heading={<View style={styles.service}>
                    <RadioButton
                      selected={false}
                      size={15}
                      color={Colors.primary}
                      borderRadius={100}
                     />
                      <Text style={styles.menuTitle}>{service.name}</Text>
                  </View>}>
                  <View  style={styles.content}>
                    <FlatList
                      contentContainerStyle={styles.listContent}
                      data={paymentSetup?.paymentMethod}
                      renderItem={(value)=>renderContent(value,service)}
                      keyExtractor={(item, index) => `${index}`}
                      numColumns={2}
                    />
                  </View>
                  </Tab>
                )
              }
            })
          }
        </Tabs>
        <Modal isVisible={isModalVisible} style={styles.model}>
         <View style={styles.modelContainer}>
          <View  style={styles.modelheader}>
          <Left>
              </Left>
              <Body>
                <Text style={styles.modelTitle}>{paymentType?.type}</Text>
              </Body>
              <Right>
              <Icon name="close" color={Colors.charcoal} style={styles.closebutton} size={20}  onPress={()=>handleModal()}/>
              </Right>
          </View>
          <View style={styles.modalContent}>
          <PaymentComponent paymentType={paymentType} product={product} handleModal={handleModal} navigation={props.navigation}/>
          </View>
         </View>
        </Modal>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(PaymentCheckOut);
  
import React from 'react';
import { ScrollView,TouchableOpacity,Switch,TouchableHighlight,FlatList,TextInput, Text, Image,ImageBackground, View, Platform, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Container, Header, Tab,Picker,Textarea, Tabs,Left,Right, ScrollableTab, Button, Body } from 'native-base';
import {  Colors,Animation,Images } from '../../../shared/themes';
import { useFocusEffect } from '@react-navigation/native';
import styles from './checkout-screen.styles';
import Icon from 'react-native-vector-icons/AntDesign'
import { Col, Row, Grid } from "react-native-easy-grid";
import PaymentActions from './payment-reducer';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import { CheckBox } from 'react-native-elements'
import moment from 'moment';
import Toast from 'react-native-toast-message';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import { CommonActions } from '@react-navigation/native';
import images from '../../../shared/themes/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


function PaymentCheckOut(props) {
    const [telephone, setTelephone] = React.useState(null);
    const [successModel, setSuccessModel] = React.useState(false);
    const [paymentType, setPaymentType] = React.useState(null);

    
    const { route,account, fetchingOrder,error, success,checkOutRequest, navigation, order, fetching,resetPayment  } = props;
    const schedule = route
    const bus = route

    useFocusEffect(
      React.useCallback(() => {
        resetPayment();
        setPaymentType(null)
        setTelephone(null)
        const cellphone =account?.phoneNumber?.slice(4);
        if(cellphone.substring(0,2) === "65"){
          setPaymentType("Edahab")
        }else if(cellphone.substring(0,2) === "63"){
          setPaymentType("Zaad")
        } else{
          setPaymentType(null)
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
      }, [resetPayment]),
    );
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
        setSuccessModel(true)
      }
    }, [fetching]);
    
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
handlePressShipment = (data)=>{
    setPaymentType(data)
  }
  
    return (
        <Container style={styles.container}>
        <KeyboardAwareScrollView style={styles.wrapper} keyboardShouldPersistTaps={'handled'} >
        <View style={styles.content}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>Booking Ticket </Text>
                    </View>
                    <View style={styles.menu}>
                        <View style={styles.left}>
                            <Text  style={styles.leftTitle}>Departure</Text>
                            <Text  style={styles.leftText}>{bus?.origin?.city},{'\n'+bus?.origin?.region}</Text>
                        </View>
                        <View style={styles.center}>
                        <Text style={styles.centerTitle}>Seats</Text>
                        <Text style={styles.centerText}>{schedule?.seatNo}</Text>
                        </View>
                        <View  style={styles.right}>
                           <Text style={styles.rightTitle}>Departure Time</Text>
                            <Text style={styles.rightText}>{moment(bus?.departureTime, "HH:mm").format('h:mm a')}</Text>
                        </View>
                    </View>
                    <View style={styles.menu}>
                        <View style={styles.left}>
                            <Text  style={styles.leftTitle}>Arrival</Text>
                            <Text  style={styles.leftText}>{bus?.distination?.city},{'\n'+bus?.distination?.region}</Text>
                        </View>
                        <View style={styles.center}>
                          <Text  style={styles.leftTitle}>booking Date</Text>
                          <Text  style={styles.leftText}>{moment(schedule?.bookingDate).format('Do MMM YY')}</Text>
                        
                        </View>
                        <View  style={styles.right}>
                           <Text style={styles.rightTitle}>Arrival Time</Text>
                            <Text style={styles.rightText}>{moment(bus?.arrivalTime, "HH:mm").format('h:mm a')}</Text>
                        </View>
                    </View>
                    <View style={styles.row} animation="fadeInUp" delay={300}>
                    <FlatList
                        data={["Zaad", "Edahab"]}
                        style={styles.shipmentContainer}
                        numColumns={2}
                        renderItem={({ item, index}) => (
                          <TouchableOpacity
                            key={index}
                            onPress={()=>handlePressShipment(item)}
                            >
                            <View style={paymentType  ===  item ? styles.Selectpayment:styles.payment}>
                            <View style={styles.checkView}>
                              <CheckBox
                                checkedIcon={<View style={styles.checkboxItem}><AntDesign name="check" size={15} color={Colors.primary} /></View>}
                                uncheckedIcon={<View style={styles.uncheckboxItem}><AntDesign name="close" size={15} color={Colors.primary} /></View>}
                                checked={paymentType  ==  item  ? true : false}
                                // onPress={() => this.setState({shipment: !this.state.shipment})}
                              />
                              </View>
                              <Image source={images[item]} style={paymentType ==  item ? styles.SelectpaymentIcon :styles.paymentIcon}/>
                              <Text style={paymentType ==  item ? styles.SelectpaymentDesc: styles.paymentDesc}>{item.description}</Text>
                              <Text style={paymentType  ==  item  ? styles.SelectpaymentTime: styles.paymentTime}>{item.deliveryTime}</Text>
                            </View>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                    <View style={styles.row} animation="fadeInUp" delay={300}>
                        <Text style={styles.rowLabel}>Payment Phone</Text>
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
                              if(cellphone.substring(0,2) === "65"){
                                setPaymentType("Edahab")
                              }else if(cellphone.substring(0,2) === "63"){
                                setPaymentType("Zaad")
                              }else{
                                setPaymentType(null)
                              }
                            }}
                            underlineColorAndroid="transparent"
                            placeholder="6x xxxxxx"
                          /> 
                        </View>
                      </View>
                      
            <Button transparent style={styles.button} onPress={handlePay}>
              <Text style={styles.buttonText}>Pay</Text>
            </Button>
        </View>
        </KeyboardAwareScrollView>

          <Modal isVisible={fetching || success}>
              {fetching ?
              <View style={styles.modelContainer}>
                <LottieView source={Animation.payment}  autoPlay loop  style={styles.animation}/>
                <Text style={styles.modelTitle}>Waiting For Accepting Payment</Text>
              </View>
                :
                <View style={styles.successmodelContainer}>
                  <LottieView source={Animation.done}  autoPlay loop  style={styles.animation}/>
                    <Text style={styles.modelTitle}>Completed Paid</Text>
                    <Button style={styles.Orderbutton} onPress={()=>{
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [
                            { name: 'Home' },
                            
                          ],
                        })
                      );
                          resetPayment()
                          navigation.navigate('EntityStack',{screen:'Booking'});
                      }}>
                      <Text style={styles.OrderbuttonText}>Track You Order</Text>
                    </Button>
                </View>
               }
          </Modal>
        </Container>
    );
  }
  
  const mapStateToProps = (state) => {
    return {
      // ...redux state to props here
      account: state.account.account,
      fetching: state.payment.fetchingTransaction,
      error: state.payment.errorTransaction,
      fullProduct: state.home.fullproduct,
      success: state.payment.success,
     };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        checkOutRequest : (order,payment) => dispatch(PaymentActions.checkOutRequest(order, payment)),
        resetPayment:() => dispatch(PaymentActions.resetPayment()),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PaymentCheckOut);
  
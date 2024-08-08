import React from 'react'
import { Alert, ScrollView,Platform, Text, Image, TouchableHighlight, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign';
import { Images, Metrics,Colors } from '../../../shared/themes'
import { Card, CardItem, Body, Form, Item, Picker,Input,Button } from 'native-base';
import { createAnimatableComponent, View } from 'react-native-animatable';
import DropdownAlert from 'react-native-dropdownalert';
import LottieView from 'lottie-react-native';
import Animation from '../../animation'
import RegisterActions from './register.reducer'
// Styles
import styles from './verification-screen.styles'


class VerificationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tel: null,
      phone:null,
      enterCode: true,
      loading: false,
      CodeNumber: null,
      verified: false,
      error: null,
    }
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.fetching && !this.props.fetching) {
      if (this.props.error) {
        this.dropDownAlertRef.alertWithType('error', 'Error', 'Sorry Invalid Verification Number');
      } else {
       if(prevProps.verified == true){
        this.props.registerationDone()
       }
    }
  }
  if (prevProps.fetchingResend && !this.props.fetchingResend) {
    if (this.props.errorResend) {
      this.dropDownAlertRef.alertWithType('error', 'Error', 'Sorry Did not resent');

    } else {
     if(!prevProps.resend){
      this.dropDownAlertRef.alertWithType('success', 'Success', 'Successfully Sent');

     }
    }
  }
}

  Submit = ()=> {
    const { CodeNumber } = this.state;
    if(!CodeNumber){
        
        this.dropDownAlertRef.alertWithType('error', 'Error', 'Please Write Verification Number');
     }else{
     this.props.verification(CodeNumber)
        
        }
    }
resendCode = ()=> {
    const { registerAccount } = this.props;
    if(!registerAccount){
        this.dropDownAlertRef.alertWithType('error', 'Error', 'Please Supporter to fix this issue');
     }else{
        let phoneNumber= registerAccount.phoneNumber
     this.props.ResendCode(phoneNumber)
        }
    }
registerationDone = ()=>{
        this.props.registerationDone()
        this.props.navigation.navigate('Home')  
      }
  render() {
     let textStyle = this.state.enterCode ? {
            height: 50,
            textAlign: 'center',
            fontSize: 40,
            fontWeight: 'bold',
            fontFamily: 'Courier'
        } : {};
        const  {  registerAccount, verified } = this.props

 
    if(verified){
       this.registerationDone()
    }
    return (
        <>
        <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps='handled'
        style={styles.container} 
        >       
        
         <Card style={styles.card}>
           <View animation="bounceInLeft" delay={30} style={styles.cardView}>
            <CardItem style={styles.carditem}>
               <Image source={Images.logo} style={{ width:100, height:100, alignSelf:'center'}} />
               <Text style={styles.title}>Verify Your Phone With 4-digit</Text>
               <Text style={styles.subtitle}><Icon name="phone" size={20} color={Colors.primary} />  {registerAccount ? registerAccount.phoneNumber : null}</Text>
            </CardItem>
            <CardItem>
              <Body style={styles.row}>
                <Item picker >
                  <Input 
                           name={this.state.CodeNumber}
                            underlineColorAndroid={'transparent'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            value={this.state.CodeNumber}
                            onChangeText={(text) => this.setState({ CodeNumber: text })}
                            placeholder={'_ _ _ _ '}
                            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                            returnKeyType='go'
                            placeholderTextColor={Colors.primary}
                            style={[styles.textInput, textStyle]}
                            autoFocus
                            maxLength={4}     
                    />
                </Item>
              </Body>
            </CardItem>
               <Text style={styles.error}>
                  {this.state.error ? this.state.error : null}
                </Text>
             <CardItem>
               <Button block light style={styles.button} onPress={this.Submit}>
                  <Text style={styles.buttontext}>{"Verify"}</Text>
                </Button>
            </CardItem>
            <Text style={styles.text}> If You Didn't Get code Click here to Resend</Text>
            <Button transparent   style={styles.resend}onPress={this.resendCode}>
                  <Text style={styles.resendtext}>Resend</Text>
                </Button>
            </View>
          </Card>  
          
              <Text style={styles.footer}>Copyright@Macsuum</Text>
      </ScrollView>
      <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.register.fetchingVerified,
    fetchingResend:state.register.fetchingResend,
    getcodedata: state.register.getcode,
    error: state.register.errorVerified,
    errorResend: state.register.errorResend,
    verified:state.register.verified,
    resend: state.register.resend,
    registerAccount: state.register.registerAccount,

  }
}

const mapDispatchToProps = dispatch => {
  return {
    ResendCode: (phone) => dispatch(RegisterActions.resendCodeRequest(phone)),
    verification: token => dispatch(RegisterActions.verificationRequest(token)),
    registerationDone: () => dispatch(RegisterActions.registerationDoneRequest()),

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerificationScreen)


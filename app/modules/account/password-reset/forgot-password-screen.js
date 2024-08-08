import React from 'react'
import { Alert, Text,TextInput, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import t from 'tcomb-form-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Colors, Images, Metrics } from '../../../shared/themes'
import { Card, CardItem, Body, Form, Item, Picker,Input,Button } from 'native-base';
import RegisterActions from '../register/register.reducer'

import ForgotPasswordActions from './forgot-password.reducer'
import styles from './forgot-password-screen.styles'
import { createAnimatableComponent, View } from 'react-native-animatable';
import DropdownAlert from 'react-native-dropdownalert';


class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber:'',
      CodeNumber:null,
      password:'',
      comfirmPassword:''
    }
    this.submitForm = this.submitForm.bind(this)
    this.VerifyCode = this.VerifyCode.bind(this)
    this.changePassword = this.changePassword.bind(this)
  }

  submitForm() {
    // call getValue() to get the values of the form
    const { phoneNumber } = this.state;
    if (phoneNumber) {
      // if validation fails, value will be null
      this.props.resetPassword('+252'+phoneNumber)
    }else{
      this.dropDownAlertRef.alertWithType('error', 'Error', 'empty Feilds Please Make sure it');
    }
  }


  VerifyCode() {
    // call getValue() to get the values of the form
    const { CodeNumber } = this.state;

    if (CodeNumber) {
      // if validation fails, value will be null
      this.props.verification(CodeNumber)
    }else{
      this.dropDownAlertRef.alertWithType('error', 'Error', 'empty Feilds Please Make sure it');
    }
  }

  changePassword() {
    // call getValue() to get the values of the form
    const { password , comfirmPassword } = this.state;
    const { phone,code } = this.props;
    const data ={
      phoneNumber:phone,
      code,
      password
    }
    if (password  && comfirmPassword) {
      // if validation fails, value will be null
      if(password == comfirmPassword){
        this.props.changePassword(data)
      }else{
        this.dropDownAlertRef.alertWithType('error', 'Error', 'Please Make Sure Your Password, is not same');
      }
    }else{
      this.dropDownAlertRef.alertWithType('error', 'Error', 'empty Feilds Please Make sure it');
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetching && !this.props.fetching) {
      if (this.props.error) {
        this.dropDownAlertRef.alertWithType('error', 'Error', this.props.error);

      } else {
        this.dropDownAlertRef.alertWithType('success', 'Success', 'Password reset Phone sent');
      }
    }
    if (prevProps.fetchingVerification && !this.props.fetchingVerification) {
      if (this.props.errorVerification) {
        this.dropDownAlertRef.alertWithType('error', 'Error', this.props.error);
      } else {
        this.dropDownAlertRef.alertWithType('success', 'Success', 'Successfully virified code number');
      }
    }
  }

   

  render() {
    const { phoneNumber,  password, comfirmPassword} =this.state
    const { sendPasswordReset,phone,verifiedVerification } = this.props
    if(sendPasswordReset &&  verifiedVerification){
      return(
        <KeyboardAwareScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>
          <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
         <View style={styles.form} animation="fadeInUp" delay={300}>
          <View animation="fadeInUp" delay={300} >
            <Text style={styles.titleText}>Reset Your Account</Text>
            <Text style={styles.subtitle}><Icon name="phone" size={20} color={Colors.primary} />  {phone}</Text>
          </View>
          <View style={styles.row} animation="fadeInUp" delay={300}>
            <Text style={styles.rowLabel}>Password</Text>
            <View style={styles.input}>
            <Icon name="lock" size={20} color={Colors.primary} style={styles.inputIcon}/>
            <TextInput
              ref={(c) => {
                this.passwordInput = c
              }}
              testID="loginScreenPassword"
              style={styles.textInput}
              value={password}
              keyboardType="default"
              returnKeyType="go"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              onChangeText={(password)=>{this.setState({password})}}
              underlineColorAndroid="transparent"
              onSubmitEditing={this.handlePressLogin}
              placeholder="*********"
            />
            </View>
          </View>
          <View style={styles.row} animation="fadeInUp" delay={300}>
            <Text style={styles.rowLabel}>Confirm Password</Text>
            <View style={styles.input}>
            <Icon name="lock" size={20} color={Colors.primary} style={styles.inputIcon}/>
            <TextInput
              ref={(c) => {
                this.passwordInput = c
              }}
              testID="loginScreenConfirm Password"
              style={styles.textInput}
              value={comfirmPassword}
              keyboardType="default"
              returnKeyType="go"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              onChangeText={(comfirmPassword)=>{this.setState({comfirmPassword})}}
              underlineColorAndroid="transparent"
              onSubmitEditing={this.handlePressLogin}
              placeholder="***********"
            />
            </View>
          </View>
          <View style={[styles.loginRow]} animation="fadeInUp" delay={300}>
              <TouchableOpacity testID="loginScreenLoginButton" style={styles.loginButtonWrapper} onPress={this.changePassword}>
                <View style={styles.loginButton}>
                  <View style={styles.textContainer}>
                  <Text style={styles.loginText}>Change Password</Text>
                  </View>
                  <View style={styles.iconcontainer}>
                  <Icon name="arrowright" size={20} color={Colors.white}/>
                  </View>
                </View>
              </TouchableOpacity>
          </View>
          </View>
      </KeyboardAwareScrollView> 
      )
    }
    if(sendPasswordReset){
      return(
        <KeyboardAwareScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>
         <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
         <View style={styles.form} animation="fadeInUp" delay={300}>
          <View animation="fadeInUp" delay={300} >
            <Text style={styles.titleText}>Reset Your Account</Text>
            <Text style={styles.subtitle}><Icon name="phone" size={20} color={Colors.primary} />  {phone}</Text>
          </View>
          <Card style={styles.card} transparent>
           <View animation="bounceInLeft" delay={30} style={styles.cardView}>
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
                            style={[styles.textInput,{
                              height: 50,
                              textAlign: 'center',
                              fontSize: 40,
                              fontWeight: 'bold',
                              fontFamily: 'Courier'
                            }]}
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
               <Button block light style={styles.button} onPress={this.VerifyCode}>
                  <Text style={styles.buttontext}>{"Verify"}</Text>
                </Button>
            </CardItem>
            </View>
            </Card>
          </View>
      </KeyboardAwareScrollView> 
      )
    }
    return (
      <KeyboardAwareScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>
        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
         <View style={styles.form} animation="fadeInUp" delay={300}>
          <View animation="fadeInUp" delay={300}>
            <Text style={styles.titleText}>Reset Your Account</Text>
          </View>
          <View style={styles.row} animation="fadeInUp" delay={300}>
            <Text style={styles.rowLabel}>Phone</Text>
            <View style={styles.input}>
            <Icon name="phone" size={20} color={Colors.primary} style={styles.inputIcon}/>
            <TextInput
              ref={(c) => {
                this.usernameInput = c
              }}
              testID="loginScreenUsername"
              style={styles.textInput}
              value={phoneNumber}
              keyboardType="phone-pad"
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(phoneNumber)=>{this.setState({phoneNumber})}}
              underlineColorAndroid="transparent"
              onSubmitEditing={() => this.passwordInput.focus()}
              placeholder="6x xxxxxxx"
              maxLength={9} 
            />
            </View>
          </View>
          <View style={[styles.loginRow]} animation="fadeInUp" delay={300}>
              <TouchableOpacity testID="loginScreenLoginButton" style={styles.loginButtonWrapper} onPress={this.submitForm}>
                <View style={styles.loginButton}>
                  <View style={styles.textContainer}>
                  <Text style={styles.loginText}>Send Reset</Text>
                  </View>
                  <View style={styles.iconcontainer}>
                  <Icon name="arrowright" size={20} color={Colors.white}/>
                  </View>
                </View>
              </TouchableOpacity>
          </View>
          </View>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.forgotPassword.fetching,
    error: state.forgotPassword.error,
    sendPasswordReset: state.forgotPassword.sendPasswordReset, 
    phone: state.forgotPassword.phoneNumber, 
    errorVerification: state.forgotPassword.errorVerified,
    fetchingVerification: state.forgotPassword.fetchingVerified,
    verifiedVerification:state.forgotPassword.verified,
    code:state.forgotPassword.code,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (phoneNumber) => dispatch(ForgotPasswordActions.forgotPasswordRequest(phoneNumber)),
    verification: token => dispatch(ForgotPasswordActions.verificationRequestPasswordReset(token)),
    changePassword: (data) => dispatch(ForgotPasswordActions.passwordResetRequest(data)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)

import React from 'react'
import { Alert, Text, Image, StatusBar, ScrollView, TextInput,  TouchableOpacity, ke } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import t from 'tcomb-form-native'
import { createAnimatableComponent, View } from 'react-native-animatable';
import DropdownAlert from 'react-native-dropdownalert';
import { Colors, Images, Metrics } from '../../../shared/themes'
import Icon from 'react-native-vector-icons/AntDesign'
import { Form, Item,Input, Picker, Button,DatePicker } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";

import RegisterActions from '../register/register.reducer'
import LottieView from 'lottie-react-native';
import Animation from '../../animation'
// Styles
import styles from './register-screen.styles'


class RegisterScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight,
      fullname:'',
      phone:'',
      email:'',
      password:'',
      comfirmPassword:''
    }
  }

  handlePressSignUp = () => {
    // call getValue() to get the values of the form
    const { fullname,phone, email, password, comfirmPassword } = this.state;
    const object = { 
     fullname:fullname,
     email:email, 
     phoneNumber:'+252'+phone, 
     password:password, 
     }

    if (fullname && phone && email  && password && comfirmPassword) {
      // if validation fails, value will be null
      if (password !== comfirmPassword) {
        this.dropDownAlertRef.alertWithType('error', 'Error','Passwords do not match')
        return
      }
      this.props.register(object)
    }else{
      this.dropDownAlertRef.alertWithType('error', 'Error','Empty Fields')
    }
  }
  handlePressLogin(){
   this.props.navigation.navigate('Login')  
  }
  componentWillMount(){
    if( this.props.registerAccount){
     this.props.navigation.navigate('VerificationScreen')  
    }
  }
 
  componentDidUpdate(prevProps) {
    if (prevProps.fetching && !this.props.fetching) {
      if (this.props.error) {
        this.dropDownAlertRef.alertWithType('error', 'Error', this.props.error)
      } else {
        this.dropDownAlertRef.alertWithType('success', 'Success','secuss full upload')
        this.props.navigation.navigate('VerificationScreen')  
      }
      
    } 
  }

  

  render() {
    const { fullname,email, phone, comfirmPassword, password } = this.state;
    const { fetching } = this.props


    return (
      <>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <View
      style={[styles.container, { height: this.state.visibleHeight }]}
      >

                 <LottieView source={Animation.city}  autoPlay loop style={styles.animation} />
                 <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
      <View style={styles.form} animation="fadeInUp" delay={300}>
      <KeyboardAwareScrollView style={{flex:1}} keyboardShouldPersistTaps={'handled'}>

        <View animation="fadeInUp" delay={300}>
          <Text style={styles.titleText}>Sign Up</Text>

        </View>
        <View style={styles.row} animation="fadeInUp" delay={300}>
          <Text style={styles.rowLabel}>Name </Text>
          <View style={styles.input}>
          <Icon name="tag" size={20} color={Colors.primary} style={styles.inputIcon}/>
          <TextInput
            ref={(c) => {
              this.usernameInput = c
            }}
            testID="loginScreenFullname"
            style={styles.textInput}
            value={fullname}
            keyboardType="default"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(fullname)=>{this.setState({fullname})}}
            underlineColorAndroid="transparent"
            onSubmitEditing={() => this.passwordInput.focus()}
            placeholder="Full Name"
          />
          </View>
        </View>
        <View style={styles.row} animation="fadeInUp" delay={300}>
          <Text style={styles.rowLabel}>Telephone </Text>
          <View style={styles.input}>
          <Icon name="phone" size={20} color={Colors.primary} style={styles.inputIcon}/>
          <TextInput
            ref={(c) => {
              this.usernameInput = c
            }}
            testID="loginScreenPhone"
            style={styles.textInput}
            value={phone}
            keyboardType="phone-pad"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(phone)=>{this.setState({phone})}}
            underlineColorAndroid="transparent"
            onSubmitEditing={() => this.passwordInput.focus()}
            placeholder="6x-xxxxxxx"
            maxLength={9}
          />
          </View>
        </View>
        <View style={styles.row} animation="fadeInUp" delay={300}>
          <Text style={styles.rowLabel}>Email </Text>
          <View style={styles.input}>
          <Icon name="user" size={20} color={Colors.primary} style={styles.inputIcon}/>
          <TextInput
            ref={(c) => {
              this.usernameInput = c
            }}
            testID="loginScreenEmail"
            style={styles.textInput}
            value={email}
            keyboardType="default"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(email)=>{this.setState({email})}}
            underlineColorAndroid="transparent"
            onSubmitEditing={() => this.passwordInput.focus()}
            placeholder="Enter Email"
          />
          </View>
        </View>
        
        <View style={styles.row} animation="fadeInUp" delay={300}>
          <Row>
          <Col>
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
          </Col>
          <Col>
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
            maxLength={9}
          />
          </View>
          </Col>
          </Row>
        </View>
        <View style={[styles.loginRow]} animation="fadeInUp" delay={300}>
          {
            fetching ?
            <TouchableOpacity testID="loginScreenLoginButton" style={styles.loginButtonWrapper} onPress={this.handlePressSignUp}>
                <View style={[styles.loginButton,{paddingTop:0}]}>
                  <LottieView source={Animation.lodingButton}  autoPlay loop />
                </View>
            </TouchableOpacity>
            :
            <TouchableOpacity testID="loginScreenLoginButton" style={styles.loginButtonWrapper} onPress={this.handlePressSignUp}>
              <View style={styles.loginButton}>
                <View style={styles.textContainer}>
                <Text style={styles.loginText}>Sign Up</Text>
                </View>
                <View style={styles.iconcontainer}>
                <Icon name="arrowright" size={20} color={Colors.white}/>
                </View>
              </View>
            </TouchableOpacity>
          }
          
         
        </View>
        <TouchableOpacity testID="signUpScreenLoginButton" style={styles.signUpButtonWrapper} onPress={()=>{          this.props.navigation.navigate('Login')}}>
              <View style={styles.signUpButton}>
                <Text style={styles.signUpText}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
      </View>
    </View>
    </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.register.fetching,
    error: state.register.error,
    registerAccount: state.register.registerAccount,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (account) => dispatch(RegisterActions.registerRequest(account)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)

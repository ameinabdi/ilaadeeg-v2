import React from 'react'
import { Alert, Text, Image, StatusBar, ScrollView, TextInput,  TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { createAnimatableComponent, View } from 'react-native-animatable';
import { Colors, Images, Metrics,Animation } from '../../../shared/themes'
import Icon from 'react-native-vector-icons/AntDesign'
import { Form, Item,Left, Body, Right, Picker, Button,DatePicker,Container } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { v4 as uuidv4 } from 'uuid';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ProfileActions from './Profile.reducer'
import LottieView from 'lottie-react-native';
// Styles
import styles from './Edit-profile-screen.styles'
import { date } from 'yup/lib/locale';


class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight,
       fullName:'',
      lastName:'',
      picture:null,
      birthday:new Date(),
      email:'',
      Ispicture:false
    }
    this.props.profileDoneRequest()
  }

  handlePressSignUp = () => {
    // call getValue() to get the values of the form
    const { fullName, lastName, email } = this.state;
    const {  route,authToken } = this.props
    const {account} = route.params
    const data = account
        const object = { 
          id:data.id,
          fullName:fullName ? fullName : data.fullName,
          email:email ? email :data.email, 
         }
        if (!object.fullName ||  !object.email ) {
                // if validation fails, value will be null
                Toast.show({
                  type: 'error',
                  position: 'bottom',
                  text1: 'error',
                  text2: 'Empty Fields',
                  visibilityTime: 4000,
                  autoHide: true,
                  topOffset: 30,
                  bottomOffset: 40,
                  
                });
         }else{
          this.props.updateProfile(object)
          
         }
    
  }
 
  componentDidUpdate(prevProps) {
    if (prevProps.fetching && !this.props.fetching) {
      if (this.props.error) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'error',
          text2: this.props.error,
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          
        });
      } else {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'success',
          text2: 'Successfully Updated Profile',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          
        });
  
    }
      
    } 
  }

  handlePressUpload = () =>{
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        quality: 0.1,
        maxWidth: 300,
        maxHeight: 300,
      },
    };
    launchImageLibrary(options, (response) => {
      // Same code as in above section!
      if(response){
        this.setState({
          picture:response.assets,
          Ispicture: true
        })
      }
  });
}

  

  render() {
    const { fullName,lastName,email} = this.state;
    const { fetching, route } = this.props
    const {account} = route.params
    const data = account

    return (
      <Container style={styles.container}>
      <View  style={styles.header}>
          <Left>
             <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>this.props.navigation.goBack()}/>
          </Left>
          <Body />
          <Right/>
      </View>
      <View
      style={styles.content}>

      <View style={styles.form} animation="fadeInUp" delay={300}>

      <KeyboardAwareScrollView style={{flex:1}} keyboardShouldPersistTaps={'handled'}>

        <View animation="fadeInUp" delay={300}>
        
        </View>
        <View style={styles.row} animation="fadeInUp" delay={300}>
          <Text style={styles.rowLabel}>First Name </Text>
          <View style={styles.input}>
          <TextInput
            ref={(c) => {
              this.usernameInput = c
            }}
            testID="loginScreenFullname"
            style={styles.textInput}
            value={fullName ? fullName :data ? data.fullName : ''}
            keyboardType="default"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(fullName)=>{this.setState({fullName})}}
            underlineColorAndroid="transparent"
            onSubmitEditing={() => this.passwordInput.focus()}
            placeholder="Full Name"
          />
          </View>
        </View>
        <View style={styles.row} animation="fadeInUp" delay={300}>
          <Text style={styles.rowLabel}>Email </Text>
          <View style={styles.input}>
          <TextInput
            ref={(c) => {
              this.usernameInput = c
            }}
            testID="loginScreenFullname"
            style={styles.textInput}
            value={email ? email :data ? data.email : ''}
            keyboardType="default"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(email)=>{this.setState({email})}}
            underlineColorAndroid="transparent"
            onSubmitEditing={() => this.passwordInput.focus()}
            placeholder="Email"
          />
          </View>
        </View>
         
        
        <View style={[styles.loginRow]} animation="fadeInUp" delay={300}>
          {
            fetching ?
            <TouchableOpacity testID="loginScreenLoginButton" style={styles.loginButtonWrapper} onPress={this.handlePressSignUp}>
                <View style={[styles.loginButton,{paddingTop:0}]}>
                  <LottieView source={Animation.loadingButton}  autoPlay loop style={styles.animation} />
                </View>
            </TouchableOpacity>
            :
            <TouchableOpacity testID="loginScreenLoginButton" style={styles.loginButtonWrapper} onPress={this.handlePressSignUp}>
              <View style={styles.loginButton}>
                <View style={styles.textContainer}>
                <Text style={styles.loginText}>Update</Text>
                </View>
              </View>
            </TouchableOpacity>
          }
          
        </View>
          </KeyboardAwareScrollView>
      </View>
    </View>
    </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.profile.fetching,
    error: state.profile.error,
    profile: state.profile.profile,
    authToken: state.login.authToken,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (account, photos, token) => dispatch(ProfileActions.profileUpdateRequest(account,photos, token)),
    profileDoneRequest: () => dispatch(ProfileActions.profileDoneRequest()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)

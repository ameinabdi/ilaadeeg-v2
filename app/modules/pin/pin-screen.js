import React from 'react';
import { Alert, View, Text } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';
import styles from './pin-screen.styles';
import { Metrics, Colors } from '../../shared/themes';
import PINCode,{resetPinCodeInternalStates} from '@haskkor/react-native-pincode';
import { Thumbnail } from 'native-base';
import SetUpPinScreen from './setup-pin-screen';
import TextAvatar from 'react-native-text-avatar';
import randomColor from 'randomcolor';
import '../../../i18n';
import {useTranslation} from 'react-i18next';

var colors = randomColor({
  luminosity: 'dark',
   hue: 'blue'
});

function PinScreen(props) {
  const { fetching, navigation, registerAccount, account } = props;
  const {t, i18n} = useTranslation();
  
  // handlePressReset = async() => {
  //   const {account} = this.props
  //   const ResetPin =  await deleteUserPinCode(account.email)
  //   if(ResetPin){
  //       setlockScreen()
  //    }else{
  //     Alert.alert('error', 'Error', 'Sorry ! Please Login Account Your Account');
  //    }
  // }

  // handleChangePassword = (text) => {
  //   this.setState({ password: text })
  // }
  React.useEffect(() => {
   
  }, []);
 const handleLocked = (pin) => {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'error',
        text2: 'You Can not Quick Until Finish Time',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        
      });
  };
const handlePressLock = (pin) => {
    if (account.pin == pin) {
      navigation.navigate('Home');
    } else {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'error',
        text2: 'Wrong Pin! Please Check It Again',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        
      });
    }
  };
  
    if (!account) {
      return null;
    }
    if (account.pin == null || account.pin == undefined) {
      return <SetUpPinScreen />;
    }
    return (
      <View contentContainerStyle={styles.contentContainer} style={styles.container} keyboardShouldPersistTaps="always">
        <View style={styles.profile}>
          
          <TextAvatar
          backgroundColor={Colors.secondary}
          size={80}
          type={'circle'} // optional
          >{account?.fullName}</TextAvatar>
          <Text style={styles.name}>{account?.fullname}</Text>
        </View>
        {/* <Button transparent style={styles.reset} onPress={()=>this.handlePressReset()}><Text style={styles.resetText}> Reset </Text></Button> */}
        <View style={styles.form}>
          <PINCode
            timeLocked={10000}
            maxAttempts={3}
            status={'enter'}
            touchIDDisabled={true}
            pinCodeKeychainName={account ? account?.phoneNumber : null}
            styleLockScreenButton={{ backgroundColor: Colors.primary }}
            styleLockScreenText={{ color: Colors.white, fontWeight: '400', fontSize: 18 }}
            styleLockScreenTextTimer={{ color: Colors.primary, fontWeight: '400', fontSize: 20 }}
            styleLockScreenTitle={{ color: Colors.panther, fontWeight: '400', fontSize: 20 }}
            stylePinCodeChooseContainer={{ flex: 1, backgroundColor: Colors.primary }}
            colorPassword={Colors.primary}
            colorCircleButtons={Colors.primary}
            stylePinCodeTextTitle={{ backgroundColor: Colors.white, fontWeight: '400' }}
            stylePinCodeTextButtonCircle={{ fontSize: 25, fontWeight: '100', color: Colors.primary }}
            colorPasswordEmpty={Colors.blue}
            colorPasswordError={Colors.viole}
            stylePinCodeButtonNumber={Colors.white}
            handleResultEnterPin={(pinStatus) => handlePressLock(pinStatus)}
            onClickButtonLockedPage={handleLocked}
          />
        </View>
      </View>
    );
  }

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PinScreen);

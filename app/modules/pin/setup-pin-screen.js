import React from 'react';
import { Alert, Image, View, Text } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';
import styles from './pin-screen.styles';
import { Images, Metrics, Colors } from '../../shared/themes';
import AccountActions from '../../shared/reducers/account.reducer';
import PINCode, { hasUserSetPinCode } from '@haskkor/react-native-pincode';
import TextAvatar from 'react-native-text-avatar';
import { Thumbnail } from 'native-base';
import randomColor from 'randomcolor';
import '../../../i18n';
import {useTranslation} from 'react-i18next';
import PinScreen from './pin-screen';
var colors = randomColor({
  luminosity: 'dark',
   hue: 'blue'
});
function SetUpPinScreen(props) {
  const { account,setLockScreen } = props;
  const {t, i18n} = useTranslation();


const handlePressLock = async (pin) => {
    const hasPin = await hasUserSetPinCode(account.telephone);
    if (hasPin) {
      setLockScreen({ account, pin });
    } else {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'error',
        text2: 'Sorry ! Please Setup Pin',
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
    return (
      <View
        contentContainerStyle={styles.contentContainer}
        style={[styles.container]}
        keyboardShouldPersistTaps="always">
        <View style={styles.profile}>
          <Text style={styles.name}>{t('screen.setupPin.title')}</Text>
         
          <TextAvatar
          backgroundColor={Colors.secondary}
          size={80}
          type={'circle'} // optional
          >{account?.fullName}</TextAvatar>
          <Text style={styles.name}>{account?.fullname }</Text>
        </View>
        <View style={styles.form}>
          <PINCode
            timeLocked={10000}
            status={'choose'}
            touchIDDisabled={true}
            pinCodeKeychainName={account ? account.telephone : null}
            styleLockScreenButton={{ backgroundColor: Colors.primary }}
            styleLockScreenText={{ color: Colors.white, fontWeight: '400', fontSize: 18 }}
            styleLockScreenTextTimer={{ color: Colors.white, fontWeight: '400', fontSize: 20 }}
            styleLockScreenTitle={{ color: Colors.white, fontWeight: '400', fontSize: 20 }}
            colorPassword={Colors.primary}
            colorCircleButtons={Colors.primary}
            stylePinCodeTextTitle={{ backgroundColor: Colors.white, fontWeight: '400' }}
            stylePinCodeTextButtonCircle={{ fontSize: 25, fontWeight: '100', color: 'white' }}
            colorPasswordEmpty={Colors.blue}
            colorPasswordError={Colors.viole}
            stylePinCodeButtonNumber={Colors.white}
            finishProcess={(text) => handlePressLock(text)}
          />
        </View>
      </View>
    );
  }


const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    fetching: state.account.setupPinfetching,
    nerror: state.account.setupPinerror,
    success: state.account.setupPinsuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLockScreen: (pin) => dispatch(AccountActions.setupPinRequest(pin)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetUpPinScreen);

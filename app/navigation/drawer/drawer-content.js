import React from 'react';
import { View,Image,Text, } from 'react-native';
import { DrawerItem, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { connect } from 'react-redux';
import LoginActions from '../../modules/login/login.reducer';
import AccountActions from '../../shared/reducers/account.reducer';

import { Images, Colors } from '../../shared/themes';
import styles from './drawer-content.style'
import TextAvatar from 'react-native-text-avatar';
import '../../../i18n';
import {useTranslation} from 'react-i18next';

function DrawerContent(props) {
  const { loaded, account, logout, navigation, language ,languageRequest } = props;
  const {t, i18n} = useTranslation();
  const [currentLanguage,setLanguage] =React.useState(language);
  
  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => err);
      languageRequest(value)
  };

  const logoutAndCloseDrawer = () => {
    logout();
    navigation.closeDrawer();
  };
  const handleHome = () => {
    navigation.navigate('Home');
    navigation.closeDrawer();
  };
  const handleBookingListScreen = () => {
    navigation.navigate('BookingListScreen');
    navigation.closeDrawer();
  };
  const handleAccountScreen = () => {
    navigation.navigate('EntityStack',{screen:'CustomerAccount'});
    navigation.closeDrawer();
  };
  const handleSupportScreen = () => {
    navigation.navigate('SupportScreen');
    navigation.closeDrawer();
  };
  const handlePrivacyScreen = () => {
    navigation.navigate('PrivacyScreen');
    navigation.closeDrawer();
  };
  const handleTermScreen = () => {
    navigation.navigate('TermCondationScreen');
    navigation.closeDrawer();
  };
  const handleSettingScreen = () => {
    // navigation.navigate('Kitchen');
    navigation.closeDrawer();
  };
  return !loaded ? null : (
    <DrawerContentScrollView style={styles.container} {...props} testID="drawerContentScrollView">
      <View style={styles.header}>
      {account && <DrawerItem icon={({ focused, color, size }) =><View style={styles.logo}>
      <TextAvatar
        backgroundColor={Colors.secondary}
        size={80}
        type={'circle'} // optional
       >{account?.fullName != null ? account.fullName : 'noname'}</TextAvatar>
      </View>} activeTintColor={Colors.primary} activeBackgroundColor={Colors.primary} label="Home" onPress={handleHome} />}
      <Text style={styles.title} >{account?.fullName}</Text>
      </View>
      <View style={styles.content}>
      {account && <DrawerItem  style={styles.menu}  icon={({ focused, color, size }) =><View style={styles.iconView}><Image source={Images.home} style={styles.icon}/></View>} activeTintColor={Colors.primary} activeBackgroundColor={Colors.primary} label={t('menu.home')} onPress={handleHome} />}
      {account && <DrawerItem  style={styles.menu} icon={({ focused, color, size }) =><View style={styles.iconView}><Image source={Images.support} style={styles.icon}/></View>} activeTintColor={Colors.primary} activeBackgroundColor={Colors.primary} label={t('menu.support')} onPress={handleSupportScreen} />}
      {account && <DrawerItem  style={styles.menu} icon={({ focused, color, size }) =><View style={styles.iconView}><Image source={Images.booking} style={styles.icon}/></View>} activeTintColor={Colors.primary} activeBackgroundColor={Colors.primary} label={t('menu.booking')} onPress={handleBookingListScreen} />}
      {account && <DrawerItem  style={styles.menu} icon={({ focused, color, size }) =><View style={styles.iconView}><Image source={Images.privacy} style={styles.icon}/></View>} activeTintColor={Colors.primary} activeBackgroundColor={Colors.primary} label={t('menu.privacy')} onPress={handlePrivacyScreen} />}
      {account && <DrawerItem  style={styles.menu} icon={({ focused, color, size }) =><View style={styles.iconView}><Image source={Images.term} style={styles.icon}/></View>} activeTintColor={Colors.primary} activeBackgroundColor={Colors.primary} label={t('menu.term')} onPress={handleTermScreen} />}
      {account && <DrawerItem style={styles.menu} icon={({ focused, color, size }) =><View style={styles.iconView}><Image source={Images.logout} style={styles.icon}/></View>} activeTintColor={Colors.primary} activeBackgroundColor={Colors.primary} label={t('menu.logout')} onPress={logoutAndCloseDrawer} />}
      </View>
      <View style={styles.footer}>
      {/* {account && <DrawerItem  style={styles.menu} icon={({ focused, color, size }) =><View style={styles.iconView}><Image source={Images.setting} style={styles.icon}/></View>} activeTintColor={Colors.primary} activeBackgroundColor={Colors.primary} label={t('menu.setting')} onPress={handleSettingScreen} />} */}
      </View>     

    </DrawerContentScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    loaded: state.appState.rehydrationComplete,
    account: state.account.account,
    language:state.account.language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logoutRequest()),
    languageRequest: (language) => dispatch(AccountActions.languageRequest(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

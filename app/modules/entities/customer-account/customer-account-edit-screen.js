import React, { createRef } from 'react';
import { ActivityIndicator, Text, View,Image, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Images, Colors } from '../../../shared/themes'
import CustomerAccountActions from './customer-account.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './customer-account-edit.style';
import {  Picker,  DateTimePicker, Avatar} from 'react-native-ui-lib';
import _ from 'lodash';
import HomeActions from '../../home/home-reducer'
import {  Button,  } from 'native-base';
import Toast from 'react-native-toast-message';
import '../../../../i18n';
import {useTranslation} from 'react-i18next';


function CustomerAccountEditScreen(props) {
  const { getCustomerAccount,getAllCustomerAccounts,error, updateBooking,services,handleOpenModel, getService, route, account, customerAccount, fetching, customerAccountParams, updating, errorUpdating, updateSuccess, navigation, reset } = props;
  const {t, i18n} = useTranslation();

  const [from, setFrom] = React.useState();
  const [accountNumber, setAccountNumber] = React.useState('');


  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    getService()
    if (!isNewEntity) {
      getCustomerAccount(route.params.entityId);
      
    } else {

    }
  }, [getService, getCustomerAccount, route]);

  // fetch related entities
  React.useEffect(() => {}, []);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'error',
          text2: errorUpdating,
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          
        });
        handleOpenModel();
      } else if (updateSuccess) {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Success',
          text2: "Successfully Created",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          
        });
        handleOpenModel();
        getAllCustomerAccounts(account.id);
      }
    }
    if(!fetching){
      if(error){
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'error',
          text2: errorUpdating,
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          
        });
      }else{
        setFrom({
          provider:customerAccount.provider,
          accountName:customerAccount.provider?.providerName
        }),
        setAccountNumber(customerAccount.account)
      }
    }
  }, [updateSuccess, errorUpdating,updating, customerAccount, fetching, navigation]);

  const onSubmit = (data) => {

    if (customerAccount.id) {
      const accountData = {
        id:customerAccount.id,
        provider: from.provider?.id,
        account:accountNumber,
        customer:account?.id
      }
      updateBooking(accountData)
    }else{
      const accountData = {
        provider: from.provider?.id,
        account:accountNumber,
        customer:account?.id
      }
      updateBooking(accountData)
    }
    
  };


  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="bookingEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag" style={styles.content}>
         <View style={styles.row}>
          <Text style={styles.label}>{t('screen.customerAccount.AccountType')}:</Text>
         <View style={styles.inputPicker}>
                    <Picker
                    containerStyle={styles.textInputPicker}
                    style={styles.picker}
                    value={from}
                    rightIconSource={Images.dropdown}
                    onChange={(text)=>setFrom(text)}
                    renderPicker={type => {
                      if(type){
                        return (
                          <View style={styles.selectPicker}>
                             <Image source={type.thumbnail} style={styles.paymentTypeIcon}/>
                              <Text style={styles.selectTitle}>
                                {type.accountName.toUpperCase()} 
                              </Text>
                              <Image source={Images.dropdown} style={styles.dropdownIcon}/>
                            </View>
                          );
                      }else{
                        return (
                          <View style={styles.selectPicker}>
                              <View style={styles.paymentTypeIcon}/>
                              <Text style={[styles.selectTitle,{color:Colors.text}]}>
                              {t('screen.customerAccount.AccountType')} 
                              </Text>
                              <Image source={Images.dropdown} style={styles.dropdownIcon}/>
                            </View>
                          );
                      }
                    }}
                    >
                      {_.map(services?.rows, items => (
                      <Picker.Item
                        key={items?.id}
                        value={items}
                        renderItem={(item, props) => (
                          <View
                            style={styles.list}
                          >
                            <View style={styles.listRow}>
                              <Avatar size={50} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Borama2.jpg'}}/>
                              <Text style={styles.listTitle}>
                              {items?.accountName.toUpperCase()}  
                              </Text>
                            </View>
                          </View>
                        )}
                        getItemLabel={item => item.id}
                      />
                    ))}
                  </Picker>
                </View> 
                </View>
                <View style={styles.row}>
                <Text style={styles.label}>{t('screen.customerAccount.AccountNumber')}:</Text>
                <View style={styles.input}>
                  <View style={styles.input}>
                  <TextInput
                    testID="loginScreenUsername"
                    style={styles.textInput}
                    value={accountNumber}
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value)=>setAccountNumber(value)}
                    underlineColorAndroid="transparent"
                    placeholder="Account Number(6X XXXXXX)"
                    placeholderTextColor={Colors.text}
                  />
                </View>
              </View>
              </View>
               <Button style={styles.button} onPress={()=>onSubmit()}>
                <Image source={Images.check} style={styles.buttonIcon}/>     
                <Text style={styles.buttonText}>{t('screen.customerAccount.SaveAccount')}</Text>
              </Button>
      </KeyboardAwareScrollView>
    </View>
  );
}

 
const mapStateToProps = (state) => {
  return {
    customerAccount: state.customerAccount.customerAccount,
    fetching: state.customerAccount.fetchingOne,
    updating: state.customerAccount.updating,
    updateSuccess: state.customerAccount.updateSuccess,
    errorUpdating: state.customerAccount.errorUpdating,
    services: state.home.services,
    account: state.account.account,
    error:state.customerAccount.errorOne
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomerAccount: (id) => dispatch(CustomerAccountActions.customerAccountRequest(id)),
    updateBooking: (booking) => dispatch(CustomerAccountActions.customerAccountUpdateRequest(booking)),
    reset: () => dispatch(CustomerAccountActions.customerAccountReset()),
    getService: () => dispatch(HomeActions.serviceRequest()),
    getAllCustomerAccounts: (id) => dispatch(CustomerAccountActions.customerAccountAllRequest(id)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAccountEditScreen);

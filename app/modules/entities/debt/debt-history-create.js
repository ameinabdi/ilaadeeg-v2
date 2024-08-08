import React, { createRef } from 'react';
import { ActivityIndicator,Text, Platform,Image, View, TextInput,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import DebtActions from './debt.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './debt-history-create.style';
import { Card, CardItem, Body, Button,Textarea, Tab, Tabs, Item, Container,Header, Left, Right, Content, Row, Col } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors,Animation, Images } from '../../../shared/themes';
import {
  Dialog,
  Picker,
  Avatar,
  Assets,
  PanningProvider,
  Switch,
  Typography,DateTimePicker
} from 'react-native-ui-lib';
import _  from 'lodash';
import moment from 'moment';
import Toast from 'react-native-toast-message';



function DebtHistoryScreen(props) {
  const { getBooking,getDebt, debtUpdateHistory,account, handleOpenModel, debtData,type, fetching, updating, errorUpdating, updateSuccess, navigation, reset } = props;

  const [amount, setAmount] = React.useState(0);
  const [personalNote, setPersonalNote] = React.useState(null);
  const [transactionDate, setTransactionDate] = React.useState(new Date());
  

  // fetch related entities
  React.useEffect(() => {}, []);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'error',
          text2: errorUpdating.detail ? errorUpdating.detail : 'Something went wrong creating the debt',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          
        });
      } else if (updateSuccess) {
        handleOpenModel();
        getDebt(debtData.id);

      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = () => {

    if( !amount  || !transactionDate ){
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'error',
        text2: 'Empty Field! Please Make Sure All Feilds',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        
      });
    }else{
      if(type === 'Send'){
        const FormData = {
          type,
          debt:debtData?.id,
          amount:amount,
          personalNote: personalNote,
          transactionDate,
          borrowCustomerStatus:'Created',
          borrowCustomerDate: new Date(),
          borrowCustomer: account?.id,
          lendCustomerStatus:'Invited',
          lendCustomerDate: null,
          lendCustomer: null,
        }
        debtUpdateHistory(FormData)

      }else if(type === 'Borrow'){
        const FormData = {
          type,
          debt:debtData?.id,
          amount:-amount,
          personalNote: personalNote,
          transactionDate,
          borrowCustomerStatus:'Invited',
          borrowCustomerDate: null,
          borrowCustomer: null,
          lendCustomerStatus:'Created',
          lendCustomerDate: new Date(),
          lendCustomer: account?.id,
        }
        debtUpdateHistory(FormData)
      }
      else if(type === 'Lend'){
        const FormData = {
          type,
          debt:debtData?.id,
          amount:amount,
          personalNote: personalNote,
          transactionDate,
          borrowCustomerStatus:'Invited',
          borrowCustomerDate: null,
          borrowCustomer: null,
          lendCustomerStatus:'Created',
          lendCustomerDate: new Date(),
          lendCustomer: account?.id,
        }
        debtUpdateHistory(FormData)
      }
      else if(type === 'Receive'){
        const FormData = {
          type,
          debt:debtData?.id,
          amount:-amount,
          personalNote: personalNote,
          transactionDate,
          borrowCustomerStatus:'Invited',
          borrowCustomerDate: null,
          borrowCustomer: null,
          lendCustomerStatus:'Created',
          lendCustomerDate: new Date(),
          lendCustomer: account?.id,
        }
        debtUpdateHistory(FormData)
      }
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
    <Container testID="debtScreen" style={styles.container}>
    <Content>
            <Row style={styles.row}>
              <Col style={styles.col}>
              <Text style={styles.label}>
               Amount:
              </Text>
              <View style={styles.input}>
                  <TextInput
                    testID="loginScreenUsername"
                    style={styles.textInput}
                    value={amount}
                    keyboardType="decimal-pad"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value)=>setAmount(value)}
                    placeholderTextColor={Colors.title}
                    underlineColorAndroid="transparent"
                    placeholder="0.00"
                  />
            </View>
                  
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col style={styles.col}>
              <Text style={styles.label}>
               Personal Note:
              </Text>
              <View style={styles.TextAreainput}>
                <Textarea 
                  style={styles.textInput}    
                  onChangeText={(value)=>setPersonalNote(value)}
                  value={personalNote}
                  rowSpan={5}
                />
              </View>
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col style={styles.col}>
              <Text style={styles.label}>
               Transaction Date:
              </Text>
              <View style={styles.input}>
                <DateTimePicker
                  minimumDate={new Date()}
                  locale={'en'}
                  testID="dateTimePicker"
                  value={Platform.OS =="android"  ? undefined:transactionDate}
                  mode="date"
                  display="compact"
                  onChange={(newDate) => {
                    setTransactionDate(newDate);
                  }}
                  containerStyle={styles.inputDate}
                  />
              </View>
              </Col>
              </Row>
              <Button style={styles.button} onPress={()=>onSubmit('Borrow')}>
                <Image source={Images.check} style={styles.buttonIcon}/>     
                <Text style={styles.buttonText}>Save</Text>
              </Button>
    </Content>
</Container>
  );
}


const mapStateToProps = (state) => {
  return {
    debt: state.debts.debt,
    fetching: state.debts.fetchingOne,
    updating: state.debts.updatingHistory,
    updateSuccess: state.debts.updateHistorySuccess,
    errorUpdating:state.debts.errorUpdatingHistory,
    debt:state.debts.updateSuccess,
    account: state.account.account,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDebt: (id) => dispatch(DebtActions.debtRequest(id)),
    getBooking: (id) => dispatch(DebtActions.debtRequest(id)),
    getAllBookings: (options) => dispatch(DebtActions.debtAllRequest(options)),
    updateDebt: (debt) => dispatch(DebtActions.debtUpdateRequest(debt)),
    debtUpdateHistory: (debt) => dispatch(DebtActions.debtUpdateHistoryRequest(debt)),
    reset: () => dispatch(DebtActions.debtReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DebtHistoryScreen);

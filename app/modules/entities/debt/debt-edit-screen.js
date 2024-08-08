import React, { createRef } from 'react';
import { ActivityIndicator,Text, Platform,Image, View, TextInput,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import DebtActions from './debt.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './debt-edit-styles';
import { Card, CardItem, Body, Button,Textarea, Tab, Tabs, Item, Container,Header, Left, Right, Content, Row, Col } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors,Animation, Images } from '../../../shared/themes';
import {
  Picker,
  Assets,
  Switch,
  DateTimePicker
} from 'react-native-ui-lib';
import _  from 'lodash';
import Contacts from 'react-native-contacts';
import TextAvatar from 'react-native-text-avatar';
import moment from 'moment';
import Toast from 'react-native-toast-message';

const contacts =[];
const currencies =[
  {
    name:'USD',
  },
  {
    name:'SLSH',
  }
];

function DebtEditScreen(props) {
  const { getBooking, updateDebt,account, route, debt, fetching, updating, errorUpdating, updateSuccess, navigation, reset } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');
  const [contacts, setContacts] = React.useState([]);
  const [contact, setContact] = React.useState(null);
  const [amount, setAmount] = React.useState(0);
  const [personalNote, setPersonalNote] = React.useState(null);
  const [transactionDate, setTransactionDate] = React.useState(new Date());
  const [repaymentDate, setRepaymentDate] = React.useState(new Date());
  const [remindme, setRemindme] = React.useState(false);
  const [currency, setCurrency] = React.useState(currencies[0]);

  const isNewEntity = !(route.params && route.params.entityId);
  React.useEffect(() => {
    if (!isNewEntity) {
      getBooking(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getBooking, route, reset]);

  React.useEffect(() => {
    Contacts.getAll()
      .then(contacts => {
        setContacts(contacts)
      })
      .catch(e => {
        setContacts([])
      });
    if (isNewEntity) {
    } else if (!fetching) {
    }

  }, [debt, fetching, isNewEntity]);

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
        setError('');
        navigation.navigate('Home');
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (type) => {
    if(!contact || !type || !amount || !personalNote || !transactionDate || !repaymentDate || !repaymentDate || !currency){
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
      const FormData = {
        type:type,
        telephone:'+252'+parseInt((contact.phoneNumbers[0].number).replace(/[^0-9]/g, ''), 10),
        fullname: contact.givenName+' '+contact.middleName+' '+contact.familyName,
        amount:amount,
        personalNote: personalNote,
        transactionDate,
        repaymentDate,
        currency:currency?.name,
        remindme,
        customer:account?.id
      }
      updateDebt(FormData)
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
    <View style={styles.header}>
          <Left>
             <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>props.navigation.navigate('Home')}/>
          </Left>
          <Body>
            <Text style={styles.haederTitle}>Your Debt</Text>
          </Body>
          <Right>
          <Icon name="plus" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>props.navigation.navigate('EntityStack',{screen:'DebtEdit'})}/>
          </Right>
    </View>
    <Content>
     <Tabs>
          <Tab heading="Lend">
            <View style={styles.content}>
            <Row style={styles.row}>
              <Col style={styles.col}>
              <Text style={styles.label}>
               Who I Owe:
              </Text>
          <Picker
            value={contact}
            onChange={contact => setContact(contact)}
            getItemValue={contact => contact?.familyName}
            renderPicker={contact => {
              if(contact){
                return (
                  <View style={styles.item}>
                    <TextAvatar
                      backgroundColor={Colors.primary}
                      size={40}
                      type={'circle'} // optional
                      >{contact ? contact.givenName : ''}</TextAvatar>
                      <View style={styles.itemTextContainer}>
                        <Text style={styles.itemText}>
                        {contact.givenName+' '+contact.familyName}
                        </Text>
                        <Text style={styles.itemTelephone}>
                          {contact.phoneNumbers[0]?.number}
                        </Text>
                     </View>
                  </View>
                ); 
              }else{
                return (
                  <View style={styles.item}>
                    <TextAvatar
                      backgroundColor={Colors.primary}
                      size={40}
                      type={'circle'} // optional
                      >{''}</TextAvatar>
                      <View style={styles.itemTextContainer}>
                        <Text style={styles.itemText}>
                         
                        </Text>
                        <Text style={styles.itemTelephone}>
                          
                        </Text>
                     </View>
                  </View>
                );
              }
              
            }}
            showSearch
            searchPlaceholder={'Search From Contact'}
            searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.grey50}}
          >
            {_.map(contacts, contact => (
              <Picker.Item
                key={contact.name}
                value={contact}
                renderItem={(item, props) => (
                  <View style={styles.itemContainer}>
                    <View style={styles.item}>
                        <TextAvatar
                        backgroundColor={Colors.primary}
                        size={40}
                        type={'circle'} // optional
                        >{item.givenName}</TextAvatar>
                      <View style={styles.itemTextContainer}>
                      <Text style={styles.itemText}>
                        {item.givenName+' '+item.familyName}
                      </Text>
                      <Text style={styles.itemTelephone}>
                        {item.phoneNumbers[0]?.number}
                      </Text>
                      </View>
                    </View>
                    {props.isSelected && <Icon source={Assets.icons.check}/>}
                  </View>
                )}
                getItemLabel={item => item.familyName}
              />
            ))}
          </Picker>
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col style={styles.col}>
              <Text style={styles.label}>
               Amount:
              </Text>
              <View style={styles.rowInput}>
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
              <Col style={styles.col}>
              <Text style={styles.label}>
               Currency:
              </Text>
              <View style={styles.input}>
              <Picker
                value={currency}
                onChange={currency => setCurrency(currency)}
                getItemValue={currency => currency?.familyName}
                renderPicker={currency => {
                    return (
                      <View style={styles.item}>
                          <View style={styles.itemTextContainer}>
                            <Text style={styles.itemText}>
                              {currency.name}
                            </Text>
                        </View>
                      </View>
                    ); 
                }}
               > 
                  {_.map(currencies, currency => (
              <Picker.Item
                key={currency.name}
                value={currency}
                renderItem={(item, props) => (
                  <View style={styles.itemContainer}>
                    <View style={styles.item}>
                      <View style={styles.itemTextContainer}>
                      <Text style={styles.itemText}>
                        {item.name}
                      </Text>
                      </View>
                    </View>
                    {props.isSelected && <Icon source={Assets.icons.check}/>}
                  </View>
                )}
                getItemLabel={item => item.familyName}
              />
            ))}
          </Picker>
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
                  style={styles.textArea}    
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
              <View style={styles.rowInput}>
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
              <Col style={styles.col}>
              <Text style={styles.label}>
               Repayment Date:
              </Text>
              <View style={styles.rowInput}>
                <DateTimePicker
                  minimumDate={new Date()}
                  locale={'en'}
                  testID="dateTimePicker"
                  value={Platform.OS =="android"  ? undefined:repaymentDate}
                  mode="date"
                  display="compact"
                  onChange={(newDate) => {
                    setRepaymentDate(newDate);
                  }}
                  containerStyle={styles.inputDate}
                  />
              </View>
              </Col>
            </Row>
            <Row style={styles.rowRemind}>
             <Col style={styles.colLeftRemind}>
                <Text style={styles.titleRemind}>Remind Me!</Text>
                <Text style={styles.textRemind}>On The Day Of Repayment</Text>
              </Col>
              <Col style={styles.colRightRemind}>
              <Switch
                  width={50}
                  height={30}
                  thumbSize={25}
                  onColor={Colors.grey20}
                  offColor={Colors.grey60}
                  thumbColor={Colors.grey10}
                  value={remindme}
                  onValueChange={(value) => setRemindme(value)}
                />
              </Col>
            </Row>
            <Button style={styles.button} onPress={()=>onSubmit('Lend')}>
                <Image source={Images.check} style={styles.buttonIcon}/>     
                <Text style={styles.buttonText}>Save</Text>
              </Button>
            </View>
          </Tab>


          <Tab heading="Borrow">
          <View style={styles.content}>
            <Row style={styles.row}>
              <Col style={styles.col}>
              <Text style={styles.label}>
               Who Owes Me:
              </Text>
          <Picker
            value={contact}
            onChange={contact => setContact(contact)}
            getItemValue={contact => contact?.familyName}
            renderPicker={contact => {
              if(contact){
                return (
                  <View style={styles.item}>
                    <TextAvatar
                      backgroundColor={Colors.primary}
                      size={40}
                      type={'circle'} // optional
                      >{contact ? contact.familyName : ''}</TextAvatar>
                      <View style={styles.itemTextContainer}>
                        <Text style={styles.itemText}>
                          {contact.familyName+' '+contact.givenName}
                        </Text>
                        <Text style={styles.itemTelephone}>
                          {contact.phoneNumbers[0]?.number}
                        </Text>
                     </View>
                  </View>
                ); 
              }else{
                return (
                  <View style={styles.item}>
                    <TextAvatar
                      backgroundColor={Colors.primary}
                      size={40}
                      type={'circle'} // optional
                      >{''}</TextAvatar>
                      <View style={styles.itemTextContainer}>
                        <Text style={styles.itemText}>
                         
                        </Text>
                        <Text style={styles.itemTelephone}>
                          
                        </Text>
                     </View>
                  </View>
                );
              }
              
            }}
            showSearch
            searchPlaceholder={'Search From Contact'}
            searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.grey50}}
          >
            {_.map(contacts, contact => (
              <Picker.Item
                key={contact.name}
                value={contact}
                renderItem={(item, props) => (
                  <View style={styles.itemContainer}>
                    <View style={styles.item}>
                        <TextAvatar
                        backgroundColor={Colors.primary}
                        size={40}
                        type={'circle'} // optional
                        >{item.familyName}</TextAvatar>
                      <View style={styles.itemTextContainer}>
                      <Text style={styles.itemText}>
                        {item.familyName+' '+item.givenName}
                      </Text>
                      <Text style={styles.itemTelephone}>
                        {item.phoneNumbers[0]?.number}
                      </Text>
                      </View>
                    </View>
                    {props.isSelected && <Icon source={Assets.icons.check}/>}
                  </View>
                )}
                getItemLabel={item => item.familyName}
              />
            ))}
          </Picker>
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col style={styles.col}>
              <Text style={styles.label}>
               Amount:
              </Text>
              <View style={styles.rowInput}>
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
              <Col style={styles.col}>
              <Text style={styles.label}>
               Currency:
              </Text>
              <View style={styles.input}>
              <Picker
                value={currency}
                onChange={currency => setCurrency(currency)}
                getItemValue={currency => currency?.familyName}
                renderPicker={currency => {
                    return (
                      <View style={styles.item}>
                          <View style={styles.itemTextContainer}>
                            <Text style={styles.itemText}>
                              {currency.name}
                            </Text>
                        </View>
                      </View>
                    ); 
                }}
               > 
                  {_.map(currencies, currency => (
              <Picker.Item
                key={currency.name}
                value={currency}
                renderItem={(item, props) => (
                  <View style={styles.itemContainer}>
                    <View style={styles.item}>
                      <View style={styles.itemTextContainer}>
                      <Text style={styles.itemText}>
                        {item.name}
                      </Text>
                      </View>
                    </View>
                    {props.isSelected && <Icon source={Assets.icons.check}/>}
                  </View>
                )}
                getItemLabel={item => item.familyName}
              />
            ))}
          </Picker>
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
                  style={styles.textArea}    
                  onChangeText={(value)=>setPersonalNote(value)}
                  value={personalNote}
                  autoCorrect={false}
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
              <View style={styles.rowInput}>
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
              <Col style={styles.col}>
              <Text style={styles.label}>
               Repayment Date:
              </Text>
              <View style={styles.rowInput}>
                <DateTimePicker
                  minimumDate={new Date()}
                  locale={'en'}
                  testID="dateTimePicker"
                  value={Platform.OS =="android"  ? undefined:repaymentDate}
                  mode="date"
                  display="compact"
                  onChange={(newDate) => {
                    setRepaymentDate(newDate);
                  }}
                  containerStyle={styles.inputDate}
                  />
              </View>
              </Col>
            </Row>
            <Row style={styles.rowRemind}>
             <Col style={styles.colLeftRemind}>
                <Text style={styles.titleRemind}>Remind Me!</Text>
                <Text style={styles.textRemind}>On The Day Of Repayment</Text>
              </Col>
              <Col style={styles.colRightRemind}>
              <Switch
                  width={50}
                  height={30}
                  thumbSize={25}
                  onColor={Colors.grey20}
                  offColor={Colors.grey60}
                  thumbColor={Colors.grey10}
                  value={remindme}
                  onValueChange={(value) => setRemindme(value)}
                />
              </Col>
            </Row>
            <Button style={styles.button} onPress={()=>onSubmit('Borrow')}>
                <Image source={Images.check} style={styles.buttonIcon}/>     
                <Text style={styles.buttonText}>Save</Text>
              </Button>
            </View>
          </Tab>
          
     </Tabs>
    </Content>
</Container>
  );
}


const mapStateToProps = (state) => {
  return {
    debt: state.debts.debt,
    fetching: state.debts.fetchingOne,
    updating: state.debts.updating,
    updateSuccess: state.debts.updateSuccess,
    errorUpdating: state.debts.errorUpdating,
    account: state.account.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBooking: (id) => dispatch(DebtActions.debtRequest(id)),
    getAllBookings: (options) => dispatch(DebtActions.debtAllRequest(options)),
    updateDebt: (debt) => dispatch(DebtActions.debtUpdateRequest(debt)),
    reset: () => dispatch(DebtActions.debtReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DebtEditScreen);

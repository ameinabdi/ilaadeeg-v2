import React,{useEffect} from 'react'
import { ActivityIndicator, Alert, Text, TextInput, View } from 'react-native'
import { connect } from 'react-redux'
import EventActions from './event.reducer'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Colors, Images } from '../../../shared/themes'
import { Form, Item,Button,Content, Textarea, Container,Header, Left, Body, Right } from 'native-base';
import { Col, Row } from "react-native-easy-grid";
// import DateTimePicker from '@react-native-community/datetimepicker';
import MenuIcon from 'react-native-vector-icons/Feather';
import {  Picker,  DateTimePicker} from 'react-native-ui-lib';
import styles from './event-entity-edit-screen-style'
import Stepper from 'react-native-stepper-ui';
import  EventType from '../../../shared/fixtures/evenTyps.json'
import  EventCategory from '../../../shared/fixtures/eventCategory.json'
import Toast from 'react-native-toast-message';
import {longOptions} from './logn';
import _ from 'lodash';
import { useFocusEffect,useIsFocused } from '@react-navigation/native';


function EventEntityEditScreen(props) {
  const { data, updating,isNewEntity,eventSetup,
    fetchingEventSetup,
    errorEventSetup, getEventSetup, error,event,reset,getEvent,account,updateEvent,fetching,navigation } = props

  const [id, setId] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [category, setCategory] = React.useState(null);
  const [tags, setTags] = React.useState(null);
  const [thumbnail, setThumbnail] = React.useState(null);
  const [startDate, setStartDate] = React.useState(new Date());
  const [startTime, setStartTime] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());
  const [location, setLocation] = React.useState(null);
  const [ticketQuantity, setTicketQuantity] = React.useState(0);
  const [ticketType, setTicketType] = React.useState(null);
  const [ticketvisibile, setTicketvisibile] = React.useState(null);
  const [ticketPrice, setTicketPrice] = React.useState(null);
  const [ticketDescription, setTicketDescription] = React.useState(null);
  const [ticketMinQuantity, setTicketMinQuantity] = React.useState(null);
  const [ticketMaxQuantity, setTicketMaxQuantity] = React.useState(null);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    getEventSetup();

    // if (!isNewEntity) {
    //   getBooking(route.params.entityId);
    // } else {
    //   reset();
    // }
    
  }, [getEventSetup]);
  
  // useEffect(() => {
  //   if (updating) {
  //     if (error) {
  //       Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
  //     } else {
  //       const entityId = event.id
  //       reset()
  //       getEvent(entityId)
  //       const alertOptions = [{ text: 'OK' }]
  //         alertOptions.push({
  //           text: 'View',
  //           onPress:()=>{},
  //         })
  //       Alert.alert('Success', 'Entity saved successfully', alertOptions)
  //     }
  //   }
  // }, [updating]) 

  // useFocusEffect(
  //   React.useCallback(() => {
  //    getEvent(data?.entityId)
    
  //   }, [ getEvent,data, navigation]),
  // );

  const submitForm = () => {
    // call getValue() to get the values of the form
    // if (title && active &&  description && 
    //   type &&  category &&  startDate &&  
    //   startTime &&  endDate &&  endTime && location && 
    //   ticketQuantity && 
    //   ticketType && 
    //   ticketPrice && 
    //   ticketDescription && 
    //   ticketvisibile && 
    //   ticketMinQuantity && 
    //   ticketMaxQuantity ) {
    //     const object = {
    //       'eventTitle':title,
    //       'description':description,
    //       'type':type,
    //       'category':category,
    //       'publish':'Private',
    //       'location':location,
    //       'startDate':startDate,
    //       'startTime':startTime,
    //       'endsDate':endDate,
    //       'endsTime':endTime, 
    //       'quantity':ticketQuantity,
    //       'types':ticketType,
    //       'price':ticketPrice,
    //       'description2':ticketDescription,
    //       'visibility':ticketvisibile,
    //       'minQuantityOrder':ticketMinQuantity,
    //       'maxQuantityOrder':ticketMaxQuantity,
    //       'event':null,
    //       'tenentId': account.tenants ? account.tenants[0].tenantId : null
 
    //     }
    //   // if validation fails, value will be null
    //  updateEvent(object)
    // } else {
      Alert.alert('333333')
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Feild Is Empty! Please Make Sure',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    // }
  }
 

    if (fetchingEventSetup) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <Container style={styles.container}>
        <Header style={styles.header} hasTabs>
           <Left>
           <Button style={styles.menubutton} transparent onPress={()=>{
               Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Error',
                text2: 'No seat selected! Please select seats',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
              });
           }}>
            <MenuIcon name="align-left" size={25} color={Colors.white} />
          </Button>
          </Left>
          <Body>
          <Text style={styles.title}>
            Create New Event
          </Text>
          </Body>
          <Right>

          </Right>
        </Header>
        <Content style={styles.content}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} testID="eventEditScrollView">
            <Stepper
            active={active}
            stepStyle={styles.steps}
            stepTextStyle={styles.stepText}
            content={[
              <View style={styles.form}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>Create Event</Text>
                </View>
                <View style={styles.row} animation="fadeInUp" delay={300}>
                  <Text style={styles.rowLabel}>Title</Text>
                  <View style={styles.input}>
                  <TextInput
                    testID="loginScreenUsername"
                    style={styles.textInput}
                    value={title}
                    keyboardType="ascii-capable"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text)=>setTitle(text)}
                    underlineColorAndroid="transparent"
                    placeholder="Event Name"
                  />
                  </View>
                </View>
                <Form style={styles.row}>
                  <Text style={styles.rowLabel}>Description</Text>
                  <View style={styles.input}>
                  <Textarea
                    testID="loginScreenUsername"
                    rowSpan={5}
                    
                    style={[styles.textInput,{paddingLeft:0,height:100}]}
                    value={description}
                    keyboardType="ascii-capable"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text)=>setDescription(text)}
                    underlineColorAndroid="transparent"
                    placeholder="Description About Event"
                  />
                  </View>
                </Form>
                <Row style={styles.row}>
                  <Col>
                  <Text style={styles.rowLabel}>Type</Text>
                  <View style={styles.inputPicker}>
                    <Picker
                    containerStyle={styles.textInputPicker}
                    mode="dropdown"
                    placeholder="Select Type"
                    placeholderStyle={{ color: Colors.primary }}
                    placeholderIconColor="#007aff"
                    value={type}
                    rightIconSource={Images.dropdown}
                    onChange={(text)=>setType(text)}
                    >
                       {
                        eventSetup?.EventTypes.map((items, index)=>{
                          return (<Picker.Item label={items.Type} value={items.Type} />)
                        })
                      }
                  </Picker>
                </View> 
                  </Col>
                  <Col>
                  <Text style={styles.rowLabel}>Category</Text>
                  <View style={styles.inputPicker}>
                    <Picker
                    containerStyle={styles.textInputPicker}
                    mode="dropdown"
                    placeholder="Select Category"
                    placeholderStyle={{ color: Colors.secondary }}
                    placeholderIconColor="#007aff"
                    value={category}
                    rightIconSource={Images.dropdown}
                    onChange={(text)=>setCategory(text)}
                    >
                    {
                        eventSetup?.EventCategories.map((items, index)=>{
                          return (<Picker.Item label={items.Category} value={items.Category} />)
                        })
                      }
                  </Picker>
                </View> 
                  </Col>
                </Row>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>Location</Text>
                </View>
                <View style={styles.row}>
                <Text style={styles.rowLabel}>Venue (Place)</Text>
                <View style={styles.inputPicker}>
                <Picker
                  placeholder="Location Where Event Happen"
                  value={location}
                  enableModalBlur={false}
                  onChange={(text)=>setLocation(text)}
                  topBarProps={{title: 'Locations'}}
                  containerStyle={styles.textInputPicker}
                  showSearch
                  searchPlaceholder={'Search a Location'}
                  searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.grey50}}
                  // onSearchChange={value => console.warn('value', value)}
                 >
                  {_.map(eventSetup?.locations, option => (
                    <Picker.Item key={option.id} value={{label: option.address, value:option.id}}/>
                  ))}
                </Picker>
                </View> 
                </View>
              </View>,
              <View style={styles.form}>
                  <View style={styles.titleView}>
                    <Text style={styles.titleText}>Schedule</Text>
                   </View>
                  <Row style={styles.row}>
                  <Col>
                  <Text style={styles.rowLabel}>Start Date</Text>
                  <View style={styles.inputPicker}>
                    <DateTimePicker
                      containerStyle={styles.textInputPicker}
                      placeholder={'Select a date'}
                      dateFormat={'MMM D, YYYY'}
                      value={startDate}
                      onDateChange={(date)=>setStartDate(date)}
                      textColor={Colors.primary}
                      minimumDate={new Date()}
                    />
                  </View>
                </Col>
                <Col>
                  <Text style={styles.rowLabel}>Start Time</Text>
                  <View style={styles.inputPicker}>
                   <DateTimePicker
                    testID="startTime"
                    value={startTime}
                    mode="time"
                    locale={"en"}
                    is24Hour={true}
                    display="default"
                    placeHolderText="Start Time"
                    containerStyle={styles.textInputPicker}
                    textColor={Colors.primary}
                    onDateChange={(Time)=>setStartTime(Time)}

                    />
                  </View>
                </Col>
                 </Row>   
                 <Row style={styles.row}>
                  <Col>
                  <Text style={styles.rowLabel}>End Date</Text>
                  <View style={styles.inputPicker}>
                   <DateTimePicker
                    testID="endDate"
                    value={endDate}
                    mode="date"
                    locale={"en"}
                    is24Hour={true}
                    display="default"
                    placeHolderText="End Date"
                    containerStyle={styles.textInputPicker}
                    textColor={Colors.primary}
                    onDateChange={(date)=>setEndDate(date)}

                    />
                  </View>
                </Col>
                <Col>
                  <Text style={styles.rowLabel}>End Time</Text>
                  <View style={styles.inputPicker}>
                   <DateTimePicker
                    minimumDate={new Date(1900, 1, 1)}
                    maximumDate={new Date()}
                    timeZoneOffsetInMinutes={undefined}
                    testID="endTime"
                    value={endTime}
                    mode="time"
                    locale={"en"}
                    is24Hour={true}
                    display="default"
                    placeHolderText="End Time"
                    containerStyle={styles.textInputPicker}
                    textColor={Colors.primary}
                    onDateChange={(Time)=>setEndTime(Time)}

                    />
                  </View>
                  </Col>
                </Row>
                
               
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>Ticket</Text>
                </View>
                <Row style={styles.row}>
                  <Col>
                  <Text style={styles.rowLabel}>Ticket Type</Text>
                  <View style={styles.inputPicker}>
                    <Picker
                    containerStyle={styles.textInputPicker}
                    mode="dropdown"
                    placeholder="Select Type "
                    placeholderStyle={{ color: Colors.secondary }}
                    placeholderIconColor="#007aff"
                    value={ticketType}
                    rightIconSource={Images.dropdown}
                    onChange={(value)=>setTicketType(value)}

                    >
                    <Picker.Item label="Paid" value="Paid" />
                    <Picker.Item label="Free" value="Free" />
                    <Picker.Item label="Donation" value="Donation" />
                  </Picker>
                </View> 
                  </Col>
                  <Col>
                  <Text style={styles.rowLabel}>Visibility</Text>
                  <View style={styles.inputPicker}>
                    <Picker
                    containerStyle={styles.textInputPicker}
                    mode="dropdown"
                    placeholder="Select Visibility"
                    placeholderStyle={{ color: Colors.secondary }}
                    placeholderIconColor="#007aff"
                    value={ticketvisibile}
                    rightIconSource={Images.dropdown}
                    onChange={(value)=>setTicketvisibile(value)}

                    >
                    <Picker.Item label="Public" value="Public" />
                    <Picker.Item label="Private" value="Private" />
                  </Picker>
                </View> 
                  </Col>
                </Row>
                <Row style={styles.row}>
                  <Col style={styles.col}>
                  <Text style={styles.rowLabel}>Quantity</Text>
                  <Item style={styles.input}>
                  <TextInput
                    
                    testID="loginScreenUsername"
                    style={styles.textInput}
                    value={ticketQuantity}
                    keyboardType="numeric"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value)=>setTicketQuantity(value)}
                    underlineColorAndroid="transparent"
                    placeholder="Number Of Ticket"
                  />
                  </Item>
                  </Col>
                  <Col  style={styles.col}>
                  <Text style={styles.rowLabel}>Price</Text>
                  <Item style={styles.input}>
                  <TextInput
                    
                    testID="loginScreenUsername"
                    style={styles.textInput}
                    value={ticketPrice}
                    keyboardType="decimal-pad"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value)=>setTicketPrice(value)}

                    underlineColorAndroid="transparent"
                    placeholder="Price Per Ticket"
                  />
                  </Item>
                  </Col>
                </Row>
                <Row style={styles.row}>
                  <Col>
                  <Text style={styles.rowLabel}>Maximum</Text>
                  <Item style={styles.input}>
                  <TextInput
                    
                    testID="loginScreenUsername"
                    style={styles.textInput}
                    value={ticketMaxQuantity}
                    keyboardType="numeric"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value)=>setTicketMaxQuantity(value)}

                    underlineColorAndroid="transparent"
                    placeholder="Maximum Tickets Order"
                  />
                  </Item>
                  </Col>
                  <Col>
                  <Text style={styles.rowLabel}>Minimum</Text>
                  <Item style={styles.input}>
                  <TextInput
                    testID="loginScreenUsername"
                    style={styles.textInput}
                    value={ticketMinQuantity}
                    keyboardType="numeric"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value)=>setTicketMinQuantity(value)}

                    underlineColorAndroid="transparent"
                    placeholder="Minimum Ticket Order"
                  />
                  </Item>
                  </Col>
                  </Row>
              </View>
              ,
              <View style={styles.form}>
                
                
                <View style={styles.row} animation="fadeInUp" delay={300}>
                  <Text style={styles.rowLabel}>Ticket Description</Text>
                  <View style={styles.input}>
                  <Textarea
                   
                    testID="loginScreenUsername"
                    rowSpan={5}
                    
                    style={[styles.textInput,{paddingLeft:0,height:100}]}
                    value={ticketDescription}
                    keyboardType="ascii-capable"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value)=>setTicketDescription(value)}
                    underlineColorAndroid="transparent"
                    placeholder="About Ticket"
                  />
                  </View>
                </View>
               
              </View>
            ]}
            buttonStyle={styles.loginButton}
            buttonTextStyle={styles.loginText}
            onBack={() =>setActive(active - 1)}
            onFinish={submitForm}
            onNext={() =>setActive(active + 1)}
          />
        </KeyboardAwareScrollView>
        </Content>
      </Container>
    )
  }


const mapStateToProps = (state) => {
  return {
    event: state.events.event,
    fetching: state.events.fetchingOne,
    updating: state.events.updating,
    error: state.events.errorUpdating,
    
    fetchingEventSetup: state.events.fetchingEventSetup,
    eventSetup: state.events.eventSetup,
    errorEventSetup: state.events.errorEventSetup,
    account:state.account.account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEvent: (id) => dispatch(EventActions.eventRequest(id)),
    getAllEvents: (options) => dispatch(EventActions.eventAllRequest(options)),
    updateEvent: (event) => dispatch(EventActions.eventUpdateRequest(event)),
    reset: () => dispatch(EventActions.eventReset()),
    getEventSetup: (option) => dispatch(EventActions.eventSetupRequest(option)),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EventEntityEditScreen);


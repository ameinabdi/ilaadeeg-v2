import React from 'react'
import { ActivityIndicator, Alert, Text, TouchableOpacity,TextInput, View } from 'react-native'
import { connect } from 'react-redux'
import EventActions from './event.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { eventEntityDetailScreen } from '../../../navigation/layouts'
import { Colors, Images, Metrics } from '../../../shared/themes'
import Icon from 'react-native-vector-icons/AntDesign'
import { Form, Item,Input, Picker, Button,DatePicker,Textarea } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import DateTimePicker from '@react-native-community/datetimepicker';

import t from 'tcomb-form-native'

import styles from './event-edit-component-style'
import Stepper from 'react-native-stepper-ui';
import  EventType from '../../../shared/fixtures/evenTyps.json'
import  EventCategory from '../../../shared/fixtures/eventCategory.json'


class EventEditComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      title:'',
      summary:'',
      description:'',
      type:'',
      category:'',
      tags:'',
      thumbnail:'',
      video:'',
      publish:'',
      startDate:new Date(),
      startTime:new Date(),
      endDate:new Date(),
      endTime:new Date(),
      address1:'',
      address2:'',
      location:[],
      longitude:'',
      latitude:'',
      city:'',
      state:'',
      country:'',
      active:0,
      ticketName:'',
      ticketQuantity:0,
      ticketType:null,
      ticketsale:null,
      ticketPrice:null,
      ticketDescription:'',
      ticketvisibile:'',
      ticketMinQuantity:0,
      ticketMaxQuantity:0,
      ticketSaleChannel:'',
      
      }

    this.submitForm = this.submitForm.bind(this)

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.event !== prevState.event && !prevState.isNewEntity) {
      return { formValue: nextProps.event, event: nextProps.event }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        const entityId = this.props.event.id
        this.props.reset()
        this.props.getEvent(entityId)
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: eventEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  submitForm() {
    // call getValue() to get the values of the form
    const {
      title,active, description,
      summary, type, category, startDate, 
      startTime, endDate, endTime,location,
      ticketName,
      ticketQuantity,
      ticketType,
      ticketsale,
      ticketPrice,
      ticketDescription,
      ticketvisibile,
      ticketMinQuantity,
      ticketMaxQuantity,
      ticketSaleChannel,
      publish
      } = this.state;
      const { account ,  eventDatail} = this.props;
   
        const object = {
          'id': eventDatail.id,
          'eventTitle':title ? title :eventDatail.eventTitle,
          'summary':summary?  summary:eventDatail.summary,
          'description':description?description  :eventDatail.description,
          'type':type? type :eventDatail.type,
          'category':category?category  :eventDatail.category,
          'publish':'Private',
          'locationId':eventDatail.location[0].id,
          'address1':location.description,
          'address2':location.place_id,
          'longitude':0,
          'latitude':0,
          'city':'',
          'state':'',
          'country':'',
          'scheduleId':eventDatail.schedule[0].id,
          'startDate':startDate ? startDate :eventDatail.schedule[0].startDate,
          'startTime':startTime? startTime :eventDatail.schedule[0].startTime,
          'endsDate':endDate? endDate :eventDatail.schedule[0].endsDate,
          'endsTime':endTime? endTime :eventDatail.schedule[0].endsTime, 
          'ticketId': eventDatail.ticket[0].id,
          'name':ticketName? ticketName :eventDatail.ticket[0].name,
          'quantity':ticketQuantity?ticketQuantity  :eventDatail.ticket[0].quantity,
          'types':ticketType?  ticketType:eventDatail.ticket[0].types,
          'price':ticketPrice? ticketPrice :eventDatail.ticket[0].price,
          'salesStart':ticketsale?ticketsale  :eventDatail.ticket[0].salesStart,
          'description2':ticketDescription?ticketDescription  :eventDatail.ticket[0].description,
          'visibility':ticketvisibile? ticketvisibile :eventDatail.ticket[0].visibility,
          'minQuantityOrder':ticketMinQuantity?  ticketMinQuantity:eventDatail.ticket[0].minQuantityOrder,
          'maxQuantityOrder':ticketMaxQuantity?  ticketMaxQuantity:eventDatail.ticket[0].maxQuantityOrder,
          'saleChannel':ticketSaleChannel? ticketSaleChannel :eventDatail.ticket[0].saleChannel,  
          'event':null,
          'tenentId': account.tenants ? account.tenants[0].tenantId : null,
        }
      // if validation fails, value will be null
     
      this.props.updateEvent(object)
  }

  formChange(newValue) {
    this.setState({
      formValue: newValue,
    })
  }
  

  render() {
    const {
      title,active, description,
      summary, type, category, startDate, 
      startTime, endDate, endTime,location,
      ticketName,
      ticketQuantity,
      ticketType,
      ticketsale,
      ticketPrice,
      ticketDescription,
      ticketvisibile,
      ticketMinQuantity,
      ticketMaxQuantity,
      ticketSaleChannel,
      } = this.state;
    const  { eventDatail } = this.props;
    const Types = EventType.Types;
    const Categories =EventCategory.Categories;
    
    const { fetching } = this.props
    if (this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} testID="eventEditScrollView">
            <Stepper
            active={active}
            stepStyle={styles.steps}
            stepTextStyle={styles.stepText}
            content={[
              <View style={styles.form}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>Update Event</Text>
                </View>
                <View style={styles.row} animation="fadeInUp" delay={300}>
                  <Text style={styles.rowLabel}>Title</Text>
                  <View style={styles.input}>
                  <TextInput
                    ref={(c) => {
                      this.usernameInput = c
                    }}
                    testID="loginScreenUsername"
                    style={styles.textInput}
                    value={title ? title: eventDatail.eventTitle}
                    defaultValue={eventDatail.eventTitle}
                    keyboardType="ascii-capable"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text)=>{this.setState({title:text})}}
                    underlineColorAndroid="transparent"
                    placeholder="Event Name"
                  />
                  </View>
                </View>
                <Form style={styles.row}>
                  <Text style={styles.rowLabel}>Summary</Text>
                  <View style={styles.input}>
                  <Textarea
                    ref={(c) => {
                      this.usernameInput = c
                    }}
                    testID="loginScreenUsername"
                    rowSpan={5}
                    
                    style={[styles.textInput,{paddingLeft:0,height:100}]}
                    value={summary ? summary : eventDatail.summary}
                    keyboardType="ascii-capable"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text)=>{this.setState({summary:text})}}
                    underlineColorAndroid="transparent"
                    placeholder="Summary About Event"
                  />
                  </View>
                </Form>
                <Row style={styles.row}>
                  <Col>
                  <Text style={styles.rowLabel}>Type</Text>
                  <Item style={styles.input}>
                  <Icon name="down" size={20} color={Colors.primary} style={styles.inputIcon}/>
                    <Picker
                    style={styles.textInput}
                    mode="dropdown"
                    placeholder="Select Type "
                    placeholderStyle={{ color: Colors.secondary }}
                    placeholderIconColor="#007aff"
                    selectedValue={type ? type : eventDatail.type}
                    onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})}
                    >
                       {
                        Types.map((items, index)=>{
                          return (<Picker.Item label={items.Type} value={items.Type} />)
                        })
                      }
                  </Picker>
                </Item> 
                  </Col>
                  <Col>
                  <Text style={styles.rowLabel}>Category</Text>
                  <Item style={styles.input}>
                  <Icon name="down" size={20} color={Colors.primary} style={styles.inputIcon}/>
                    <Picker
                    style={styles.textInput}
                    mode="dropdown"
                    placeholder="Select Category"
                    placeholderStyle={{ color: Colors.secondary }}
                    placeholderIconColor="#007aff"
                    selectedValue={category ? category :eventDatail.category}
                    onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}
                    >
                    {
                        Categories.map((items, index)=>{
                          return (<Picker.Item label={items.Category} value={items.Category} />)
                        })
                      }
                  </Picker>
                </Item> 
                  </Col>
                </Row>
                <Form style={styles.row}>
                  <Text style={styles.rowLabel}>Description</Text>
                  <View style={styles.input}>
                  <Textarea
                    ref={(c) => {
                      this.usernameInput = c
                    }}
                    testID="loginScreenUsername"
                    rowSpan={5}
                    
                    style={[styles.textInput,{paddingLeft:0,height:100}]}
                    value={description ? description :eventDatail.description}
                    keyboardType="ascii-capable"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text)=>{this.setState({description:text})}}
                    underlineColorAndroid="transparent"
                    placeholder="Description"
                  />
                  </View>
                </Form>
                
              </View>,
              <View style={styles.form}>
                  <View style={styles.titleView}>
                    <Text style={styles.titleText}>Schedule</Text>
                   </View>
                  <Row style={styles.row}>
                  <Col>
                  <Text style={styles.rowLabel}>Start Date</Text>
                  <Item style={styles.input}>
                   <DateTimePicker
                    minimumDate={new Date(1900, 1, 1)}
                    maximumDate={new Date()}
                    timeZoneOffsetInMinutes={undefined}
                    testID="dateTimePicker"
                    value={startDate ? startDate : eventDatail.schedule[0].startDate}
                    mode="date"
                    locale={"en"}
                    is24Hour={true}
                    display="default"
                    placeHolderText="Start Date"
                    style={styles.textInput}
                    textColor={Colors.primary}
                    onDateChange={(date) => this.setState({ startDate: date })}
                    />
                  </Item>
                </Col>
                <Col>
                  <Text style={styles.rowLabel}>Start Time</Text>
                  <Item style={styles.input}>
                   <DateTimePicker
                    testID="startTime"
                    value={startTime ? startTime :eventDatail.schedule[0].startTime}
                    mode="time"
                    locale={"en"}
                    is24Hour={true}
                    display="default"
                    placeHolderText="Start Time"
                    style={styles.textInput}
                    textColor={Colors.primary}
                    onDateChange={(date) => this.setState({ startTime: date })}
                    />
                  </Item>
                </Col>
                 </Row>   
                 <Row style={styles.row}>
                  <Col>
                  <Text style={styles.rowLabel}>End Date</Text>
                  <Item style={styles.input}>
                   <DateTimePicker
                    testID="endDate"
                    value={endDate ? endDate : eventDatail.schedule[0].endsDate}
                    mode="date"
                    locale={"en"}
                    is24Hour={true}
                    display="default"
                    placeHolderText="End Date"
                    style={styles.textInput}
                    textColor={Colors.primary}
                    onDateChange={(date) => this.setState({ endDate: date })}
                    />
                  </Item>
                </Col>
                <Col>
                  <Text style={styles.rowLabel}>End Time</Text>
                  <Item style={styles.input}>
                   <DateTimePicker
                    minimumDate={new Date(1900, 1, 1)}
                    maximumDate={new Date()}
                    timeZoneOffsetInMinutes={undefined}
                    testID="endTime"
                    value={endTime ? endTime :eventDatail.schedule[0].endsTime}
                    mode="time"
                    locale={"en"}
                    is24Hour={true}
                    display="default"
                    placeHolderText="End Time"
                    style={styles.textInput}
                    textColor={Colors.primary}
                    onDateChange={(date) => this.setState({ endTime: date })}
                    />
                  </Item>
                  </Col>
                </Row>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>Location</Text>
                </View>
                <View style={styles.row}>
                <Text style={styles.rowLabel}>Venue</Text>
               
                </View>
              </View>
              ,
              <View style={styles.form}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>Ticket</Text>
                </View>
                <View style={styles.row} animation="fadeInUp" delay={300}>
                  <Text style={styles.rowLabel}>Name</Text>
                  <View style={styles.input}>
                  <TextInput
                    ref={(c) => {
                      this.usernameInput = c
                    }}
                    testID="loginScreenUsername"
                    style={styles.textInput}
                    value={ticketName ? ticketName : eventDatail.ticket[0].name}
                    keyboardType="ascii-capable"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text)=>{this.setState({ticketName:text})}}
                    underlineColorAndroid="transparent"
                    placeholder="Ticket Name"
                  />
                  </View>
                </View>
                <Row style={styles.row}>
                  <Col style={styles.col}>
                  <Text style={styles.rowLabel}>Quantity</Text>
                  <Item style={styles.input}>
                  <TextInput
                    ref={(c) => {
                      this.usernameInput = c
                    }}
                    testID="loginScreenUsername"
                    style={styles.textInput}
                    value={ticketQuantity ? ticketQuantity : eventDatail.ticket[0].quantity.toString() }
                    keyboardType="numeric"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text)=>{this.setState({ticketQuantity:text})}}
                    underlineColorAndroid="transparent"
                    placeholder="Number Of Ticket"
                  />
                  </Item>
                  </Col>
                  <Col  style={styles.col}>
                  <Text style={styles.rowLabel}>Price</Text>
                  <Item style={styles.input}>
                  <TextInput
                    ref={(c) => {
                      this.usernameInput = c
                    }}
                    testID="loginScreenUsername"
                    style={styles.textInput}
                    value={ticketPrice ? ticketPrice : eventDatail.ticket[0].price}
                    keyboardType="decimal-pad"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text)=>{this.setState({ticketPrice:text})}}
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
                    ref={(c) => {
                      this.usernameInput = c
                    }}
                    testID="loginScreenUsername"
                    style={styles.textInput}
                    value={ticketMaxQuantity ? ticketMaxQuantity : eventDatail.ticket[0].maxQuantityOrder.toString()}
                    keyboardType="numeric"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text)=>{this.setState({ticketMaxQuantity:text})}}
                    underlineColorAndroid="transparent"
                    placeholder="Maximum Tickets Order"
                  />
                  </Item>
                  </Col>
                  <Col>
                  <Text style={styles.rowLabel}>Minimum</Text>
                  <Item style={styles.input}>
                  <TextInput
                    ref={(c) => {
                      this.usernameInput = c
                    }}
                    testID="loginScreenUsername"
                    style={styles.textInput}
                    value={ticketMinQuantity ? ticketMinQuantity :  eventDatail.ticket[0].minQuantityOrder.toString()}
                    keyboardType="numeric"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text)=>{this.setState({ticketMinQuantity:text})}}
                    underlineColorAndroid="transparent"
                    placeholder="Minimum Ticket Order"
                  />
                  </Item>
                  </Col>
                  </Row>
                
                <View style={styles.row} animation="fadeInUp" delay={300}>
                  <Text style={styles.rowLabel}>Ticket Description</Text>
                  <View style={styles.input}>
                  <Textarea
                    ref={(c) => {
                      this.usernameInput = c
                    }}
                    testID="loginScreenUsername"
                    rowSpan={5}
                    
                    style={[styles.textInput,{paddingLeft:0,height:100}]}
                    value={ticketDescription ? ticketDescription :  eventDatail.ticket[0].description}
                    keyboardType="ascii-capable"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text)=>{this.setState({ticketDescription:text})}}
                    underlineColorAndroid="transparent"
                    placeholder="About Ticket"
                  />
                  </View>
                </View>
                <Row style={styles.row}>
                  <Col>
                  <Text style={styles.rowLabel}>Ticket Type</Text>
                  <Item style={styles.input}>
                  <Icon name="down" size={20} color={Colors.primary} style={styles.inputIcon}/>
                    <Picker
                    style={styles.textInput}
                    mode="dropdown"
                    placeholder="Select Type "
                    placeholderStyle={{ color: Colors.secondary }}
                    placeholderIconColor="#007aff"
                    selectedValue={ticketType ? ticketType : eventDatail.ticket[0].types}
                    onValueChange={(itemValue, itemIndex) => this.setState({ticketType: itemValue})}
                    >
                    <Picker.Item label="Paid" value="Paid" />
                    <Picker.Item label="Free" value="Free" />
                    <Picker.Item label="Donation" value="Donation" />
                  </Picker>
                </Item> 
                  </Col>
                  <Col>
                  <Text style={styles.rowLabel}>Visibility</Text>
                  <Item style={styles.input}>
                  <Icon name="down" size={20} color={Colors.primary} style={styles.inputIcon}/>
                    <Picker
                    style={styles.textInput}
                    mode="dropdown"
                    placeholder="Select Visibility"
                    placeholderStyle={{ color: Colors.secondary }}
                    placeholderIconColor="#007aff"
                    selectedValue={ticketvisibile ? ticketvisibile : eventDatail.ticket[0].visibility}
                    onValueChange={(itemValue, itemIndex) => this.setState({ticketvisibile: itemValue})}
                    >
                    <Picker.Item label="Hidden" value="Hidden" />
                    <Picker.Item label="Visible" value="Visible" />
                  </Picker>
                </Item> 
                  </Col>
                </Row>
                  <Row style={styles.row}>
                  <Col>
                  <Text style={styles.rowLabel}>Sales Start</Text>
                  <Item style={styles.input}>
                  <Icon name="down" size={20} color={Colors.primary} style={styles.inputIcon}/>
                    <Picker
                    style={styles.textInput}
                    mode="dropdown"
                    placeholder="Select Sales "
                    placeholderStyle={{ color: Colors.secondary }}
                    placeholderIconColor="#007aff"
                    selectedValue={ticketsale ? ticketsale :  eventDatail.ticket[0].salesStart}
                    onValueChange={(itemValue, itemIndex) => this.setState({ticketsale: itemValue})}
                    >
                    <Picker.Item label="Date And Time" value="Date & time" />
                    <Picker.Item label="When Sales End For" value="When Sales End For" />
                  </Picker>
                </Item> 
                  </Col>
                  <Col>
                  <Text style={styles.rowLabel}>Sale Channel</Text>
                  <Item style={styles.input}>
                  <Icon name="down" size={20} color={Colors.primary} style={styles.inputIcon}/>
                    <Picker
                    style={styles.textInput}
                    mode="dropdown"
                    placeholder="Select Channel"
                    placeholderStyle={{ color: Colors.secondary }}
                    placeholderIconColor="#007aff"
                    selectedValue={ticketSaleChannel ? ticketSaleChannel :  eventDatail.ticket[0].saleChannel}
                    onValueChange={(itemValue, itemIndex) => this.setState({ticketSaleChannel: itemValue})}
                    >
                    <Picker.Item label="Every Where" value="Every Where" />
                    <Picker.Item label="Online" value="Online" />
                    <Picker.Item label="At The Door" value="At The Door" />

                  </Picker>
                </Item> 
                  </Col>
                </Row>
              </View>
            ]}
            buttonStyle={styles.loginButton}
            buttonTextStyle={styles.loginText}
            onBack={() => this.setState({active:active - 1})}
            onFinish={this.submitForm}
            onNext={() => this.setState({active:active + 1})}
          />
        
       
  
         
        </KeyboardAwareScrollView>
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    event: state.events.event,
    fetching: state.events.fetchingOne,
    updating: state.events.updating,
    error: state.events.errorUpdating,
    account:state.account.account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEvent: (id) => dispatch(EventActions.eventRequest(id)),
    getAllEvents: (options) => dispatch(EventActions.eventAllRequest(options)),
    updateEvent: (event) => dispatch(EventActions.eventUpdateRequest(event)),
    reset: () => dispatch(EventActions.eventReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditComponent)

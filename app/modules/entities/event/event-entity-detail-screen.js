import React from 'react'
import { ActivityIndicator, Image, Alert, ScrollView,ImageBackground, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { eventEntityEditScreen,ticketEntityDetailScreen, paymentEntityEditScreen} from '../../../navigation/layouts'

import EventActions from './event.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './event-entity-detail-screen-style'
import moment from 'moment';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Colors, Images } from '../../../shared/themes'
import Icon from 'react-native-vector-icons/AntDesign';
import { Body, Button, Card, CardItem, Right,Left } from 'native-base'
import { Modal, ModalContent, SlideAnimation,ModalTitle } from 'react-native-modals';
import PaymentEntityScreen from '../payment/payment-entity-screen'
import { launchImageLibrary } from 'react-native-image-picker';
import { v4 as uuidv4 } from 'uuid';
import EventEditComponent from './event-edit-component'

class EventEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      paymentAccount:null,
      picture:null,
      Ispicture:false

    }
    Navigation.events().bindComponent(this)
    const { account } = this.props;
    this.props.getEvent({'tenentId': account.tenants ? account.tenants[0].tenantId : null, id:this.props.data.entityId ? this.props.data.entityId.id:null})
    this.selectedAccount = this.selectedAccount.bind(this)

  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.resetEvents()
        Navigation.pop(this.props.componentId)
      }
    }
  }
  selectedAccount = (selectedItem)  =>{
    this.setState({paymentAccount:selectedItem})
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete Event?',
      'Are you sure you want to delete the Event?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteEvent(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  handlePressUpload = () =>{
    const { account } = this.props
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
        const photos =  {
          uri : response.uri.replace('file://', ''),
          path: response.uri.replace('file://', ''),
          type: response.type,
          name:uuidv4(),
          size: response.fileSize,
          lastModified: response.length,
          lastModifiedDate: new Date(),
          id: "eventThumbnail",
          tenantId: account.tenants ? account.tenants[0].tenantId : null
        }

        const event = {
          ...this.props.event,
          thumbnail:[],
          tenentId: account.tenants ? account.tenants[0].tenantId : null,
         }
        this.setState({
          picture:photos,
          Ispicture: true
        })
        Alert.alert(
          'Upload Thumbnail To Event?',
          'Are you sure you want to Upload this Picture?',
          [
            { 
            text: 'Cancel', 
            onPress: () => {
              this.setState({
                picture: null,
                Ispicture: false
              })
            }
            },
            {
              text: 'OK',
              onPress: () => {
                this.props.uploadEventcover(event,photos)
              },
            },
          ],
          { cancelable: false },
        )
      }
  });
}

  render() {
    if (!this.props.event || this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container} testID="eventDetailScrollView">
       <View style={styles.header}>
         <ImageBackground source={this.state.Ispicture ? this.state.picture:{uri: this.props.event.thumbnail ? this.props.event.thumbnail[0]? this.props.event.thumbnail[0].downloadUrl :'':''}} style={styles.thumbnail}>
           <Button style={styles.uploadButton} transparent onPress={this.handlePressUpload}>
           <Icon name="camera" size={25} color={Colors.primary}/>
           </Button>
         </ImageBackground>
       </View>
       <View style={styles.content}>
           <View style={styles.section}>
             <Row>
               <Col>
                 <Text style={styles.headTitle}>{this.props.event.eventTitle}</Text>
               </Col>
               <Col>
               <Button style={[styles.uploadButton,{backgroundColor:Colors.primary}]} transparent onPress={() => {
                  this.setState({ visible: true });
                }}>
                 <Icon name="edit" size={18} color={Colors.white}/>
               </Button>
               </Col>
             </Row>
             <Row>
               <Col>
               <Text style={styles.title}>Type</Text>
               </Col>
               <Col>
               <Text style={styles.title}>Category</Text>
               </Col>
             </Row>
             <Row>
              <Col>
               <Text style={styles.desc}>{this.props.event.type}</Text>
               </Col>
               <Col>
                 <Text style={styles.desc}>{this.props.event.category}</Text>
               </Col>
             </Row>
           </View>
           <View style={styles.section}>
             <Text style={styles.headTitle}><Icon name="calendar" color={Colors.primary} size={18}/> Date</Text>
             <Row>
               <Col>
               <Text style={styles.title}>Start</Text>
               </Col>
               <Col>
               <Text style={styles.title}>End</Text>
               </Col>
             </Row>
             <Row>
              <Col>
              <Text style={styles.desc}>{this.props.event.schedule ? this.props.event.schedule[0] ? moment(this.props.event.schedule[0].startDate).format("ddd, MMM YY") :null:null}  </Text>
             <Text style={styles.desc}>{this.props.event.schedule ? this.props.event.schedule[0] ? moment(this.props.event.schedule[0].startTime).format("h:mm:ss a") :null:null}  </Text>
               </Col>
               <Col>
               <Text style={styles.desc}>{this.props.event.schedule ? this.props.event.schedule[0] ?  moment(this.props.event.schedule[0].endsDate).format("ddd, MMM YY") :null:null} </Text>
             <Text style={styles.desc}>{this.props.event.schedule ? this.props.event.schedule[0] ? moment(this.props.event.schedule[0].endsTime).format("h:mm:ss a")  : null : null} </Text>
               </Col>
             </Row>
             
           </View>
           <View style={styles.section}>
             <Text style={styles.headTitle}><Icon name="enviroment" color={Colors.primary} size={16}/> Location</Text>
             <Text style={styles.desc}>{this.props.event.location ? this.props.event.location[0] ? this.props.event.location[0].address1:null:null}</Text>
           </View>
           <View style={styles.section}>
             <Text style={styles.headTitle}><Icon name="profile" color={Colors.primary} size={16}/> About</Text>
             <Text style={styles.desc}>{this.props.event.description}</Text>
           </View>
           <View style={styles.sectionPayment}>
             <Row>
               <Col >
               <Text style={styles.headTitle}><Icon name="creditcard" color={Colors.primary} size={16}/> Ticket</Text>
               </Col>
               <Col  style={{ width: 30}}>
               
               </Col>
             </Row>
             <Card>
               <CardItem button onPress={() => {
                  ticketEntityDetailScreen({ entityId: this.props.event.ticket ? this.props.event.ticket[0] ? this.props.event.ticket[0].id :null:null, event:this.props.event });
                }}>
                 <Left>
                   <Image source={Images.ticket}  style={styles.ticket} />
                 </Left>
                 <Body>
                  <Text style={styles.tickettitle}> {this.props.event.ticket ? this.props.event.ticket[0] ? this.props.event.ticket[0].name :null:null}</Text>
                 </Body>
                 <Right>

                 </Right>
               </CardItem>
             </Card>
           </View>
          
       </View>
       <Modal
        visible={this.state.visible}
        onTouchOutside={() => {
          this.setState({ visible: false });
        }}
        onSwipeOut={() => {
          this.setState({ visible: false });
        }}
        modalAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
        modalStyle={styles.modalContainer}
        >
        <ModalContent style={styles.modalContent}>
          <Row>
            <Col>
               <Text style={styles.modaltitle}>Book Event</Text>
            </Col>
            <Col style={{width:40}}>
            
            </Col>
          </Row>
          <ScrollView style={styles.modelList}>
            <EventEditComponent eventDatail={this.props.event}/>
          </ScrollView>
        </ModalContent>
      </Modal>
    
        {/* <RoundedButton text="Edit" onPress={eventEntityEditScreen.bind(this, { entityId: this.props.event.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} /> */}
      </ScrollView>
        
    )
  }
}

const mapStateToProps = (state) => {
  return {
    event: state.events.event,
    fetching: state.events.fetchingOne,
    deleting: state.events.deleting,
    errorDeleting: state.events.errorDeleting,
    account:state.account.account

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEvent: (id) => dispatch(EventActions.eventRequest(id)),
    getAllEvents: (options) => dispatch(EventActions.eventAllRequest(options)),
    deleteEvent: (id) => dispatch(EventActions.eventDeleteRequest(id)),
    resetEvents: () => dispatch(EventActions.eventReset()),
    uploadEventcover: (event,data) => dispatch(EventActions.uploadEventCoverRequest(event, data)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEntityDetailScreen)

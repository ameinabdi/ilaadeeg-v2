import React,{useEffect} from 'react';
import { StatusBar, TouchableOpacity, FlatList, Image, ScrollView, Text, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect,useIsFocused } from '@react-navigation/native';
import { Colors, Images } from '../../../shared/themes';
import BusActions from './bus-reducer';
import styles from './bus-detail.screen.style';
import { Card, CardItem, Body,  Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col, Footer } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import _  from 'lodash';
import AlertMessage from '../../../shared/components/alert-message/alert-message';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import LoadingComponent from '../../../shared/components/loading/loadin-component';

function BusDetailScreen(props) {
  const { route, getBus, navigation, booking,account, bus, fetching, error } = props;
  const [seats, setSeats] = React.useState([]);
  // prevents display of stale reducer data
  const routeEntityId = route.params ?? null;
  const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
        setSeats([])
        getBus(routeEntityId?.bus?.id, routeEntityId?.travelDate);
    
    }, [ getBus,routeEntityId, navigation]),
  );

  const selectSeat = (seatNo)=>{
    setSeats(oldArray => [...oldArray, seatNo]);

    //   setSeats(previousSeat => [...previousSeat, seatNo])
  }

  const unselectSeat = (seatNo)=>{
    const  newSeats = _.reject(seats, function(el) { return el.seat ===  seatNo.seat; });
    setSeats(newSeats);

    //   setSeats(previousSeat => [...previousSeat, seatNo])
  }

  


//  const noseats = new Array(bus?.bus?.seats).fill().map((e,i) => {
//     return {seat: i}
//  });

  const renderRow = ({ item }) => {
      const selectedseatno = _.find(seats, seat => { return seat.seat === item.seat ? true : false ; });
      let usedSeats = _.includes(bus?.usedSeats, item.id);
    if(item.seat == 0){
        return (
            <TouchableOpacity style={styles.driverSeat}>
                <Image source={Images.steering} style={styles.steering} />
             </TouchableOpacity>
               
            );
    } else
    if(usedSeats){
      return (
          <ImageBackground source={Images.seatBooked}  style={ styles.usedSeat}>
              <Text style={styles.usedSeatTitle}>{item.seat}</Text>
           </ImageBackground>
             
          );
    } else if(selectedseatno){
        return (
          <TouchableOpacity onPress={() => unselectSeat(item)}>
            <ImageBackground source={Images.seatSelected} style={styles.selectedSeat} >
                 <Text style={styles.seatTitle}>{item.seat}</Text>
            </ImageBackground>
          </TouchableOpacity>
        );
    } else{
        return (
          <TouchableOpacity onPress={() => selectSeat(item)}>
            <ImageBackground source={Images.seat} style={styles.seat} >
                 <Text style={styles.seatTitle}>{item.seat}</Text>
            </ImageBackground>
         </TouchableOpacity>
        );
    }
    
  };
  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Bookings Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const totalNoSeat = seats.map((seat)=>{return seat.seat+','})
  const totalPrice = seats.length*parseFloat(bus?.price*bus?.sshl)
  const seatIds = seats.map((seat)=>{return seat.id})

  const handleBook = (seatNo) =>{
    if(!seats[0]){
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
    }else{
      const schedule = {
        schedule: bus.id,
        customer: account.id,
        seatNo:totalNoSeat,
        seats:seatIds,
        bookingDate:moment(routeEntityId?.travelDate),
        status:'Booked',
        totalAmount:totalPrice,
      }
      props.navigation.navigate('PaymentCheckOutScreen',{bus,schedule})
    }
  } 


if(fetching){
    return (
      <Container testID="bookingScreen" >
      <View  style={styles.header}>
          <Left>
             <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>navigation.goBack()}/>
          </Left>
          <Body>
            <Text style={styles.title}>Available Seats</Text>
          </Body>
          <Right/>
    </View>
      <LoadingComponent />
      </Container>
    )
  }
  return (
    <Container testID="bookingScreen">
    <View  style={styles.header}>
          <Left>
             <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>navigation.goBack()}/>
          </Left>
          <Body>
            <Text style={styles.title}>Available Seats</Text>
          </Body>
          <Right/>
    </View>
    <Content>
    <View style={styles.cardColors}>
    <View style={styles.card}>
            <View style={[styles.buttonCard,,{backgroundColor:Colors.third}]} />
             <Text style={styles.buttonTitle}>Available</Text>
        </View>
        <View style={styles.card}>
             <View style={[styles.buttonCard,{backgroundColor:Colors.primary}]} />
             <Text style={styles.buttonTitle}>Selected</Text>
        </View>
        <View style={styles.card}>
            <View style={[styles.buttonCard,{backgroundColor:Colors.secondary}]} />
             <Text style={styles.buttonTitle}>Booked</Text>
        </View>
       
    </View>
    <FlatList
        contentContainerStyle={styles.seatcontent}
        horizontal={false}
        numColumns={3}
        data={bus?.bus?.busSeat}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        ListEmptyComponent={renderEmpty}
      />
    </Content>
    <Footer style={styles.footer} >
     <Row>
         <Col>
         <Text style={styles.footerTitle}>No Seats:</Text>
         </Col>
         <Col>
         <Text style={styles.footerText}>{ seats.map((seat)=>{return seat.seat+','})}</Text>
         </Col>
     </Row>
     <Row>
         <Col>
         <Text style={styles.footerTitle}>Price Per Seat: </Text>
         </Col>
         <Col>
         <Text style={styles.footerText}>sh {seats[0] ? bus?.price*bus?.sshl : 0}</Text>
         </Col>
     </Row>
     <Row>
         <Col>
         <Text style={styles.footerTitle}>Total:</Text>
         </Col>
         <Col>
         <Text style={styles.footerText}>sh {totalPrice}</Text>
         </Col>
     </Row>
     <TouchableOpacity
            style={styles.button}
            onPress={handleBook}
           >
            <Text style={styles.buttonText}>Book Now</Text>
         </TouchableOpacity>
    </Footer>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    bus: state.bus.bus,
    buses: state.bus.buses,
    fetching: state.bus.fetchingbus,
    error: state.bus.errorbus,
    account: state.account.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBus: (id,travelDate) => dispatch(BusActions.busRequest(id,travelDate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BusDetailScreen);

import React from 'react';
import { ActivityIndicator,Image, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import {Images } from '../../../shared/themes'
import styles from './booking-detail.screen.style';
import { Card, CardItem, Body,  Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col, Footer } from 'native-base';
import moment from 'moment';
import QRCode from 'react-native-qrcode-svg';
import { widthPercentageToDP } from 'react-native-responsive-screen';

function BookingDetailScreen(props) {
  const { route, getBooking, navigation, fetching, error } = props;
  const { ticket } = route.params
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="bookingDetailScrollView">
    <View style={styles.card}>
    <View style={styles.menu}>
        <Left style={styles.left}>
            <Text  style={styles.leftTitle}>From</Text>
            <Text  style={styles.leftText}>{ticket?.schedule?.origin?.city},{'\n'+ticket?.schedule?.origin?.region}</Text>

        </Left>
        <View style={styles.center}>
            <Image source={Images.arrowRight} style={styles.icon}/>
        </View>
        <Right  style={styles.right}>
            <Text style={styles.rightTitle}>To</Text>
            <Text style={styles.rightText}>{ticket?.schedule?.distination?.city},{'\n'+ticket?.schedule?.distination?.region}</Text>

        </Right>
    </View>
    <View style={styles.menu}>
        <Left style={styles.left}>
            <Text  style={styles.leftTitle}>Booking Date</Text>
            <Text  style={styles.leftText}>{moment(ticket?.bookingDate).format('LL')  }</Text>
        </Left>
        <View style={styles.center}>
            <Text  style={styles.centerTitle}>Status</Text>
            <Text  style={styles.centerText}>{ticket.status}</Text>
        </View>
        <Right  style={styles.right}>
        <Text style={styles.rightTitle}>No Seats</Text>

             <Text style={styles.rightText}>{ticket?.seatNo } </Text>
        </Right>
    </View>
    <View style={styles.menu}>
        <Left style={styles.left}>
        <Text  style={styles.leftTitle}>Departure</Text>

            <Text  style={styles.leftText}>{moment(ticket?.schedule?.departureTime).format('h:mm') }</Text>
        </Left>
        <View style={styles.center}>
            
        </View>
        <Right  style={styles.right}>
        <Text style={styles.rightTitle}>Arrival</Text>

             <Text style={styles.rightText}>{moment(ticket?.schedule?.arrivalTime).format('h:mm')} </Text>
        </Right>
    </View>
    <View style={styles.menu}>
        <Left style={styles.left}>
            <Text  style={styles.leftTitle}>Passenger</Text>
            <Text  style={styles.leftText}>{ticket?.customer?.firstName+' '+ticket?.customer?.lastName}</Text>
        </Left>
        <View style={styles.center}>
          
        </View>
        <Right  style={styles.right}>
        
        </Right>
    </View>
    </View>
    <View style={styles.cardfooter}>
    <QRCode
      value={ticket?.id}
      size={widthPercentageToDP('50')}
    />
    </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    booking: state.bookings.booking,
    error: state.bookings.errorOne,
    fetching: state.bookings.fetchingOne,
    deleting: state.bookings.deleting,
    errorDeleting: state.bookings.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetailScreen);

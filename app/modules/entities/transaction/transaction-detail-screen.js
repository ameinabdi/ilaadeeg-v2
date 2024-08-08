import React from 'react';
import { ActivityIndicator,Image, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import {Images,Colors } from '../../../shared/themes'
import styles from './transaction-detail.screen.style';
import { Card, CardItem, Body,  Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col, Footer } from 'native-base';
import moment from 'moment';
import QRCode from 'react-native-qrcode-svg';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import '../../../../i18n';
import {useTranslation} from 'react-i18next';

function TransactionDetailScreen(props) {
  const { route, getBooking, navigation, fetching, error } = props;
  const { transaction } = route.params
  const {t, i18n} = useTranslation();

  return (
    <Container testID="bookingScreen" style={styles.container}>
      <View style={styles.header}>
            <Left>
               <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>navigation.navigate('Home')}/>
            </Left>
            <Body>
              <Text style={styles.title}>{t('screen.transaction.Detail')} </Text>
            </Body>
            <Right/>
      </View>
    <ScrollView  contentContainerStyle={styles.paddedScrollView} testID="bookingDetailScrollView">
    <View style={styles.card}>
    <View style={styles.menu}>
        <Left style={styles.left}>
            <Text  style={styles.leftTitle}>From</Text>
            <Text  style={styles.leftText}>{transaction?.fromProvider?.providerName}</Text>

        </Left>
        <View style={styles.center}>
            <Image source={Images.arrowRight} style={styles.icon}/>
        </View>
        <Right  style={styles.right}>
            <Text style={styles.rightTitle}>To</Text>
            <Text style={styles.rightText}>{transaction?.toProvider?.providerName} </Text>

        </Right>
    </View>
    <View style={styles.menu}>
        <Left style={styles.left}>
            <Text  style={styles.leftTitle}>From Account</Text>
            <Text  style={styles.leftText}>{transaction?.fromAccount?.account}</Text>

        </Left>
        <View style={styles.center}>
            <Image source={Images.arrowRight} style={styles.icon}/>
        </View>
        <Right  style={styles.right}>
            <Text style={styles.rightTitle}>To Account</Text>
            <Text style={styles.rightText}>{transaction?.toAccount?.account} </Text>

        </Right>
    </View>
    <View style={styles.menu}>
        <Left style={styles.left}>
            <Text  style={styles.leftTitle}>Sent Amount</Text>
            <Text  style={styles.leftText}>{transaction?.fromAmount} ({transaction?.fromCurrency})</Text>

        </Left>
        <View style={styles.center}>
            <Image source={Images.arrowRight} style={styles.icon}/>
        </View>
        <Right  style={styles.right}>
            <Text style={styles.rightTitle}>Received Amount</Text>
            <Text style={styles.rightText}>{transaction?.toAmount} ({transaction?.toCurrency})</Text>

        </Right>
    </View>
    <View style={styles.menu}>
        <Left style={styles.left}>
            <Text  style={styles.leftTitle}>From Reference</Text>
            <Text  style={styles.leftText}>{transaction?.fromReference}</Text>

        </Left>
        <View style={styles.center}>
            <Image source={Images.arrowRight} style={styles.icon}/>
        </View>
        <Right  style={styles.right}>
            <Text style={styles.rightTitle}>To Reference</Text>
            <Text style={styles.rightText}>{transaction?.toReference}</Text>

        </Right>
    </View>
    <View style={styles.menu}>
        <Left style={styles.left}>
            <Text  style={styles.leftTitle}>Transaction Date</Text>
            <Text  style={styles.leftText}>{moment(transaction?.createdAt).format('D MMM YY HH:MM a')  }</Text>
        </Left>
        
    </View>
    
    </View>
    </ScrollView>
    </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetailScreen);

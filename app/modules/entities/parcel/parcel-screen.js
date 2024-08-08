import React from 'react';
import { FlatList, Text, TouchableOpacity, View,Image,ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import ParcelActions from './parcel.reducer';
import styles from './parcel-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';
import moment from 'moment';
import { Card, CardItem, Body,  Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {PullToRefreshView} from "react-native-smooth-pull-to-refresh";
import LottieView from 'lottie-react-native';
import { Colors,Animation, Images } from '../../../shared/themes';
import Timeline from 'react-native-timeline-flatlist'
import LoadingComponent from '../../../shared/components/loading/loadin-component';

function BookingScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isRefreshing, setIsRefreshing] = React.useState('');

  const { parcel, route,  fetching,error ,getParcel,navigation,account} = props;
  const { serialNumber } = route.params

  const onInnerRefresh= ()=> {
    startRefreshing();
    fetchParcel()
   }
 
    
  const startRefreshing = ()=> {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  }


  useFocusEffect(
    React.useCallback(() => {
      setPage(0);

      fetchParcel(serialNumber);
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [serialNumber, getParcel]),
  );


  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('BookingDetail', { ticket: item })}>
        <View style={styles.card}>
         <View style={styles.left}>
            <Text style={styles.day}>{moment(item.bookingDate).format('Do')}</Text>
            <Text style={styles.date}>{moment(item.bookingDate).format('MMM YY')}</Text>
         </View>
         <View style={styles.center}>
           <View style={styles.column}>
           <View style={styles.row}>
             <Text style={styles.title}>From</Text>
             <Text style={styles.text}>{item?.schedule?.origin?.city}</Text>
            </View>
            <View>
            <Text style={styles.title}>Departure Time</Text>
             <Text style={styles.text}>{moment(item.schedule?.departureTime).format('HH:mm')}</Text>
            </View>
           </View>
           <View style={styles.column}>
           <View style={styles.row}>
           <Text style={styles.title}>To</Text>
             <Text style={styles.text}>{item?.schedule?.distination?.city}</Text>
            </View>
            <View>
              <Text style={styles.title}>Arrival Time</Text>
              <Text style={styles.text}>{moment(item.schedule?.arrivalTime).format('HH:mm')}</Text>
            </View>
           </View>
        </View>
        <View style={styles.right}>
           
        </View>
        </View>
      </TouchableOpacity>
    );
  };

  
  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Bookings Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  


  const fetchParcel = () => {
    getParcel(serialNumber);
  };
  const dataSource = parcel?.parcelStatus.map((status)=>{
    return {
       time: moment(status.duaDate).format('HH:mm'),
        title: status.status,
        description: moment(status.duaDate).format('Do MMMM')+'  -'+ status.locations?.city
    }
  })
  if(fetching){
    return (
      <Container testID="bookingScreen" style={styles.container}>
      <View style={styles.header}>
            <Left>
               <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>navigation.navigate('Home')}/>
            </Left>
            <Body>
              <Text style={styles.title}>Parcel Tracking</Text>
            </Body>
            <Right/>
      </View>
      <LoadingComponent />
      </Container>
    )
  }
  if(!parcel){
    return (
      <Container testID="bookingScreen" style={styles.container}>
      <View style={styles.header}>
            <Left>
               <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>navigation.navigate('Home')}/>
            </Left>
            <Body>
              <Text style={styles.title}>Parcel Tracking</Text>
            </Body>
            <Right/>
      </View>
      <AlertMessage title="Sorry! There Is No Parcel" show={!fetching} />
      </Container>
    )
  }

  return (
    <Container testID="bookingScreen" style={styles.container}>
      <View style={styles.header}>
            <Left>
               <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>navigation.navigate('Home')}/>
            </Left>
            <Body>
              <Text style={styles.title}>Parcel Tracking</Text>
            </Body>
            <Right/>
      </View>
      
      <PullToRefreshView
          minPullDistance={120}
          pullAnimHeight={120}
          pullAnimYValues={{from: 0, to: 10}}
          isRefreshing={isRefreshing}
          onRefresh={onInnerRefresh}
          contentComponent={
         <ScrollView style={styles.content}>
             <View style={styles.subheader}>
               <Text style={styles.serialNumber}>Serail: {parcel?.serialNumber}</Text>
               <CardItem style={styles.cardItem}>
                <View style={styles.left}>
                <Text style={styles.subTitle}>Sender</Text>
               <Text style={styles.time}>{parcel?.sender}</Text>
                    <Text style={styles.timeTitle}>{parcel?.origin?.city}</Text>
                </View>
                <View style={styles.center}>
                </View>
                <View  style={styles.right}>
                <Text style={styles.subTitle}>Receiver</Text>
               <Text style={styles.time}>{parcel?.receiver}</Text>
                    <Text style={styles.timeTitle}>{parcel?.distination?.city}</Text>
                </View>
              </CardItem>
              </View>
              <Timeline
                data={dataSource}
                circleSize={20}
                circleColor={Colors.secondary}
                lineColor={Colors.secondary}
                style={styles.timelineContainer}
                titleStyle={styles.timelineTitle}
                timeContainerStyle={styles.timelineTimeContainer}
                timeStyle={{textAlign: 'center', backgroundColor:Colors.primary, color:'white', padding:5, borderRadius:13}}
                descriptionStyle={{color:Colors.text}}
                options={{
                  style:{paddingTop:5}
                }}
              />
       </ScrollView>

        }
      >
        <View style={styles.loadingview}>
         <LottieView
         autoPlay
         style={styles.lottieView}
         source={Animation.pulldown}
         />         
       </View> 
       </PullToRefreshView>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    parcel: state.parcel.parcel,
    fetching: state.parcel.fetchingOne,
    error: state.parcel.error,
    account: state.account.account,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getParcel: (serialNumber) => dispatch(ParcelActions.parcelRequest(serialNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingScreen);

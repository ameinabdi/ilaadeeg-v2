import React from 'react';
import { FlatList, Text,ScrollView,Image, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { Colors,Animation, Images } from '../../../shared/themes';
import busActions from './bus-reducer';
import styles from './bus-list-screen.style';
import AlertMessage from '../../../shared/components/alert-message/alert-message';
import { Card, CardItem, Body,  Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {PullToRefreshView} from "react-native-smooth-pull-to-refresh";
import LottieView from 'lottie-react-native';
import LoadingComponent from '../../../shared/components/loading/loadin-component';



function BusScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [isRefreshing, setIsRefreshing] = React.useState('');

  const { buses, getAllBuses, fetching,navigation,account,route } = props;
  const filter = route.params

  useFocusEffect(
    React.useCallback(() => {
      setPage(0);
      fetchBuses();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [filter, fetchBuses]),
  );

  const onInnerRefresh= ()=> {
    startRefreshing();
    fetchBuses()
   }
 
    
  const startRefreshing = ()=> {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  }

  const renderRow = ({ item }) => {

    return (
      <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate('BusDetail',{bus:item, travelDate:filter?.travelDate})}}>
         <CardItem style={styles.cardItem} button >
          <View style={styles.left}>
              <Text style={styles.cardTitleLeft}>Bus</Text>
          </View>
          <View style={styles.center}>
            
          </View>
          <Left  style={styles.right}>
             <View style={styles.badge}>
             <Text style={styles.cardTitle}>{item?.bus?.busName}</Text>
             </View>
          </Left>
        </CardItem>
        <CardItem style={styles.cardItem}>
          <View style={styles.left}>
              <Text style={styles.time}>{item.origin?.city}</Text>
          </View>
          <View style={styles.center}>
          </View>
          <View  style={styles.right}>
              <Text style={styles.time}>{item.distination?.city}</Text>
          </View>
        </CardItem>
        <CardItem style={styles.cardItem}>
          <View style={styles.left}>
              <Text style={styles.time}>{moment(item.departureTime, "HH:mm" ).format('h:mm a')}</Text>
              <Text style={styles.timeTitle}>Departure</Text>
          </View>
          <View style={styles.centerborder}>
            <View style={styles.duration}>
              <Image source={Images.car} style={styles.carIcon} />
            </View>
          </View>
          <View  style={styles.right}>
              <Text style={styles.time}>{moment(item.arrivalTime, "HH:mm").format('h:mm a')}</Text>
              <Text style={styles.timeTitle}>Arrival</Text>
          </View>
        </CardItem>
        <CardItem style={styles.cardItem}>
          <View style={styles.left}>
          </View>
          <View style={styles.center}>
          </View>
          <View  style={styles.right}>
              <Text style={styles.price}>Sh {item.price* item.sshl}</Text>
          </View>
        </CardItem>
      </TouchableOpacity>
    );
  };
  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="Sorry! No Bus Available" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchBuses = React.useCallback(() => {

    getAllBuses({filter});
  }, [getAllBuses,filter]);
  if(fetching){
    return (
      <Container testID="bookingScreen" style={styles.container}>
      <View style={styles.header}>
            <Left>
               <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>navigation.navigate('Home')}/>
            </Left>
            <Body>
              <Text style={styles.title}>Available Buses</Text>
            </Body>
            <Right/>
      </View>
      <LoadingComponent />
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
              <Text style={styles.title}>Available Buses</Text>
            </Body>
            <Right/>
      </View>
      <View style={styles.subheader}>
        <Text style={styles.subTitle}>From: <Text style={styles.subText}>{filter?.origincity}</Text></Text>
        <Text style={styles.subTitle}>To: <Text style={styles.subText}>{filter?.distinationcity}</Text></Text>
        <Text style={styles.subTitle}>Date: <Text style={styles.subText}>{moment(filter?.travelDate).format('Do MMM YY')}</Text></Text>

      </View>
      <PullToRefreshView
          minPullDistance={120}
          pullAnimHeight={120}
          pullAnimYValues={{from: 0, to: 10}}
          isRefreshing={isRefreshing}
          onRefresh={onInnerRefresh}
          contentComponent={
            <ScrollView style={styles.content}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={buses}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        ListEmptyComponent={renderEmpty}
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
    buses: state.bus.buses,
    fetching: state.bus.fetchingbuses,
    error: state.bus.errorbuses,
   };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBuses: (options) => dispatch(busActions.busAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BusScreen);

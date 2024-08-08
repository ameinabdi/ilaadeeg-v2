import React from 'react';
import { FlatList, Text, Image, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import BookingActions from './booking.reducer';
import styles from './booking-screen.style';
import AlertMessage from '../../../shared/components/alert-message/alert-message';
import moment from 'moment';
import { Card, CardItem, Body,  Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors,Animation, Images } from '../../../shared/themes';
import Config from '../../../config/app-config';


function BookingScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const { booking, bookingList, getAllBookings, fetching,account } = props;

  useFocusEffect(
    React.useCallback(() => {
      setPage(0);
      fetchBookings();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [booking, fetchBookings]),
  );


  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity >
        <View style={styles.card}>
         <View style={styles.left}>
           <Image source={{uri:Config.apiUrl+item?.employee?.picture[0]?.privateUrl}} style={styles.profile} />
         </View>
         <View style={styles.center}>
           <View style={styles.column}>
           <View style={styles.row}>
             <Text style={styles.title}>{item?.employee?.fullname}</Text>
            </View>
            <View>
            <Text style={styles.title}>Profession</Text>
             <Text style={styles.text}>{item?.employee?.professions?.categoryName}</Text>
            </View>
           </View>
           <View style={styles.column}>
           <View style={styles.row}>
              <Text style={styles.title}>{moment(item?.createdAt).format('h:mm')}</Text>
            </View>
            <View>
              <Text style={styles.title}>Status</Text>
              <View style={styles.badge}>
          <Text style={styles.badgeText}>{item?.status}</Text>
        </View>
                    </View>
           </View>
           
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

  const cancelSearch = () => {
    setSearchTerm('');
    fetchBookings();
  };

  const performSearch = (query) => {
    if (query === '') {
      cancelSearch();
      return;
    }
    setSearchTerm(query);
    props.performSearch(query);
  };
  const fetchBookings = React.useCallback(() => {
    getAllBookings({ id:account.id});
  }, [getAllBookings, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchBookings();
  };
  return (
    <Container testID="bookingScreen" style={styles.container}>
        <View style={styles.header}>
              <Left>
                 <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>props.navigation.navigate('Home')}/>
              </Left>
              <Body>
                <Text style={styles.haederTitle}>Your Booking</Text>
              </Body>
              <Right/>
        </View>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={bookingList}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty}
      />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    bookingList: state.bookings.bookingList,
    booking: state.bookings.booking,
    fetching: state.bookings.fetchingAll,
    error: state.bookings.errorAll,
    links: state.bookings.links,
    account: state.account.account,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(BookingActions.bookingSearchRequest(query)),
    getAllBookings: (options) => dispatch(BookingActions.bookingAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingScreen);

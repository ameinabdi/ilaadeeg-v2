import React from 'react';
import { FlatList, Text,Image, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import OrderActions from './order.reducer';
import styles from './order-screen.style';
import AlertMessage from '../../../shared/components/alert-message/alert-message';
import moment from 'moment';
import { Card, CardItem, Body,  Form,Button, Item, Picker, Container,Footer, Left, Right, Content, Row, Col } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors,Animation, Images } from '../../../shared/themes';
import InputSpinner from "react-native-input-spinner";
import appConfig from '../../../config/app-config';
import _ from 'lodash';


function OrderScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const { booking,cleanOrder, customerOrders, getAllBookings,AddOrderSave, fetching,account } = props;

  useFocusEffect(
    React.useCallback(() => {
      setPage(0);
      // fetchBookings();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [booking, fetchBookings]),
  );

  const onAddOrder = (data) =>{
    let fullproduct = {...data}
    fullproduct.quantity = 1
    customerOrderSave(data)
  } 

  
  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetailScreen', { productItem: item })}>
        <View style={styles.card}>
         <View style={styles.left}>
           <Image source={{uri: appConfig.apiUrl+'api/file/download?privateUrl='+item?.thumbnail[0]?.privateUrl}} style={styles.thumbail} />
         </View>
         <View style={styles.center}>
           <Text style={styles.title}>{item.title}</Text>
           <Text style={styles.price}>{item.price}</Text>
        </View>
        <View style={styles.right}>
        <InputSpinner
              max={item.productQuantity}
              min={1}
              step={1}
              colorLeft={Colors.secondary}
              colorRight={Colors.secondary}
              colorMax={"#f04048"}
              colorMin={"#40c5f4"}
              rounded={true}
              style={styles.spinner}
              buttonStyle={styles.buttonStyle}
              inputStyle={styles.inputStyle}
              value={item.quantity}
              onChange={(num) =>  AddOrderSave({...item, quantity:num})}
              height={85}
              shadow={false}
              buttonRightImage={<Icon name='plus' size={12} color={Colors.white}/>}
              buttonLeftImage={<Icon name='minus' size={12} color={Colors.white}/>}

            />
        </View>
        </View>
      </TouchableOpacity>
    );
  };

  
  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Orders Found" show={!fetching} />;

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
    // props.performSearch(query);
  };
  const fetchBookings = React.useCallback(() => {
    // getAllBookings({ id:account.id, page: page - 1, sort, size });
  }, [getAllBookings, page, sort, size]);

  const handleClear = ()=>{
    cleanOrder()
  }

  const totalShipping = _.sumBy(customerOrders, (item)=>{
    return item.shipping ? item.shipping?.amount  : 0
  })
  const totalTax = _.sumBy(customerOrders, (item)=>{
    return item.tax ? ((item.price*item.tax?.rate)/100)*item.quantity : 0
  })
  const total = _.sumBy(customerOrders, (item)=>{
    return item.price*item.quantity 
  })
  return (
    <Container testID="bookingScreen" style={styles.container}>
        <View style={styles.header}>
              <Left>
                 <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>props.navigation.navigate('Home')}/>
              </Left>
              <Body>
                <Text style={styles.haederTitle}>Your Cart</Text>
              </Body>
              <Right>
              <Icon name="delete" color={Colors.white} style={styles.backbutton} size={20}  onPress={handleClear}/>
              </Right>
        </View>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={customerOrders}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        ListEmptyComponent={renderEmpty}
      />
      <Footer style={styles.footer}>
        <View style={styles.footerRow}>
          <Text style={styles.footerRowTitle}>Total Shipping:</Text>
          <Text style={styles.footerRowPrice}>{totalShipping}</Text>
        </View>
        <View style={styles.footerRow}>
          <Text style={styles.footerRowTitle}>Total Tax:</Text>
          <Text style={styles.footerRowPrice}>{totalTax.toFixed(2)}</Text>
        </View>
        <View style={styles.footerRow}>
          <Text style={styles.footerRowTitle}>Total:</Text>
          <Text style={styles.footerRowPrice}>{(parseFloat(total)+parseFloat(totalShipping)+parseFloat(totalTax)).toFixed(2)}</Text>
        </View>
        <Button style={styles.button}>
          <Text style={styles.buttonText}>Check Out</Text>
        </Button>
      </Footer>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    customerOrders: state.order.customerOrders,
    booking: state.order.booking,
    fetching: state.order.fetchingAll,
    error: state.order.errorAll,
    links: state.order.links,
    account: state.account.account,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(OrderActions.bookingSearchRequest(query)),
    getAllBookings: (options) => dispatch(OrderActions.bookingAllRequest(options)),
    customerOrderSave: (order) => dispatch(OrderActions.customerOrderSave(order)),
    cleanOrder: (order) => dispatch(OrderActions.cleanOrder(order)),
    AddOrderSave: (order) => dispatch(OrderActions.customerOrderSave(order)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);

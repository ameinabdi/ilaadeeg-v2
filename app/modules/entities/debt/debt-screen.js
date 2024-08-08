import React from 'react';
import { Alert, FlatList, Text,ScrollView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import DebtActions from './debt.reducer';
import styles from './debt-screen.style';
import AlertMessage from '../../../shared/components/alert-message/alert-message';
import moment from 'moment';
import { Card, CardItem, Body, Tab, Tabs,  Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors,Animation, Images } from '../../../shared/themes';
import {PullToRefreshView} from "react-native-smooth-pull-to-refresh";
import LottieView from 'lottie-react-native';
import LoadingComponent from '../../../shared/components/loading/loadin-component';
import TextAvatar from 'react-native-text-avatar';
import _ from 'lodash';
import Toast from 'react-native-toast-message';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import { Badge } from 'react-native-ui-lib'; //eslint-disable-line


function DebtScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isRefreshing, setIsRefreshing] = React.useState('');

  const { debt,deleteDebt,deleteSuccess, deleting, errorDeleting, debtList, getAllDebts, fetching,account } = props;

  useFocusEffect(
    React.useCallback(() => {
      setPage(0);
      fetchBookings();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [debt, fetchBookings]),
  );


  const onInnerRefresh= ()=> {
    startRefreshing();
    fetchBookings()
   }
 
    
  const startRefreshing = ()=> {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  }
  useDidUpdateEffect(() => {
    if(deleting==false && errorDeleting){
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'error',
          text2:  errorDeleting,
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          
        });
      }else if (deleting==false && deleteSuccess ==true ) {
        fetchBookings();
      } 
  
  }, [ deleting, errorDeleting,deleteSuccess, fetchBookings]);
  const handleDelete = (id) =>{
    Alert.alert(
      "Deleted ",
      "Are You Sure To Delete",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sure",
          style: "ok",
          onPress:()=>deleteDebt(id)
        },
      ],
    );
  }
  const renderRow = ({ item }) => {
    if(item.lendCustomerId === account.id){
      return (
        <TouchableOpacity onPress={()=>props.navigation.navigate('EntityStack',{screen:'DebtDetail', params:{debt:item} })} onLongPress={()=>handleDelete(item.id)}>
          <View style={styles.card}>
           <View style={styles.left}>
           <TextAvatar
             backgroundColor={Colors.secondary}
             size={60}
             type={'circle'} // optional
              >{item.fullname}</TextAvatar>
           </View>
           <View style={styles.center}>
             <View style={styles.column}>
             <View style={styles.row}>
               <Text style={styles.title}>{item.fullname}</Text>
              </View>
              <View>
              <Text style={styles.text}>Repayment Date: {moment(item.repaymentDate).format('YYYY-MM-DD')}</Text>
              </View>
             </View>
             <View style={styles.column}>
              {item.type == "Lend" ?
              <View style={styles.status}> 
              <Badge size={20} label={item.borrowCustomerStatus} backgroundColor={Colors.primary}/>
              </View>
              :     
              <View  style={styles.status}>       
              <Badge size={20} label={item.lendCustomerStatus} backgroundColor={Colors.secondary}/>
              </View>
              }
             <View style={styles.row}>
               {item.type == "Lend" ?
                <Text style={styles.lendTitle}>{item.amount+' '+item.currency}</Text>
               :
               <Text style={styles.borrowTitle}>{item.amount+' '+item.currency}</Text>
  
               }
               <Text style={styles.textDate}>{moment(item.transactionDate).format('YYYY-MM-DD')}</Text>
              </View>
             </View>
          </View>
          <View style={styles.right}>
             
          </View>
          </View>
        </TouchableOpacity>
      );
    }else if(item.telephone === account.telephone){
      return (
        <TouchableOpacity onPress={()=>props.navigation.navigate('EntityStack',{screen:'DebtDetail', params:{debt:item} })} onLongPress={()=>handleDelete(item.id)}>
          <View style={styles.card}>
           <View style={styles.left}>
           <TextAvatar
             backgroundColor={Colors.secondary}
             size={60}
             type={'circle'} // optional
              >{item.fullname}</TextAvatar>
           </View>
           <View style={styles.center}>
             <View style={styles.column}>
             <View style={styles.row}>
               <Text style={styles.title}>{item.lendCustomer?.fullname}</Text>
              </View>
              <View>
              <Text style={styles.text}>Repayment Date: {moment(item.repaymentDate).format('YYYY-MM-DD')}</Text>
              </View>
             </View>
             <View style={styles.column}>
              {item.type == "Lend" ?
              <View style={styles.status}> 
              <Badge size={20} label={item.borrowCustomerStatus} backgroundColor={Colors.primary}/>
              </View>
              :     
              <View  style={styles.status}>       
              <Badge size={20} label={item.lendCustomerStatus} backgroundColor={Colors.secondary}/>
              </View>
              }
             <View style={styles.row}>
               {item.type == "Lend" ?
                <Text style={styles.lendTitle}>{item.amount+' '+item.currency}</Text>
               :
               <Text style={styles.borrowTitle}>{item.amount+' '+item.currency}</Text>
  
               }
               <Text style={styles.textDate}>{moment(item.transactionDate).format('YYYY-MM-DD')}</Text>
              </View>
             </View>
          </View>
          <View style={styles.right}>
             
          </View>
          </View>
        </TouchableOpacity>
      );
    }
    
  };

  
  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Debts Found" show={!fetching} />;

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
    getAllDebts({ id:account.id, page: page - 1, sort, size });
  }, [getAllDebts, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchBookings();
  };
  
  return (
    <Container testID="debtScreen" style={styles.container}>
        <View style={styles.header}>
              <Left>
                 <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>props.navigation.navigate('Home')}/>
              </Left>
              <Body>
                <Text style={styles.haederTitle}>Your Debt</Text>
              </Body>
              <Right>
              <Icon name="plus" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>props.navigation.navigate('EntityStack',{screen:'DebtEdit'})}/>
              </Right>
        </View>
        <PullToRefreshView
          minPullDistance={120}
          pullAnimHeight={120}
          pullAnimYValues={{from: 0, to: 10}}
          isRefreshing={isRefreshing}
          onRefresh={onInnerRefresh}
          contentComponent={
            <ScrollView style={styles.content}>
           <Tabs>
          <Tab heading="All" textStyle={styles.textStyle} activeTextStyle={styles.activeTextStyle}>

        <FlatList
          contentContainerStyle={styles.listContent}
          data={debtList?.rows}
          renderItem={renderRow}
          keyExtractor={keyExtractor}
          initialNumToRender={oneScreensWorth}
          ListEmptyComponent={renderEmpty}
        />
      </Tab>
      <Tab heading="Lend" textStyle={styles.textStyle} activeTextStyle={styles.activeTextStyle}>

<FlatList
  contentContainerStyle={styles.listContent}
  data={debtList?.lends}
  renderItem={renderRow}
  keyExtractor={keyExtractor}
  initialNumToRender={oneScreensWorth}
  ListEmptyComponent={renderEmpty}
/>
</Tab>
<Tab heading="Borrow" textStyle={styles.textStyle} activeTextStyle={styles.activeTextStyle}>
<FlatList
  contentContainerStyle={styles.listContent}
  data={debtList?.borrows}
  renderItem={renderRow}
  keyExtractor={keyExtractor}
  initialNumToRender={oneScreensWorth}
  onEndReached={handleLoadMore}
  ListEmptyComponent={renderEmpty}
/>
</Tab>
      </Tabs>
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
    debtList: state.debts.debtList,
    debt: state.debts.debt,
    fetching: state.debts.fetchingAll,
    error: state.debts.errorAll,
    links: state.debts.links,
    account: state.account.account,
    deleting: state.account.deleting,
    errorDeleting: state.account.errorDeleting,
    deleteSuccess:state.account.deleteSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(DebtActions.debtSearchRequest(query)),
    getAllDebts: (customer) => dispatch(DebtActions.debtAllRequest(customer)),
    deleteDebt: (id) => dispatch(DebtActions.debtDeleteRequest(id)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DebtScreen);

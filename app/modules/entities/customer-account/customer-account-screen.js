import React from 'react';
import { FlatList, Text, TouchableOpacity, Image, View,Alert, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import CustomerAccountActions from './customer-account.reducer';
import styles from './customer-account-screen.style';
import AlertMessage from '../../../shared/components/alert-message/alert-message';
import moment from 'moment';
import { Card, CardItem, Body,  Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors,Animation, Images } from '../../../shared/themes';
import Modal from "react-native-modal";
import CustomerAccountEditScreen from './customer-account-edit-screen';
import {PullToRefreshView} from "react-native-smooth-pull-to-refresh";
import LottieView from 'lottie-react-native';
import LoadingComponent from '../../../shared/components/loading/loadin-component';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import Toast from 'react-native-toast-message';
import '../../../../i18n';
import {useTranslation} from 'react-i18next';

function CustomerAccountScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [selectedAccount, setSelectedAccount] = React.useState(null);
  const [isRefreshing, setIsRefreshing] = React.useState('');
  const {t, i18n} = useTranslation();

  const { customerAccount,deleteustomerAccounts, deleting,errorDeleting, customerAccountList, getAllCustomerAccounts, fetching,account } = props;

  useFocusEffect(
    React.useCallback(() => {
      setPage(0);
      fetchCustomerAccounts();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [fetchCustomerAccounts]),
  );

  const onInnerRefresh= ()=> {
    startRefreshing();
    fetchCustomerAccounts()
   }
 
    
  const startRefreshing = ()=> {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  }

  const handleOpenModal = (accountData) =>{
    setSelectedAccount(accountData)
    setModalVisible(!isModalVisible);
  }

  useDidUpdateEffect(() => {
    if (deleting === false) {
      if (errorDeleting) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error',
          text2: errorDeleting,
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      } else {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'success',
          text2: 'successfully Deleted Account',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          
        });
        getAllCustomerAccounts(account.id);
      }
    }
  }, [deleting, errorDeleting, getAllCustomerAccounts]);

  const handleDelete = (accountData) =>{
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
          onPress:()=>deleteustomerAccounts(accountData.id)
        },
      ],
    );
  }

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={()=>handleOpenModal(item)} onLongPress={()=>handleDelete(item)}>
        <View style={styles.card}>
        <View style={styles.row}>
         <View style={styles.left}>
           <Image source={Images.cardLogo} style={styles.cardLogo}/>

         </View>
         <View style={styles.center}>
           
        </View>
        <View style={styles.right}>
           <Text style={styles.provider}>{item.provider?.providerName}</Text>
        </View>
        </View>

        <View style={styles.row}>
         <View style={styles.center}>
            <Text style={styles.account}>{item.account}</Text>
        </View>
        
        </View>
        <View style={styles.row}>
         <View style={styles.left}>
            <Text style={styles.date}>{moment(item.createdAt).fromNow()}</Text>
        </View>
        <View style={styles.right}>
            <Image source={item.provider?.providerName} style={styles.providerIcon}/>
        </View>
        </View>
        </View>
      </TouchableOpacity>
    );
  };

  
  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Account Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () => {
    setSearchTerm('');
    fetchCustomerAccounts();
  };

  const performSearch = (query) => {
    if (query === '') {
      cancelSearch();
      return;
    }
    setSearchTerm(query);
    props.performSearch(query);
  };
  const fetchCustomerAccounts = React.useCallback(() => {
    getAllCustomerAccounts(account.id);
  }, [getAllCustomerAccounts, page, sort, size]);

  return (
    <Container testID="customerAccountListScreen" style={styles.container}>
        <View style={styles.header}>
              <Left>
                 <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>props.navigation.navigate('Home')}/>
              </Left>
              <Body>
                <Text style={styles.haederTitle}>{t('screen.customerAccount.YourAccounts')} </Text>
              </Body>
              <Right>
              <Icon name="plus" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>handleOpenModal(null)}/>
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
      <FlatList
        contentContainerStyle={styles.listContent}
        data={customerAccountList}
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
      <Modal
        testID={'modal'}
        isVisible={isModalVisible}
        onSwipeComplete={handleOpenModal}
        style={styles.modal}>
          <View  style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={styles.modelHeaderLeft}>
                <Text style={styles.modelHeaderTitle}>{t('screen.customerAccount.account')}</Text>
              </View>
              <View style={styles.modelHeaderRight}>
                <Icon name='close' color={Colors.text} size={25} onPress={handleOpenModal} />
              </View>
            </View>
            <View style={styles.modalContent}>
              <CustomerAccountEditScreen route={{params:{entityId:selectedAccount?.id}}} handleOpenModel={()=>handleOpenModal(null)}/>
             </View>
          </View>
      </Modal>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    customerAccountList: state.customerAccount.customerAccountList,
    customerAccount: state.customerAccount.customerAccount,
    fetching: state.customerAccount.fetchingAll,
    error: state.customerAccount.errorAll,
    links: state.customerAccount.links,
    account: state.account.account,
    deleting: state.customerAccount.deleting,
    errorDeleting: state.customerAccount.errorDeleting,



  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(CustomerAccountActions.customerAccountSearchRequest(query)),
    getAllCustomerAccounts: (id) => dispatch(CustomerAccountActions.customerAccountAllRequest(id)),
    deleteustomerAccounts: (id) => dispatch(CustomerAccountActions.customerAccountDeleteRequest(id)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAccountScreen);

import React from 'react';
import { ActivityIndicator,Image, Alert, ScrollView, TouchableOpacity,FlatList ,Text, View } from 'react-native';
import { connect } from 'react-redux';
import {Images,Colors } from '../../../shared/themes'
import styles from './debt-detail.screen.style';
import { Card, CardItem, Body,  Form,Button,SwipeRow, Item, Picker, Container,Header, Left, Right, Content, Row, Col, Footer } from 'native-base';
import moment from 'moment';
import QRCode from 'react-native-qrcode-svg';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from "react-native-modal";
import DebtHistoryScreen from './debt-history-create';
import DebtActions from './debt.reducer';
import { useFocusEffect } from '@react-navigation/native';
import AlertMessage from '../../../shared/components/alert-message/alert-message';
import TextAvatar from 'react-native-text-avatar';
import _ from 'lodash';
import Toast from 'react-native-toast-message';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import { Chip,Drawer } from 'react-native-ui-lib';

function DebtDetailScreen(props) {
  const {fetchingStatus,debtStatus,errorStatus,debtUpdateHistoryStatus, fetchingStatusHistory,debtStatusHistory,errorStatusHistory,  route, getDebt,deleteHistorySuccess,deleteDebtHistory,debtUpdateStatus, navigation,deleting, errorDeleting, debtUpdateHistory, errorUpdating,updateSuccess, updating,account, debtData, fetching, error } = props;
  const { debt } = route.params
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [type, setType] = React.useState(null);
  const drawerProps = {
    
    testID: 'drawer'
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchDebt(debt);
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [debt, fetchDebt]),
  );

  const fetchDebt = React.useCallback(() => {
    getDebt(debt.id);
  }, [getDebt]);

  const handleOpenModal = (data) =>{
    if(debtData.telephone === account.telephone && debtData.borrowCustomerStatus ==='Invited' || debtData.borrowCustomerStatus ==='Rejected'){
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'error',
        text2:  'You Can Borrow or Send Money Until You Accepted It',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        
      });
    }else{
      setModalVisible(!isModalVisible);
      setType(data)
    }
   
  }
  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'error',
          text2:  errorUpdating,
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          
        });
      } else if (updateSuccess) {
        fetchDebt(debt);
      } else if(deleting==false && errorDeleting){
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
      }else if (deleting==false && deleteHistorySuccess) {
        fetchDebt(debt);
      } 
    }
    if(!fetchingStatus){
      if (errorStatus) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'error',
          text2:  errorUpdating,
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          
        });
      }else if (fetchingStatus == false && debtStatus){
        fetchDebt(debt);
      }
    }

  }, [updateSuccess, errorUpdating, deleting, errorDeleting, fetchingStatus,debtStatus,errorStatus, fetchDebt]);
 
  useDidUpdateEffect(() => {
    
    if(!fetchingStatusHistory){

      if (errorStatusHistory) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'error',
          text2:  errorUpdatingHistory,
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          
        });
      }else if (fetchingStatusHistory == false && debtStatusHistory){

        fetchDebt(debt);
      }
    }
  }, [fetchingStatusHistory,debtStatusHistory,errorStatusHistory,  fetchDebt]);
  
  
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
          onPress:()=>deleteDebtHistory(id)
        },
      ],
    );
  }
 
  const renderRow = ({ item }) => {
    if( item.createdByCustomerId != account.id){
      return (
        <SwipeRow
        leftOpenValue={75}
        rightOpenValue={-95}
        left={
          <View style={styles.swipeLeft}>
            <Button style={styles.deleteButton} transparent onPress={handleDelete}>
             <Image source={Images.trash} style={styles.iconButton}/>
            </Button>
          </View>
        }
        body={
          <View>
          <View style={styles.flatlistcard}>
          <View style={styles.left}>
            <View style={styles.iconView}>
              <Image source={Images[item.type]} style={styles.icon}/>
            </View>
          </View>
          <View style={styles.centerView}>
            <View style={styles.column}>
            <View style={styles.row}>
              <Text style={styles.title}>{moment(item.transactionDate).format('YYYY-MM-DD')}</Text>
             </View>
             <View>
             <Text style={styles.type}>{item.type}</Text>
             <Text style={styles.text}>{item.personalNote}</Text>
 
             </View>
            </View>
            <View style={styles.column}>
            
            </View>
         </View>
         <View style={styles.right}>
        
         <View style={styles.column}>
         {item.type == "Lend"  || item.type == "Receive" ?
               <Text style={styles.lendTitle}>{item.amount}</Text>
              :
              <Text style={styles.borrowTitle}>{item.amount}</Text>
              }
          <View style={styles.statusView}>
          <Chip
          label={item.lendCustomerId ===account.id ?   item.lendCustomerStatus:item.borrowCustomerStatus}
          containerStyle={styles.chipContainer}
          iconSource={Images.check}
          iconStyle={styles.chip}
          iconProps={{tintColor: Colors.black}}
        />
          </View>
          
         </View>
         </View>
         </View>
         </View>
        }
        right={
          <View style={styles.swipeRight}>
            <Button transparent style={styles.acceptButton} onPress={() =>handleAcceptHistory(item,  'Accepted')}>
              <Text style={styles.textButton}>Accept</Text>
            </Button>
            <Button transparent style={styles.rejectButton}  onPress={() =>handleAcceptHistory(item, 'Rejected')}>
              <Text style={styles.textButton}>Reject</Text>
            </Button>
          </View>
        }
      />
           
      );
    } else {
      return (
        <TouchableOpacity onPress={()=>handleDelete(item.id)}>
          <View style={styles.flatlistcard}>
           <View style={styles.left}>
             <View style={styles.iconView}>
               <Image source={Images[item.type]} style={styles.icon}/>
             </View>
           </View>
           <View style={styles.centerView}>
             <View style={styles.column}>
             <View style={styles.row}>
               <Text style={styles.title}>{moment(item.transactionDate).format('YYYY-MM-DD')}</Text>
              </View>
              <View>
              <Text style={styles.type}>{item.type}</Text>
              <Text style={styles.text}>{item.personalNote}</Text>
  
              </View>
             </View>
             <View style={styles.column}>
             <View style={styles.row}>
             
          </View>
             </View>
          </View>
          <View style={styles.right}>
            <View style={styles.column}>
            {item.type == "Lend"  || item.type == "Receive" ?
                  <Text style={styles.lendTitle}>{item.amount}</Text>
                :
                <Text style={styles.borrowTitle}>{item.amount}</Text>
                }
          
          <View style={styles.statusView}>
          <Chip
          label={"Created"}
          containerStyle={styles.chipContainer}
          iconSource={Images.check}
          iconStyle={styles.chip}
          iconProps={{tintColor: Colors.black}}
        />
           </View>
            </View>
          </View>
          </View>
        </TouchableOpacity>
      );

    } 
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
  const totalReceive = _.sumBy(debtData?.debtHistory, (debt)=>{
    if(debt.type == 'Receive' ||debt.type == 'Lend' ){
      return parseFloat(debt.amount)
    }
    return 0
  }).toFixed(2)
  const totalSend = _.sumBy(debtData?.debtHistory, (debt)=>{
    if(debt.type == 'Send' ||debt.type == 'Borrow' ){
      return parseFloat(debt.amount)
    }
    return 0
  }).toFixed(2)
 
  const handleRepay = (typeStatus)=>{
    if(typeStatus == 'Send'){
      const total = (totalSend-totalReceive).toFixed(2)

      const FormData = {
        type:typeStatus,
        debt:debt?.id,
        amount:total,
        personalNote: null,
        transactionDate: new Date(),
        customer:account?.id
      }
      debtUpdateHistory(FormData)
    }else{
      const total = (totalReceive-totalSend).toFixed(2)

      const FormData = {
        type:typeStatus,
        debt:debt?.id,
        amount:total,
        personalNote: null,
        transactionDate: new Date(),
        customer:account?.id
      }
      debtUpdateHistory(FormData)
    }
    
  }
 const handleAcceptHistory = (item,status)=>{
   if(item.lendCustomerId  === account.id){
    const data ={
      id: item.id,
      type:'Lend',
      lendCustomerStatus:status,
      lendCustomerDate:new Date()
    }
    Alert.alert(
     "Accept",
     "Are You Sure To "+status,
     [
       {
         text: "Cancel",
         style: "cancel",
       },
       {
         text: "Sure",
         style: "ok",
         onPress:()=>debtUpdateHistoryStatus(data)
       },
     ],
   )
   }else{
    const data ={
      id: item.id,
      type:'Borrow',
      borrowCustomerStatus:status,
      borrowCustomerDate:new Date()
    }
    Alert.alert(
     "Accept",
     "Are You Sure To "+status,
     [
       {
         text: "Cancel",
         style: "cancel",
       },
       {
         text: "Sure",
         style: "ok",
         onPress:()=>debtUpdateHistoryStatus(data)
       },
     ],
   )
   }
  
   
 }

 const handleAccept = (status)=>{
  const data ={
    id: debt?.id,
    borrowCustomerStatus:status,
    borrowCustomerDate:new Date()
  }
  Alert.alert(
   "Accept",
   "Are You Sure To "+status,
   [
     {
       text: "Cancel",
       style: "cancel",
     },
     {
       text: "Sure",
       style: "ok",
       onPress:()=>debtUpdateStatus(data)
     },
   ],
 )
  
}

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
            {debtData.telephone === account.telephone && debtData.borrowCustomerStatus ==='Invited' || debtData.borrowCustomerStatus ==='Rejected' ?
              <TouchableOpacity style={styles.acceptAction} onPress={()=>handleAccept('Accepted')}>
                <Text  style={styles.acceptText}>Accept</Text>
              </TouchableOpacity>
            : debtData.telephone === account.telephone && debtData.borrowCustomerStatus ==='Accepted' ?
              <TouchableOpacity style={styles.acceptAction} onPress={()=>handleAccept('Rejected')}>
                 <Text  style={styles.acceptText}>Rejected</Text>
              </TouchableOpacity> 
            :
            null
            }
          </Right>
    </View>
    <View style={styles.content}>
      <Text style={styles.fullname}>{debtData.lendCustomerId === account.id ? debtData?.fullname :debtData.lendCustomer?.fullname }</Text>
      {debtData.lendCustomerId === account.id?
       <View style={styles.actionView}>
       <View style={styles.actionMineHeader}>
         <Text style={styles.actionMineHeaderText}>Lend</Text>
       </View>
       <View style={styles.actionContent}>
         <Text style={styles.actionContentText}>{(totalReceive-totalSend).toFixed(2)}</Text>
       </View>
       <View style={styles.actionFooter}>
         <View style={styles.action}>
         <TouchableOpacity style={styles.actionMenu} onPress={()=>handleOpenModal('Receive')}>
           <Image source={Images.upload} style={styles.menuIcon} />
         </TouchableOpacity>
         <Text style={styles.actionTitle}>Receive</Text>
         </View>
         <View style={styles.action}>
         <TouchableOpacity style={styles.actionMenu} onPress={()=>handleOpenModal('Lend')}>
           <Image source={Images.upload} style={styles.menuIcon} />
         </TouchableOpacity>
         <Text style={styles.actionTitle}>Lend More</Text>
         </View>
         <View style={styles.action}>
         <TouchableOpacity style={styles.actionMenu} onPress={()=>{ Alert.alert(
            "Repay Complete",
            "Are You Sure To Repay Remaining Amount",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Sure",
                style: "ok",
                onPress:()=>handleRepay('Receive')
              },
            ],
          )}}>
           <Image source={Images.upload} style={styles.menuIcon}  />
         </TouchableOpacity>
         <Text style={styles.actionTitle}>Repay</Text>
         </View>
       </View>
       </View>
      
       :
        <View style={styles.actionView}>
      <View style={styles.actionMineHeader}>
        <Text style={styles.actionMineHeaderText}>Borrow</Text>
      </View>
      <View style={styles.actionContent}>
        <Text style={styles.actionContentText}>{(totalSend-totalReceive).toFixed(2)}</Text>
      </View>
      <View style={styles.actionFooter}>
        <View style={styles.action}>
        <TouchableOpacity style={styles.actionMenu} onPress={()=>handleOpenModal('Send')}>
          <Image source={Images.upload} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.actionTitle}>Send</Text>
        </View>
        <View style={styles.action}>
        <TouchableOpacity style={styles.actionMenu} onPress={()=>handleOpenModal('Borrow')}>
          <Image source={Images.upload} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.actionTitle}>Borrow More</Text>
        </View>
        <View style={styles.action}>
        <TouchableOpacity style={styles.actionMenu} onPress={()=>{ Alert.alert(
            "Repay Complete",
            "Are You Sure To Repay Remaining Amount",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Sure",
                style: "ok",
                onPress:()=>handleRepay('Send')
              },
            ],
          )}}>
          <Image source={Images.upload} style={styles.menuIcon}  />
        </TouchableOpacity>
        <Text style={styles.actionTitle}>Repay</Text>
        </View>
      </View>
      </View>
       }
      <Text style={styles.paymentViewTitle} >History</Text>
      <View style={styles.paymentView}>
      <FlatList
          contentContainerStyle={styles.listContent}
          data={debtData?.debtHistory}
          renderItem={renderRow}
          keyExtractor={keyExtractor}
          initialNumToRender={oneScreensWorth}
          ListEmptyComponent={renderEmpty}
        />
      </View>
    </View>
    <Modal
        testID={'modal'}
        isVisible={isModalVisible}
        onSwipeComplete={handleOpenModal}
        style={styles.modal}>
          <View  style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={styles.modelHeaderLeft}>
                <Text style={styles.modelHeaderTitle}>Transaction</Text>
              </View>
              <View style={styles.modelHeaderRight}>
                <Icon name='close' color={Colors.text} size={25} onPress={handleOpenModal} />
              </View>
            </View>
            <View style={styles.modalContent}>
            <DebtHistoryScreen debtData={debt}  type={type} handleOpenModel={handleOpenModal} />
            </View>
          </View>
      </Modal>
  </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    debtData: state.debts.debt,
    error: state.debts.errorOne,
    fetching: state.debts.fetchingOne,
    deleting: state.debts.deletingHistory,
    errorDeleting: state.debts.errorDeletingHistory,
    updating: state.debts.updatingHistory,
    updateSuccess: state.debts.updateHistorySuccess,
    errorUpdating:state.debts.errorUpdatingHistory,
    deleteHistorySuccess: state.debts.deleteHistorySuccess,
    account: state.account.account,
    fetchingStatus:state.debts.fetchingStatus,
    debtStatus:state.debts.debtStatus,
    errorStatus:state.debts.errorStatus,

    fetchingStatusHistory:state.debts.fetchingStatusHistory,
    debtStatusHistory:state.debts.debtStatusHistory,
    errorStatusHistory:state.debts.errorStatusHistory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDebt: (id) => dispatch(DebtActions.debtRequest(id)),
    debtUpdateHistory: (debt) => dispatch(DebtActions.debtUpdateHistoryRequest(debt)),
    deleteDebtHistory: (id) => dispatch(DebtActions.debtDeleteHistoryRequest(id)),
    debtUpdateStatus: (debt) => dispatch(DebtActions.debtUpdateStatusRequest(debt)),
    debtUpdateHistoryStatus: (debt) => dispatch(DebtActions.debtUpdateStatusHistoryRequest(debt)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DebtDetailScreen);

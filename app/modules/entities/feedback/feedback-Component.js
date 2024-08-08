import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import FeedbackActions from './feedback.reducer';
import styles from './feedback-Component-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';
import moment from 'moment';
import { Card, CardItem, Body,  Form,Button, Item, Picker, Container,Header, Left, Right, Content, Row, Col } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors,Animation, Images } from '../../../shared/themes';
import Modal from "react-native-modal";
import FeedbackEditComponent from './feedback-edit-component';
import TextAvatar from 'react-native-text-avatar';
import { Rating  } from 'react-native-ratings';
import {useTranslation} from 'react-i18next';

function FeedbackComponent(props) {
    
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [selectedFeedback, setSelectedFeedback] = React.useState(null);
  const {t, i18n} = useTranslation();

  const { feedback, feedbackList, tenantId, productId,employeeId, getAllFeedbacks, fetching,account } = props;

  useFocusEffect(
    React.useCallback(() => {
      setPage(0);
      fetchFeedbacks();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [feedback, fetchFeedbacks]),
  );

  
  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleModal(item)}>
        <View style={styles.card}>
         <View style={styles.left}>
         <TextAvatar
           backgroundColor={Colors.secondary}
           size={50}
           type={'circle'} // optional
          >{item.createdBy?.fullName}</TextAvatar>
            <Text style={styles.username}>{item.createdBy?.fullName}</Text>
         </View>
         <View style={styles.center}>
          <View style={styles.row}>
         <View style={styles.col}>
           <Rating
            type='custom'
            ratingColor={Colors.primary}
            ratingBackgroundColor={Colors.secondaryBackground}
            tintColor={Colors.white}
            ratingCount={5}
            imageSize={25}
            startingValue={item.rate}
            readonly={2}
            disabled={true}
            style={{ paddingVertical: 5 }}
          />
           <Text style={styles.title}>{item?.rate}</Text>
             <Text style={styles.text}>Rate</Text>
        </View>
           <View style={styles.col}>
           <Text style={styles.title}>{moment(item?.createdAt).fromNow()}</Text>
            </View>
            </View>
       <View style={styles.detail}>
         <Text style={styles.detailText}>{item.description}</Text>
       </View>
      </View>
          
        </View>
      </TouchableOpacity>
    );
  };

  
  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Feedbacks Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchFeedbacks = React.useCallback(() => {
    const filter = []
    if(tenantId){
      getAllFeedbacks({'filter[tenant]':tenantId});
    }else if(productId){
      getAllFeedbacks({ 'filter[product]':productId });

    }
    else if(employeeId){
      getAllFeedbacks({ 'filter[employee]':employeeId });

    }
  }, [getAllFeedbacks, page, sort, size]);

 
  const handleModal = (data) =>{
    if(data){
      setSelectedFeedback(data)
    }
    setShowModal(!showModal);
  }
  if(fetching){
    return null
  }
  return (
    <View testID="feedbackScreen" style={styles.container}>
    <View style={styles.header}>
              <Left>
                
              </Left>
              <Body>
                <Text style={styles.haederTitle}>{t('screen.feedback.title')}</Text>
              </Body>
              <Right>
                {account && (
                  <Button style={styles.newButton} transparent onPress={handleModal} >
                  <Icon name="plus" color={Colors.white} size={18}/>
                  <Text style={styles.newButtonText}>{t('screen.feedback.create')}</Text>
                  </Button>
                )}
              </Right>
      </View>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={feedbackList}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        ListEmptyComponent={renderEmpty}
      />
      <Modal isVisible={showModal} style={styles.model}>
        <View style={styles.modelView}>
          <View style={styles.modelHeader}>
            <Text style={styles.modelTitle}>{t('screen.feedback.newTitle')}</Text>
          <Button  onPress={handleModal} transparent>
            <Icon name="close" color={Colors.text} size={20} />
          </Button>
        </View>
        <FeedbackEditComponent tenantId={tenantId} employeeId={employeeId} handleModal={handleModal} route={{params:selectedFeedback}} />
               
        </View>
     </Modal>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    feedbackList: state.feedbacks.feedbackList,
    feedback: state.feedbacks.feedback,
    fetching: state.feedbacks.fetchingAll,
    error: state.feedbacks.errorAll,
    links: state.feedbacks.links,
    account: state.account.account,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(FeedbackActions.feedbackSearchRequest(query)),
    getAllFeedbacks: (options) => dispatch(FeedbackActions.feedbackAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackComponent);

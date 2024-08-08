import React from 'react';
import { ActivityIndicator,Image, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import {Images,Colors } from '../../../shared/themes'
import styles from './worker-detail.screen.style';
import { Card, CardItem, Body,  Form,Button,Tab, Tabs,  Item, Picker, Container,Header, Left, Right, Content, Row, Col, Footer } from 'native-base';
import moment from 'moment';
import QRCode from 'react-native-qrcode-svg';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import WorkerActions from './worker.reducer';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import TextAvatar from 'react-native-text-avatar';
import FeedbackComponent from '../feedback/feedback-Component';
import Modal from "react-native-modal";
import BookingEmployeeScreen from './booking-employee-screen';
import {useTranslation} from 'react-i18next';


function BookingDetailScreen(props) {
  const { route, getWorker, navigation, fetching, error } = props;
  const { employee  } = route.params
  const [showModal, setShowModal] = React.useState(false);
  const {t, i18n} = useTranslation();

 

  if(!employee || fetching){
    return null
  }

  const handleModal = (employee) =>{
    if(employee){
      getWorker(employee);

    }
    setShowModal(!showModal);
  }

  return (
    <Container testID="workerScreen" style={styles.container}>
    <View style={styles.header}>
          <Left>
           <Icon name="left" color={Colors.primary} style={styles.backbutton} size={20}  onPress={()=>props.navigation.goBack()}/>
          </Left>
          <Body>
            <Text style={styles.haederTitle}>{t('screen.worker.profileTitle')}</Text>
          </Body>
          <Right/>
    </View>
    <View style={styles.content} >
    <View style={styles.card}>
    <View style={styles.left}>
          <TextAvatar
           backgroundColor={Colors.secondary}
           size={80}
           type={'circle'} // optional
          >{employee.fullname? employee.fullname : 'US'}</TextAvatar>
    </View>
    <View style={styles.center}>
              <Text style={styles.username}>{employee?.fullname}</Text>

              <Text style={styles.city}>{employee?.city?.city}</Text>
    </View>
    <View style={styles.right}>
     <View style={styles.badge}>
         <Text style={styles.badgeText}>{employee?.professions?.categoryName}</Text>
     </View>
    </View>
    </View>
      <Button style={styles.bookingbutton} transparent onPress={handleModal}>
      <Icon name='calendar' size={20} color={Colors.white} />
      <Text style={styles.bookingbuttonText} >{t('screen.worker.bookingNow')}</Text>
      </Button>
    <View style={styles.row}>
      <View style={styles.col}>
        <Text style={styles.colTitle}>{'$ '+employee?.salary+'/'+employee?.salaryType}</Text>
        <Text style={styles.colText}>{t('screen.worker.salary')}</Text>
      </View>
      <View style={styles.col}>
        <Text style={styles.colTitle}>{'$ '+employee?.rate}</Text>
        <Text style={styles.colText}>{t('screen.worker.rate')}</Text>
      </View>
      <View style={styles.col}>
        <Text style={styles.colTitle}>{employee?.experienceYears+' Y'}</Text>
        <Text style={styles.colText}>{t('screen.worker.experience')}</Text>
      </View>
    </View>
    <Tabs>
          <Tab heading={t('screen.worker.about')} textStyle={styles.textStyle} activeTextStyle={styles.activeTextStyle}>
            <View style={styles.section}>
              <Text style={styles.title}>{t('screen.worker.gender')}</Text>
              <Text  style={styles.text}>{employee?.gender}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>{t('screen.worker.age')}</Text>
              <Text  style={styles.text}>{employee?.age}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>{t('screen.worker.resume')}</Text>
              <Text  style={styles.text}>{employee?.resume}</Text>
            </View>
          </Tab>
          <Tab heading={t('screen.worker.review')}textStyle={styles.textStyle} activeTextStyle={styles.activeTextStyle}>
           <FeedbackComponent employeeId={employee?.id} />
          </Tab>
    </Tabs>
     <Modal isVisible={showModal} style={styles.model}>
        <View style={styles.modelView}>
          <View style={styles.modelHeader}>
            <Text style={styles.modelTitle}>{t('screen.worker.booking')}</Text>
          <Button  onPress={handleModal} transparent>
            <Icon name="close" color={Colors.text} size={20} />
          </Button>
        </View>
        <BookingEmployeeScreen route={{params:employee?.id }} handleCloseModal={handleModal} />  
        </View>
     </Modal>
    </View>
  </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    worker: state.workers.worker,
    error: state.workers.errorOne,
    fetching: state.workers.fetchingOne,
    deleting: state.workers.deleting,
    errorDeleting: state.workers.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWorker: (id) => dispatch(WorkerActions.workerRequest(id)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetailScreen);

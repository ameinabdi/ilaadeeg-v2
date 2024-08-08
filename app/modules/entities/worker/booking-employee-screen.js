import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import WorkActions from './worker.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './booking-employee-screen.style';
import {CalendarList } from 'react-native-calendars';
import { Textarea,Button } from 'native-base';
import { Colors } from '../../../shared/themes';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';
import moment from 'moment';

function BookingEmployeeScreen(props) {
  const { getBooking,account, handleCloseModal, Entity, updateBooking, bookingId, route, booking, fetching, updating, errorUpdating, updateSuccess, navigation, reset } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');
  const [bookingDate, setBookingDate] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const {t, i18n} = useTranslation();

  const employee = route.params ;

  React.useEffect(() => {
    if (Entity) {
      setBookingDate(Entity.bookingDate)
      setAddress(Entity.address)
    } else {
    }
  }, [employee, getBooking, route, reset]);



  // fetch related entities
  React.useEffect(() => {}, []);
  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'error',
          text2: errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          
        });
      } else if (updateSuccess) {
        handleCloseModal(employee);
       }
    }
  }, [updateSuccess, errorUpdating, navigation]);


  
  const handleSubmit = (data) =>{
    if(bookingDate == null || !address){
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'error',
        text2: 'Please! Rate it and Give Feedback or Comment',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        
      });
    }else{
      const object = {
        id:bookingId,
        bookingDate:moment(bookingDate),
        address:address,
        employee:employee,
        customer:account.id
      }
      updateBooking(object)
    }
  };
  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={styles.wrapper} keyboardShouldPersistTaps={'handled'} >
      <View style={styles.row} >
         <Text style={styles.rowLabel}>{t('screen.worker.yourAddress')} :</Text>
         <View style={styles.input}>
           <Textarea 
             rowSpan={5}
             style={styles.textInput}
             placeholder={t('screen.worker.writeYourAddress')}
             onChangeText={text => setAddress(text)}
             value={address}
             bordered
           />
         </View>
         </View>
      <View style={styles.row} >
      <Text style={styles.rowLabel}>{t('screen.worker.bookingDate')} :</Text>
        <CalendarList
          markingType={'period'}
          markedDates={bookingDate}
          onDayPress={day => {
            setBookingDate({...bookingDate, [day.dateString]:{color: Colors.primary, textColor: 'white', marked: true, dotColor: 'white'}})
          }}
          style={styles.calendar}
          minDate={new Date()}

        />
      </View>
       
         <View style={styles.row}>
           <Button style={styles.button} transparent onPress={handleSubmit}>
            <Text style={styles.buttonText}>{t('screen.worker.save')}</Text>
           </Button>
         </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    booking: state.workers.booking,
    fetching: state.workers.fetchingOne,
    updating: state.workers.updating,
    updateSuccess: state.workers.updateSuccess,
    errorUpdating: state.workers.errorUpdating,
    account: state.account.account,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBooking: (id) => dispatch(WorkActions.bookingRequest(id)),
    getAllBookings: (options) => dispatch(WorkActions.bookingAllRequest(options)),
    updateBooking: (booking) => dispatch(WorkActions.workerUpdateRequest(booking)),
    reset: () => dispatch(WorkActions.bookingReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingEmployeeScreen);

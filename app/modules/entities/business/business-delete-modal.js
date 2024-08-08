import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import BookingActions from './booking.reducer';

import styles from './booking-styles';

function BookingDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteBooking(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Booking');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Booking {entity.id}?</Text>
          </View>
          <View style={[styles.flexRow]}>
            <TouchableHighlight
              style={[styles.openButton, styles.cancelButton]}
              onPress={() => {
                setVisible(false);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.openButton, styles.submitButton]} onPress={deleteEntity} testID="deleteButton">
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    booking: state.bookings.booking,
    fetching: state.bookings.fetchingOne,
    deleting: state.bookings.deleting,
    errorDeleting: state.bookings.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBooking: (id) => dispatch(BookingActions.bookingRequest(id)),
    getAllBookings: (options) => dispatch(BookingActions.bookingAllRequest(options)),
    deleteBooking: (id) => dispatch(BookingActions.bookingDeleteRequest(id)),
    resetBookings: () => dispatch(BookingActions.bookingReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingDeleteModal);

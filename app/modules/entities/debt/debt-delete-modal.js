import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import DebtActions from './debt.reducer';

import styles from './debt-styles';

function DebtDeleteModal(props) {
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
    debt: state.debts.debt,
    fetching: state.debts.fetchingOne,
    deleting: state.debts.deleting,
    errorDeleting: state.debts.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBooking: (id) => dispatch(DebtActions.debtRequest(id)),
    getAllBookings: (options) => dispatch(DebtActions.debtAllRequest(options)),
    deleteBooking: (id) => dispatch(DebtActions.debtDeleteRequest(id)),
    resetBookings: () => dispatch(DebtActions.debtReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DebtDeleteModal);

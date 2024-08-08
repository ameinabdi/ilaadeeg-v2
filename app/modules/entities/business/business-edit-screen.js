import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import BookingActions from './booking.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './booking-styles';

function BookingEditScreen(props) {
  const { getBooking, updateBooking, route, booking, fetching, updating, errorUpdating, updateSuccess, navigation, reset } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getBooking(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getBooking, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(booking));
    }
  }, [booking, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {}, []);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('BookingDetail', { entityId: booking?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateBooking(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const productNameRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="bookingEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="productName"
              ref={productNameRef}
              label="Product Name"
              placeholder="Enter Product Name"
              testID="productNameInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <FormButton title={'Save'} testID={'submitButton'} />
          </Form>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) => {
  if (!value) {
    return {};
  }
  return {
    id: value.id ?? null,
    productName: value.productName ?? null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    productName: value.productName ?? null,
  };
  return entity;
};

const mapStateToProps = (state) => {
  return {
    booking: state.bookings.booking,
    fetching: state.bookings.fetchingOne,
    updating: state.bookings.updating,
    updateSuccess: state.bookings.updateSuccess,
    errorUpdating: state.bookings.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBooking: (id) => dispatch(BookingActions.bookingRequest(id)),
    getAllBookings: (options) => dispatch(BookingActions.bookingAllRequest(options)),
    updateBooking: (booking) => dispatch(BookingActions.bookingUpdateRequest(booking)),
    reset: () => dispatch(BookingActions.bookingReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingEditScreen);

import React, { createRef } from 'react';
import { ActivityIndicator,TextInput, Text, View } from 'react-native';
import { connect } from 'react-redux';

import FeedbackActions from './feedback.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './feedback-edit-component.style';
import { Textarea,Button } from 'native-base';
import { Rating  } from 'react-native-ratings';
import { Colors, Images } from '../../../shared/themes';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';

function FeedbackEditComponent(props) {
  const { handleModal, getAllFeedbacks, product,employeeId, getFeedback, updateFeedback, route, feedback,tenantId, fetching, updating, errorUpdating, updateSuccess, navigation, reset } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');
  const [feedbackInput, setFeedbackInput] = React.useState('');
  const [rate, setRate] = React.useState(0);
  const {t, i18n} = useTranslation();

 
  const Entity = route.params ;

  React.useEffect(() => {
    if (Entity) {
      setRate(Entity.rate)
      setFeedbackInput(Entity.description)
    } else {
      reset();
    }
  }, [Entity,  route, reset]);

 

  // fetch related entitiesr
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
        setError('');
        handleModal()
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const handleSubmit = (data) =>{
    if(rate == 0 || !feedbackInput){
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
        id:Entity.id,
        rate:rate,
        description:feedbackInput,
        tenant:tenantId,
        product:product ,
        employee:employeeId 
      }
      updateFeedback(object)
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
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="feedbackEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.content}>
        <View style={styles.col} >
         <View style={styles.input}>
          <Text style={styles.rateItem}>{rate}</Text>
          <Text style={styles.rowLabel}> {t('screen.feedback.rating')}</Text>
         </View>
         <View style={styles.input}>
         <Rating
            type='custom'
            ratingColor={Colors.primary}
            ratingBackgroundColor={Colors.secondaryBackground}
            tintColor={Colors.white}
            ratingCount={5}
            imageSize={35}
            startingValue={rate}
            onFinishRating={(value)=>{setRate(value)}}
            style={{ paddingVertical: 5 }}
          />
        </View>
         </View>
         <View style={styles.row} >
         <Text style={styles.rowLabel}>{t('screen.feedback.yourFeedback')} :</Text>
         <View style={styles.input}>
           <Textarea 
             rowSpan={8}
             style={styles.textInput}
             placeholder="Write Your Feedback"
             onChangeText={text => setFeedbackInput(text)}
             value={feedbackInput}
             bordered
           />
         </View>
         </View>
         <View style={styles.row}>
           <Button style={styles.button} transparent onPress={handleSubmit}>
            <Text style={styles.buttonText}>{t('screen.feedback.save')}</Text>
           </Button>
         </View>
      </KeyboardAwareScrollView>
    </View>
  );
}



const mapStateToProps = (state) => {
  return {
    feedback: state.feedbacks.feedback,
    fetching: state.feedbacks.fetchingOne,
    updating: state.feedbacks.updating,
    updateSuccess: state.feedbacks.updateSuccess,
    errorUpdating: state.feedbacks.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFeedback: (id) => dispatch(FeedbackActions.feedbackRequest(id)),
    getAllFeedbacks: (options) => dispatch(FeedbackActions.feedbackAllRequest(options)),
    updateFeedback: (feedback) => dispatch(FeedbackActions.feedbackUpdateRequest(feedback)),
    reset: () => dispatch(FeedbackActions.feedbackReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackEditComponent);

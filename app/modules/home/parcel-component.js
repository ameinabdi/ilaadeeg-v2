import React, { useEffect } from 'react';
import { ScrollView,StyleSheet,Image,TouchableOpacity, TextInput, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import LearnMoreLinks from './learn-more-links.component.js';
import { Colors, Images } from '../../shared/themes';
import styles from './parcel-component.style';
import {View,  Dialog, Text, Picker, Avatar, Assets, PanningProvider, Typography} from 'react-native-ui-lib';
import _ from 'lodash';
import { DatePicker } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import ParcelActions from '../entities/parcel/parcel.reducer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


function ParcelComponent(props) {
 const { account,locations,navigation,getParcel } = props;
  const [serialNumber, setSerialNumber] = React.useState(null);
  const [from, setFrom] = React.useState(locations?.rows);
  const [to, setTo] = React.useState(locations?.rows);


  useFocusEffect(
    React.useCallback(() => {
      setSerialNumber(null);
      // checkUpdateNeeded()
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []),
  );

  const searchAvailableBus = () =>{
    if(!serialNumber){
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'error',
        text2: 'Sorry! Empty Field',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        
      });
    }else{
     const filter ={
          serialNumber
      }
    navigation.navigate('Parcel',filter);
    
    }
    
  }

const otherCities = locations?.rows.filter(function(x) { 
    return x.id !== from?.id; });
  return (
    <ScrollView 
    keyboardShouldPersistTaps='handled'
    contentContainerStyle={styles.content}
    >
        <KeyboardAwareScrollView style={styles.wrapper} keyboardShouldPersistTaps={'handled'} >
         <Text marginT-20 marginB-10 text70 dark40>
            Serial Number :
          </Text>
          <View style={styles.row}>
          <TextInput 
            style={styles.textInput}
            placeholder="Enter Serial Number"
            onChangeText={text => setSerialNumber(text)}
            value={serialNumber}
          />
          </View>
         <TouchableOpacity
            style={styles.button}
            onPress={searchAvailableBus}
           >
            <Text style={styles.buttonText}>Check Your Parcel</Text>
         </TouchableOpacity>
         </KeyboardAwareScrollView>
    </ScrollView >
  );
}

const mapStateToProps = (state) => ({ 
    account: state.account.account,
    locations: state.home.locations,


});
const mapDispatchToProps = (dispatch) => ({
    getParcel: (options) => dispatch(ParcelActions.parcelRequest(options)),

});
export default connect(mapStateToProps, mapDispatchToProps)(ParcelComponent);

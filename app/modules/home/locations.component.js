import React from 'react';
import { ScrollView,StyleSheet,Image,TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import LearnMoreLinks from './learn-more-links.component.js';
import { Colors, Images } from '../../shared/themes';
import styles from './locations.component.style';
import {View,  Dialog, Text, Picker, Avatar, Assets, PanningProvider, Typography} from 'react-native-ui-lib';
import _ from 'lodash';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import busActions from '../entities/buses/bus-reducer';
import moment from 'moment';
import { SafeAreaProvider } from 'react-native-safe-area-context';


function LocationComponent(props) {
 const { account,locations,navigation,getAllBuses } = props;
  const [region, setRegion] = React.useState(null);
  const [from, setFrom] = React.useState(locations?.rows);
  const [to, setTo] = React.useState(locations?.rows);
  const [travelDate, setTravelDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);

  const showDate = (currentMode) => {
    setShow(true);
  };
  
  const _onDateChange = (e, newDate) => {
    setTravelDate(newDate);
    setShow(false)
  };
  const searchAvailableBus = () =>{
    if(!from?.id){
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'error',
        text2: 'Sorry! Select Your Location',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        
      });
    }else
    if(!to?.id){
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'error',
        text2: 'Sorry! Select Your Distination',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        
      });
    }else{
     const filter ={
          origin:from?.id,
          origincity:from?.city,
          distination:to?.id,
          distinationcity:to?.city,
          travelDate:travelDate
      }
    getAllBuses({filter});
    navigation.navigate('Bus',filter)
    
    }
    
  }

const otherCities = locations?.rows.filter(function(x) { 
    return x.id !== from?.id; });
  return (
    <SafeAreaProvider style={styles.content}>
         <Text style={styles.title}>
            Select From :
          </Text>
          <View style={styles.row}>
          <Picker
            value={from}
            onChange={from => {
                setTo(locations?.rows)
                setFrom(from)}}
            getItemValue={location => location?.id}
            renderPicker={location => {
                return (
                <View style={styles.input}>
                    <Text style={styles.selectTitle}>
                      {location?.city }
                    </Text>
                  </View>
                );
              }}
          >
           {_.map(locations?.rows, location => (
              <Picker.Item
                key={location?.id}
                value={location}
                renderItem={(item, props) => (
                  <View
                    style={styles.list}
                  >
                    <View row center>
                      <Avatar size={80} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Borama2.jpg'}}/>
                      <Text marginL-10 text70 dark10>
                      {location?.city}
                      </Text>
                    </View>
                  </View>
                )}
                getItemLabel={item => item.id}
              />
            ))}
          </Picker>
          </View>
          <Text style={styles.title}>
           Select To :
          </Text>
          <View style={styles.row}>
          <Picker
            value={to}
            onChange={to => setTo(to)}
            getItemValue={location => location.id}
            renderPicker={location => {
                return (
                <View style={styles.input}>
                    <Text style={styles.selectTitle}>
                     {location?.city} 
                    </Text>
                  </View>
                );
              }}
            >
           {_.map(otherCities, location => (
              <Picker.Item
                key={location.id}
                value={location}
                renderItem={(item, props) => (
                  <View style={styles.list}>
                    <View row center>
                      <Avatar size={80} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Borama2.jpg'}}/>
                      <Text marginL-10 text70 dark10>
                      { location?.city}
                      </Text>
                    </View>
                  </View>
                )}
                getItemLabel={item => item.id}
              />
            ))}
          </Picker>
          </View>
          
          <Text style={styles.title}>
           Select Travel Date :
          </Text>
          {Platform.OS =="android"  ? 
          <TouchableOpacity style={styles.row} onPress={showDate}>
          <Text style={styles.inputDate}>{travelDate ?moment(travelDate).format('DD MMM YYYY')  : null}</Text>
          {show && (
            <DateTimePicker
            minimumDate={new Date()}
            locale={'en'}
            testID="dateTimePicker"
            value={travelDate}
            mode="date"
            display="default"
            onChange={_onDateChange}
            />
          )}
         </TouchableOpacity> 
         : 
         <View style={styles.rowInput}>
          <DateTimePicker
            minimumDate={new Date()}
            locale={'en'}
            testID="dateTimePicker"
            value={Platform.OS =="android"  ? undefined:travelDate}
            mode="date"
            display="compact"
            onChange={_onDateChange}
            style={styles.inputDate}
            />
         </View>
          }
          
         <TouchableOpacity
            style={styles.button}
            onPress={searchAvailableBus}
           >
            <Text style={styles.buttonText}>Continue</Text>
         </TouchableOpacity>
    </SafeAreaProvider>
  );
}

const mapStateToProps = (state) => ({ 
    account: state.account.account,
    locations: state.home.locations,


});
const mapDispatchToProps = (dispatch) => ({
  getAllBuses: (options) => dispatch(busActions.busAllRequest(options)),

});
export default connect(mapStateToProps, mapDispatchToProps)(LocationComponent);

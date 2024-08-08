import React from 'react';
import { ScrollView,StyleSheet,Image,TouchableOpacity, TouchableWithoutFeedback, Platform, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import LearnMoreLinks from './learn-more-links.component.js';
import { Colors, Images } from '../../shared/themes';
import {View,  Dialog, Text, Picker, Avatar, Assets, PanningProvider, Typography} from 'react-native-ui-lib';
import _ from 'lodash';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import busActions from '../entities/buses/bus-reducer';
import moment from 'moment';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper'
import styles from './swiper.component.style';


function SwiperComponent(props) {
 const { coupons } = props;

if(!coupons){
  return null
}
  return (
    <View style={styles.content}>
      <Swiper style={styles.wrapper}autoplayTimeout={10} showsButtons={false} autoplay={true}>
        {coupons.map((coupon)=>{
          return(
            <TouchableWithoutFeedback onPress={()=>props.navigation.navigate('CouponDetailScreen', { coupon })}>
              <ImageBackground source={coupon?.image ? {uri:coupon?.image[0]?.downloadUrl} : Images.brokenimg} style={styles.slide}>
                {/* <Text style={styles.text}>{coupon.code}</Text>
                <Text style={styles.text}>{coupon.description}</Text> */}
              </ImageBackground>
            </TouchableWithoutFeedback>
          )
        })}
      </Swiper>
    </View>
  );
}

const mapStateToProps = (state) => ({ 
    account: state.account.account,
   

});
const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(SwiperComponent);

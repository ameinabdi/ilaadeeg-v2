import * as React from 'react';
import {View, Text,StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { Metrics, ApplicationStyles, Colors } from '../shared/themes';


const toastConfig = {
    success: ({ text1,text2, props, ...rest }) => (
      <View style={[styles.container,{ backgroundColor:  Colors.success}]}>
         <Text style={styles.title}>{text1}</Text>
          <Text style={styles.message}>{text2}</Text>
      </View>
    ),
    error: ({  text1,text2,   props, ...rest }) => (
        <View style={[styles.container,{ backgroundColor:  Colors.error}]}>
           <Text style={styles.title}>{text1}</Text>
          <Text style={styles.message}>{text2}</Text>
        </View>
      ),
    info: ({ text1,text2,  props, ...rest }) => (
        <View style={[styles.container,{ backgroundColor:  Colors.warning}]}>
          <Text style={styles.title}>{text1}</Text>
          <Text style={styles.message}>{text2}</Text>
        </View>
      ),
  };
const styles =  StyleSheet.create({ 
    container:{ 
        height: hp('10'), 
        width: wp('95'), 
        borderRadius:wp('1')
    },
    title:{
        marginHorizontal:wp('4'),
        marginVertical:wp('2'),
        color:Colors.white,
        fontSize:wp('4')
    },
    message:{
        marginHorizontal:wp('4'),
        marginVertical:wp('0.3'),
        color:Colors.white,
        fontSize:wp('3')
    }
})


export default toastConfig
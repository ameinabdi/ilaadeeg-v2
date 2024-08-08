import { StyleSheet } from 'react-native';

import { ApplicationStyles,Colors,Fonts } from '../../shared/themes';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
 container:{
   flex:1,
   backgroundColor:Colors.background

 },
 header:{
  height:hp('10%'),
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'row',
  paddingHorizontal:wp('2'),
  paddingTop:hp('6'),
},


backbutton:{
  width:wp('10'),
  height:wp('8'),

},
subheader:{
  height:hp('17%'),
  justifyContent:'flex-end',
  alignItems:'center',

},
 title:{
  ...Fonts.style.h4,
  fontWeight:'bold',
   color:Colors.primary

 },
 text:{
  margin:hp('2'),
  ...Fonts.style.normal,
  textAlign:'center'

},
 wrapper:{
   flex:1,
   alignItems:'center',
   
 },
 phoneContainer:{
  marginTop:hp('2'),
  height:hp('7'),

 },
 textInputStyle:{
  marginTop:hp('1'),
  height:hp('7'),
 },
 phonenumber:{
   paddingTop:wp('0'),
   height:hp('8'),
  width:wp('95'),
 },
 button:{
  alignItems:'center',
  flexDirection:'row',
  justifyContent:'center',
  paddingTop:1,
  width: wp('95%'),
  height:hp('6%'),
  marginTop: hp('6'),
  backgroundColor:Colors.primary,
  color: Colors.primary,
  borderRadius:wp('1')
 },
 buttonText: {
  color: Colors.white,
  fontSize: 16,
},



socailButtonIcon:{
  width:hp('4%'),
  height:hp('4%'),
},
socailButtonText: {
  color: Colors.text,
  fontSize: 16,
  marginLeft:wp('5')
},
textOr:{
  fontSize:16,
  color:Colors.borders,
  marginVertical:hp('2'),
},

socailButton: {
  alignItems:'center',
  flexDirection:'row',
  justifyContent:'center',
  paddingTop:1,
  width: wp('45%'),
  height:hp('7%'),
  margin: 5,
  backgroundColor:Colors.white,
  color: Colors.primary,
  borderRadius:2,
  borderWidth:1,
  borderColor:Colors.button
},
row:{
  flexDirection:'row'
},
hint:{
  marginTop:hp('1'),
  marginLeft:wp('2'),
  color:Colors.primary,
  fontWeight:'bold'
}
});

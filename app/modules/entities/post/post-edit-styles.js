import { StyleSheet } from 'react-native'

import { ApplicationStyles, Metrics, Colors } from '../../../shared/themes'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  
  container: {

  },
  header:{
    backgroundColor:Colors.primary,

  },
  title:{
    color:Colors.white,
    fontSize:18
  },
  content:{
    flex:1,
    padding:wp('1%'),
    backgroundColor:Colors.white,

  },
  steps:{
    backgroundColor:Colors.primary,
    height:10,
    width:60,
    borderRadius:2
  },
  stepText:{
    fontSize:8

  },
  
  form: {
    flex:0.9,
    marginTop:0,
    paddingBottom:10,
    paddingTop:0,
    justifyContent:'center',
    backgroundColor: Colors.white,
    borderRadius: 4,
  },
  titleVeiw:{
  
  },
  row: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  rowLabel: {
    color: Colors.charcoal,
    fontSize:16
  },
  input:{
   marginTop:15,
   flexDirection:'row',
   backgroundColor: Colors.background

  },
  inputPicker:{
    marginTop:15,
    marginHorizontal:1,
    backgroundColor: Colors.background
 
   },
   textInputPicker: {
    marginTop:10,
    paddingHorizontal:5,
    height: 35,
    width:'100%',
    color: Colors.background,
  },
  selectView:{
    backgroundColor: Colors.background,
    height:hp('5.5'),
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:wp('2'),
    alignItems:'center'
  },
  selectText:{
    color:Colors.title,
    fontSize:16,
  },
  selectIcon:{
    width:wp('5'),
    height:wp('5'),
    tintColor:Colors.text
  },
  inputIcon:{
    marginTop:10,
   },
  textInput: {
    marginLeft:10,
    height:hp('5.5'),
    width:'95%',
    color: Colors.text,
  },
  titleText:{
    alignSelf:'flex-start',
    marginHorizontal:5,
    color:Colors.primary,
    fontSize:30,
    marginTop:15,
    fontWeight:'bold',
    marginBottom:20,

  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel,
  },
  loginRow: {
    marginTop:15,
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    height:70,
  },
  loginButtonWrapper: {
    flex: 1,
  },
  loginButton: {
    flexDirection:'row',
    flex: 1,
    justifyContent:'center',
    backgroundColor: Colors.primary,
    borderRadius:5,
    paddingTop:10
  },
  loginText: {
    textAlign: 'center',
    color: Colors.white,
    fontSize:19
  },
  textContainer:{
    marginTop:5

  },
  iconcontainer:{
    backgroundColor:Colors.primarywhite,
    padding:10,
    width:40,
    height:40,
    borderRadius:100,
    marginLeft:40

  },

  signUpButtonWrapper: {
    flex: 0.3,
  },
  signUpButton: {
    flex: 1,
    justifyContent:'center',
    borderTopRightRadius:60,
    borderBottomRightRadius:5,
    borderRadius:10,
    padding: 6,
  },
  signUpText: {
    textAlign: 'center',
    color: Colors.primary,
    fontSize:17
  },
  animation: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width:230,
    height:230,
    marginTop:15
  },
  forget:{
    flex:1,
    marginHorizontal:15
  },
  forgetText:{
    alignSelf:'flex-end',
    color:Colors.primary,
    fontSize:16
    
  }
})
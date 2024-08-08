import { StyleSheet } from 'react-native'

import { Colors, Metrics } from '../../../shared/themes'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.background

  },
  
  header:{
    paddingHorizontal:wp('2'),
    paddingTop:hp('6'),
    height:hp('13'),
    flexDirection:'row',
    backgroundColor:Colors.primary
  },
  backbutton:{
    width:wp('20'),
  },
  content:{
    flex:1,
    backgroundColor:Colors.background
  },
  profile: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    backgroundColor:Colors.background

  },
  form: {
    marginTop:20,
    height:hp('60%'),
    justifyContent:'center',
    backgroundColor: Colors.white,
    borderRadius: 4,
  },
  row: {
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.smallMargin,
  },
  rowLabel: {
    color: Colors.charcoal,
  },
  input:{
    paddingTop:10,
    flexDirection:'row',
   },
  inputIcon:{
    margin:10,
   },
   textInput: {
    width: wp('95%'), 
    backgroundColor:Colors.background,
    height: 50,
    paddingHorizontal:10,
    alignSelf:'center'
    
    },
    dateInput: {
      marginTop:hp('1'),
      backgroundColor:Colors.background,
      width: wp('95%'), 
      height: 50,
      paddingTop:wp('3'),
      paddingLeft:wp('2'),
      color:Colors.text,
      fontSize:wp('4'),
      fontWeight:'500'
  
     },
     inputDate:{
      marginTop:wp('0.5'),
      color:Colors.text,
      fontSize:wp('4'),
      fontWeight:'500'
  },
  title:{
    alignSelf:'center',
    color:Colors.title,
    fontSize:18,
    marginTop:10,

  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel,
  },
  loginRow: {
    marginTop:40,
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    height: 70,
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
    marginBottom:20
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
  picker: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width:150,
    height:150,
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.primary
  },
  text: {
    textAlign: 'center',
    color: Colors.white,
    fontSize:17
  },
  uploadicon:{
    width:25,
    height:25,
    alignSelf:'center',
    marginBottom:10,
    tintColor:Colors.white
  },
  uploadImage: {
    width:150,
    height:150,
    borderRadius:100,
    backgroundColor:Colors.white
  },

})

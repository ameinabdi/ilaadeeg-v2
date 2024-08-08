import { StyleSheet } from 'react-native'

import { ApplicationStyles, Colors,Metrics } from '../../../shared/themes'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: Colors.primary,
   
  },
  
  form: {
    flex:1,
    marginTop:hp('35%'),
    height:hp('55%'),
    paddingBottom:20,
    paddingTop:10,
    justifyContent:'center',
    backgroundColor: Colors.white,
    borderRadius: 4,
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  rowLabel: {
    color: Colors.charcoal,
    fontSize:16
  },
  input:{
   marginTop:10,
   paddingVertical:5,
   paddingLeft:5,
   flexDirection:'row',
   backgroundColor: Colors.secondbg

  },
  titleText:{
    alignSelf:'center',
    color:Colors.primary,
    fontSize:30,
    marginTop:Metrics.doubleSection,
    fontWeight:'bold',
    marginBottom:20,

  },
  subtitle:{
    alignSelf:'center',
    color:Colors.primary,
    fontSize:20,
    fontWeight:'bold',

  },
  inputIcon:{
    marginTop:10,
   },
  textInput: {
    marginLeft:10,
    height: 40,
    width:'100%',
    color: Colors.coal,
  },
  loginRow: {
    marginTop:50,
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    height:75,
  },
  loginButtonWrapper: {
    flex: 1,
    justifyContent:'center',

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

  buttonText: {
    fontSize: 18,
    color: Colors.white,
    alignSelf: 'center',
  },
  button: {
    flex:1,
    backgroundColor: Colors.primary,
    color: Colors.white,
    marginTop:40
  },
  buttontext:{
    color: Colors.white,
    fontSize:16
  },
})

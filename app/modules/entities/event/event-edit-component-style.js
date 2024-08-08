import { StyleSheet } from 'react-native'

import { ApplicationStyles, Metrics, Colors } from '../../../shared/themes'

export default StyleSheet.create({
  
  container: {
    padding:10,
    justifyContent:'flex-start',

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
   paddingVertical:5,
   paddingLeft:5,
   flexDirection:'row',
   backgroundColor: Colors.secondbg

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

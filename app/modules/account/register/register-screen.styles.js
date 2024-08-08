import { StyleSheet } from 'react-native'

import { Colors, Metrics } from '../../../shared/themes'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  contentContainer: {
    backgroundColor: Colors.primary,

  },
  container: {
    flex:1,
    backgroundColor: Colors.primary,

  },
  form: {
    flex:1,
    height:hp('60%'),
    marginTop:hp('-26%'),
    paddingBottom:10,
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
  },
  input:{
   paddingTop:10,
   flexDirection:'row',

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
    alignSelf:'center',
    color:Colors.primary,
    fontSize:30,
    marginTop:20,
    fontWeight:'bold',
    marginBottom:20,

  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel,
  },
  loginRow: {
    marginTop:40,
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    height:80,
  },
  loginButtonWrapper: {
    flex: 1,
  },
  loginButton: {
    flexDirection:'row',
    flex: 1,
    justifyContent:'center',
    backgroundColor: Colors.primary,
    borderRadius:10,
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
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width:150,
    height:150,
    marginTop:70
  },
  animation: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width:450,
    height:450,
    marginTop:hp('-4%'),
  },
})

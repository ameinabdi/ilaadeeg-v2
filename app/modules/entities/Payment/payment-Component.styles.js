import { StyleSheet } from 'react-native'

import { ApplicationStyles, Metrics, Colors } from '../../../shared/themes'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  
  container: {
    flex: 1,
  },
  avoider: {
    flex: 1,
    padding: 36,
  },
  button: {
    margin: 36,
    marginTop: 0,
    backgroundColor:Colors.primary
  },
  loadingContainer:{
    flex:1,
    alignItems:'center'
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
    height:wp('18'),
  },
  headerTitle:{
      fontSize:16,
      marginLeft:10,
      color:Colors.white
  },
  wrapper:{
    flex:1,
  },
  content:{
      flex:1,
      paddingHorizontal:10,
      justifyContent:'flex-start'
  },
  menu:{
    padding:wp('1'),
    width:wp('96'),
    flexDirection:'row',
    height:hp('10'),
    backgroundColor:Colors.background
},
left:{
    width:wp('30'),
    marginHorizontal:wp('1')

},
leftTitle:{
    backgroundColor:Colors.primary,
    padding:wp('1'),
    borderRadius:wp('1'),
    fontSize:wp('3.5'),
    fontWeight:'300',
    textAlign:'left',
    color:Colors.white,
},
leftText:{
  marginTop:hp('1'),
  fontSize:wp('4'),
  fontWeight:'600',
  textAlign:'left',
  color:Colors.text,
},
center:{
  width:wp('30'),
  marginHorizontal:wp('1')


},

paymentContainer:{
  height:hp('3'),
  
},
payment:{
  width:wp('30'),
  height:hp('8'),
  marginVertical:wp('1'),
  marginHorizontal:wp('1'),
  paddingTop:wp('6'),
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:Colors.white,
  borderRadius:wp('1'),
  borderColor:Colors.primary,
  borderWidth:wp('0.2')
},
checkView:{
   width:wp('8%'),
   height:wp('8%'),
   marginTop:wp('4'),
   alignSelf:'flex-end',
},
paymentIcon:{
  width:wp('20%'),
  height:wp('8%'),
  marginTop:wp('-4'),
  resizeMode:'cover'

},

checkboxItem:{
  width:wp('4'),
  justifyContent:'center',
  alignItems:'center',
  height:wp('4'),
  backgroundColor:Colors.primary,
  borderRadius:wp('100')

},
uncheckboxItem:{
  width:wp('4'),
  justifyContent:'center',
  alignItems:'center',
  height:wp('4'),
  backgroundColor:Colors.white,
  borderWidth:1,
  borderColor:Colors.primary,
  borderRadius:wp('100')

},
Selectpayment:{
  width:wp('30'),
  height:hp('8'),
  marginVertical:wp('1'),
  marginHorizontal:wp('1'),
  paddingTop:wp('6'),
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:Colors.white,
  borderRadius:wp('1'),
  borderColor:Colors.primary,
  borderWidth:wp('0.2')
},
SelectpaymentIcon:{
  width:wp('20%'),
  height:wp('8%'),
  marginTop:wp('-4'),
 resizeMode:'cover'
},
centerTitle:{
  backgroundColor:Colors.primary,
  padding:wp('1'),
  borderRadius:wp('1'),
  fontSize:wp('3.5'),
  fontWeight:'300',
  textAlign:'left',
  color:Colors.white,
},
centerText:{
  marginTop:hp('1'),
padding:wp('1'),
fontSize:wp('3'),
fontWeight:'600',
textAlign:'left',
color:Colors.text,
},
right:{
  width:wp('30'),
  marginHorizontal:wp('1')

},
rightTitle:{
  backgroundColor:Colors.primary,
    padding:wp('1'),
    borderRadius:wp('1'),
  fontSize:wp('3.5'),
  fontWeight:'300',
  textAlign:'left',
  color:Colors.white,
},
rightText:{
  padding:wp('1'),
  marginTop:hp('0.5'),
  fontSize:wp('5'),
  fontWeight:'600',
  textAlign:'left',
  color:Colors.text,
},
icon:{
  width:wp('8'),
  height:wp('8'),
  tintColor:Colors.primary
},
  row: {
    marginTop:10,
    marginHorizontal:wp('1'),
    paddingVertical: 5,
    justifyContent:'space-between'
  },
  detail: {
    height:70,
    flex:1,
    backgroundColor:Colors.background,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  detailtext:{
    fontSize:22,
    color:Colors.primary,
    fontWeight:'bold'
  },
  rowLabel: {
    color: Colors.charcoal,
    fontSize:16
  },
  input:{
   marginTop:15,
   marginHorizontal:2,
   paddingVertical:5,
   paddingLeft:5,
   flexDirection:'row',
   backgroundColor:Colors.secondaryBackground,

  },
  textFee:{
    marginTop:15,
    textAlign:'center',
    fontWeight:'bold',
    color:Colors.primary,
    paddingLeft:5,
    fontSize:16,
    width:100
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

  Textarea: {
    marginLeft:0,
    height: wp('30%'),
    width:'100%',
    color: Colors.coal,
    backgroundColor:Colors.secondaryBackground
  },
  titleText:{
    alignSelf:'flex-start',
    marginHorizontal:5,
    color:Colors.text,
    fontSize:30,
    marginTop:15,
    fontWeight:'bold',
    marginBottom:20,

  },
  subtitle:{
    alignSelf:'flex-start',
    fontWeight:'500',
    color:Colors.redish,
    fontSize:20,
    marginTop:1,
    marginBottom:1,

  },
  WalletButton:{
      height:hp('6%'),
      backgroundColor:Colors.primary,
      width:wp('98%'),
      alignSelf:'center',
      justifyContent:'center',
      marginVertical:20,
      borderRadius:wp('1')

  },
  WalletbuttonText:{
    color:Colors.white,
    fontSize:20,
  },

  modelContainer:{
    backgroundColor:Colors.white,
    height:hp('60'),
    width:wp('100'),
    justifyContent:'center',
    alignItems:'center',
    borderRadius:wp('1')
  },
  modelTitle:{
    marginTop:hp('3'),
    color:Colors.primary,
    fontSize:20,
  },
  successmodelContainer:{
    backgroundColor:Colors.white,
    width:wp('100'),
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center',
    borderRadius:wp('1')
  },
  textSuccess:{
    marginTop:hp('3'),
    fontSize:25,
    color:Colors.primary
  },
  Orderbutton:{
    height:hp('7%'),
    backgroundColor:Colors.primary,
    width:wp('80%'),
    alignSelf:'center',
    justifyContent:'center',
    marginVertical:20,
    borderRadius:10
  },
  OrderbuttonText:{
  fontWeight:'500',
  color:Colors.white,
  fontSize:20,
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
    width:wp('20'),
    height:hp('20'),
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
    
  },
  section:{
    flex:1,
    marginVertical:2,
  },
  sectionTitle:{
    flex:1,
    backgroundColor:Colors.primary,
    height:30,
    marginTop:10,
    color:Colors.white,
    paddingLeft:2,
    borderRadius:10,
    paddingTop:5,
    fontSize:18,
    fontWeight:'400'
  },
  singleRow:{
    flex:1,
    height:30,
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:5,
    paddingHorizontal:5,
    borderBottomColor:Colors.background,
    borderBottomWidth:1,
  },
  title:{
    color:Colors.primary,
    fontSize:16,
  },
  text:{
    color:Colors.text,
    fontSize:14,
  },
  shipmentContainer:{
    
  },
  shipment:{
    width:wp('35'),
    height:hp('18'),
    marginHorizontal:wp('5'),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.white,
    borderRadius:wp('1'),
    borderColor:Colors.primary,
    borderWidth:wp('0.2')
  },
  checkView:{
     width:wp('12%'),
     height:wp('13%'),
     marginTop:wp('-4'),
     alignSelf:'flex-end',
  },
  shipmentIcon:{
    width:wp('15%'),
    height:wp('15%'),
    tintColor:Colors.primary,
    marginTop:wp('-3'),


  },
  shipmentPrice:{
    fontSize:wp('6'),
    fontWeight:'bold',
    color:Colors.primary
  },
  shipmentDesc:{
    fontSize:wp('4'),
    marginTop:wp('4'),
    fontWeight:'400',
    color:Colors.title
  },
  shipmentTime:{
    fontSize:wp('3'),
    marginTop:wp('2'),
    fontWeight:'400',
    color:Colors.title
  },
  paymentText:{
    fontSize:wp('3.5'),
    marginVertical:hp('1'),
    marginHorizontal:wp('2'),
    fontWeight:'600',
    textAlign:'center',
    color:Colors.third
  },
})
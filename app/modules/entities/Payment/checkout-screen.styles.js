import { StyleSheet } from 'react-native'

import { ApplicationStyles, Metrics, Colors } from '../../../shared/themes'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  
  container: {
    flex:1,
    height:hp(70)

  },
  topheader:{
    paddingHorizontal:wp('2'),
    height:hp('10'),
    paddingTop:hp('2'),
    justifyContent:'flex-end',
    alignItems:'flex-end',
    flexDirection:'row',
    backgroundColor:Colors.primary
  },
  tophaederTitle:{
    fontSize:wp('4'),
    color:Colors.white
  },
  backbutton:{
    width:wp('20'),
    height:wp('18'),
    marginTop:hp('7')
  },
  headerTitle:{
      fontSize:16,
      marginLeft:10,
      color:Colors.white
  },
  wrapper:{
    flex:1,
    marginBottom:hp('5%')
  },
  tabContainer:{
    height:hp('8%'),
    backgroundColor:Colors.background
  },
  menu: { 
    flex:1,
    height:hp('6%'),
    marginTop:hp('1%'),
    alignItems:'flex-end',
    justifyContent:'center'
  },
  service: { 
    flexDirection:'row',
    flex:1,
    borderRadius:wp('1'),
    marginHorizontal:wp('1'),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.white,
  },
  busIcon:{
    width:wp('13%'),
    height:wp('13%'),
  },
  boxIcon:{
    width:wp('13%'),
    height:wp('13%'),
  },
  menuIcon:{
    width:wp('13%'),
    height:wp('13%'),
  },
  menuTitle:{
    color:Colors.text,
    fontWeight:'600',
    fontSize:wp('3%'),
    marginLeft:wp('2')
  },
  content:{
    flex:1,
    backgroundColor:Colors.background

  },
  freecontent:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  freeAnimation:{
    width:wp('60'),
    height:wp('60')
  },
  freeTitle:{
    color:Colors.title,
    fontWeight:'600',
    fontSize:wp('4.5%'),
    marginTop:wp('2')
  },
  freeText:{
    color:Colors.text,
    fontWeight:'500',
    fontSize:wp('3%'),
    marginTop:wp('2')
  },
header:{
    marginVertical:hp('1'),
    marginHorizontal:wp('1'),
    height:hp('20'),
    width:wp('48'),
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:wp('1'),
    backgroundColor:Colors.white
  },
left:{
    flex:1,
    width:wp('30'),
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:wp('1')
},
leftTitle:{
    marginTop:hp('2'),
    padding:wp('1'),
    borderRadius:wp('2'),
    fontSize:wp('4'),
    fontWeight:'300',
    textAlign:'left',
    color:Colors.title,
},
right:{
  flex:1,
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
  width:wp('40'),
  paddingHorizontal:wp('1')
},

col:{
  marginVertical:hp('0.5'),
  flexDirection:'row',
  justifyContent:'flex-end'
},
dropdown:{
  width:wp('10'),
  flexDirection:'row',
  justifyContent:'center',
  paddingHorizontal:wp('1')
},
paymentIcon:{
  width:wp('12%'),
  height:wp('7%'),
  borderWidth:wp('0.1'),
  borderStyle:'dashed',
  borderColor:Colors.primary,
  marginHorizontal:wp('0.5'),
  resizeMode:'contain',
  backgroundColor:Colors.white
},
payment:{
  width:wp('45'),
  height:hp('14'),
  paddingTop:hp('4'),
  marginVertical:wp('3'),
  marginHorizontal:wp('1'),
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:Colors.white,
  borderRadius:wp('1'),
  borderColor:Colors.primary,
  borderWidth:wp('0.2')
},
renderConetn:{
   height:hp(30),
   backgroundColor:Colors.background

},

paymentPrice:{
  fontSize:wp('6'),
  fontWeight:'bold',
  color:Colors.primary
},
paymentDesc:{
  fontSize:wp('4'),
  marginTop:wp('4'),
  fontWeight:'400',
  color:Colors.title
},
paymentTime:{
  fontSize:wp('3'),
  marginTop:wp('2'),
  fontWeight:'400',
  color:Colors.title
},
checkboxItem:{
  width:wp('6'),
  justifyContent:'center',
  alignItems:'center',
  height:wp('6'),
  backgroundColor:Colors.white,
  borderRadius:wp('100')

},
checkboxItem:{
  width:wp('6'),
  justifyContent:'center',
  alignItems:'center',
  height:wp('6'),
  backgroundColor:Colors.white,
  borderRadius:wp('100')

},
uncheckboxItem:{
  width:wp('6'),
  justifyContent:'center',
  alignItems:'center',
  height:wp('6'),
  backgroundColor:Colors.white,
  borderWidth:1,
  borderColor:Colors.primary,
  borderRadius:wp('100')

},
Selectpayment:{
  width:wp('45'),
  height:hp('14'),
  paddingTop:hp('4'),
  marginVertical:wp('3'),
  marginHorizontal:wp('1'),
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:Colors.primary,
  borderRadius:wp('1'),
  borderColor:Colors.white,
  borderWidth:wp('0.2')
},
SelectpaymentIcon:{
  width:wp('27%'),
  height:wp('10%'),
  marginTop:wp('-4'),
  tintColor:Colors.white

},
SelectpaymentPrice:{
  fontSize:wp('6'),
  fontWeight:'bold',
  color:Colors.white
},
SelectpaymentDesc:{
  fontSize:wp('4'),
  marginTop:wp('4'),
  fontWeight:'400',
  color:Colors.white
},
SelectpaymentTime:{
  fontSize:wp('3'),
  fontWeight:'400',
  marginTop:wp('2'),
  color:Colors.white
},
centerTitle:{
  backgroundColor:Colors.primary,
  padding:wp('1'),
  borderRadius:wp('2'),
  fontSize:wp('3.5'),
  fontWeight:'300',
  textAlign:'left',
  color:Colors.white,
},
centerText:{
  marginTop:hp('3'),
padding:wp('1'),
fontSize:wp('4'),
fontWeight:'600',
textAlign:'left',
color:Colors.text,
},

rightTitle:{
  backgroundColor:Colors.primary,
    padding:wp('1'),
    borderRadius:wp('2'),
  fontSize:wp('3.5'),
  fontWeight:'300',
  textAlign:'left',
  color:Colors.white,
},
rightText:{
  padding:wp('1'),
  marginTop:hp('3'),
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
  button:{
      height:hp('6%'),
      backgroundColor:Colors.primary,
      width:wp('95%'),
      justifyContent:'center',
      marginVertical:20,
      alignSelf:'center'

  },
  buttonText:{
    fontWeight:'500',
    color:Colors.white,
    fontSize:16,
  },
  model:{
    justifyContent: 'flex-end',
    margin: 0,
  },
  modelContainer:{
    borderTopLeftRadius:wp(2),
    borderTopRightRadius:wp(2),
    width:wp('100'),
    backgroundColor:Colors.white,
    height:hp('60'),
    justifyContent:'flex-start',
    alignItems:'center',
  },
  modelheader:{
    height:hp('6'),
    flexDirection:'row',
  },
  modelTitle:{
    color:Colors.text,
    fontSize:16,
  },
  closebutton:{
    margin:wp('4')
  },
  modalContent:{
    flex:1,
    width:wp('100'),
    backgroundColor:Colors.background
  },
  successmodelContainer:{
    backgroundColor:Colors.white,
    height:hp('40'),
    width:wp('90'),
    justifyContent:'flex-start',
    alignItems:'center',
    borderRadius:wp('1')
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
  
})